from fastapi import FastAPI, HTTPException, Body
import uvicorn
import torch
from typing import List
import pandas as pd
import io
import pickle
from sklearn.preprocessing import LabelEncoder
import networkx as nx
from torch_geometric.data import Data

from torch.nn import ModuleList, Linear, ReLU, Sequential, BatchNorm1d, Dropout
from torch_geometric.nn import GCNConv, SAGEConv, GATConv, ChebConv
import torch.nn.functional as F 
from nmodel_classifier import NGCF



# 유저데이터 전처리 클래스
class GraphDataU:
    def __init__(self, df):
        self.df = df
        self.prepare_data()
        self.graphs = []
        self.create_individual_graphs()
        self.pyg_graphs = []
        self.create_pyg_list()

    def prepare_data(self):
        self.user_encoder = LabelEncoder()
        self.item_encoder = LabelEncoder()
        self.df['user_index'] = self.user_encoder.fit_transform(self.df['TRAVEL_ID'])
        self.df['item_index'] = self.item_encoder.fit_transform(self.df['VISIT_AREA_NM'])
        self.df['GENDER_index'] = self.user_encoder.fit_transform(self.df['GENDER'])

    def create_individual_graphs(self):
        for _, group in self.df.groupby('TRAVEL_ID'):
            G = nx.Graph()
            user_index = group['user_index'].iloc[0]
            user_attributes = group.iloc[0][['GENDER_index', 'AGE_GRP', 'FAMILY_MEMB', 'TRAVEL_COMPANIONS_NUM']].to_dict()
            G.add_node(user_index, **user_attributes, type='user')
            for _, row in group.iterrows():
                item_index = row['item_index']
                G.add_node(item_index, type='item', name=row['VISIT_AREA_NM'])
                edge_attributes = row[['RESIDENCE_TIME_MIN', 'DGSTFN', 'REVISIT_INTENTION', 'RCMDTN_INTENTION']].to_dict()
                G.add_edge(user_index, item_index, **edge_attributes)
            self.graphs.append(G)

    def graph_to_pygdata(self, G):
        node_features, node_labels, edge_index, edge_attr = [], [], [], []
        node_index_mapping = {node: i for i, (node, _) in enumerate(G.nodes(data=True))}
        for node, attr in G.nodes(data=True):
            if 'type' in attr and attr['type'] == 'user':
                node_features.append([attr['GENDER_index'], attr['AGE_GRP'], attr['FAMILY_MEMB'], attr['TRAVEL_COMPANIONS_NUM']])
                node_labels.append(-1)
            else:
                node_features.append([0, 0, 0, 0])
                node_labels.append(self.item_encoder.transform([attr['name']])[0])
        for source, target, attr in G.edges(data=True):
            edge_index.append([node_index_mapping[source], node_index_mapping[target]])
            edge_attr.append([attr['RESIDENCE_TIME_MIN'], attr['DGSTFN'], attr['REVISIT_INTENTION'], attr['RCMDTN_INTENTION']])
        data = Data(x=torch.tensor(node_features, dtype=torch.float),
                    edge_index=torch.tensor(edge_index, dtype=torch.long).t().contiguous(),
                    edge_attr=torch.tensor(edge_attr, dtype=torch.float),
                    y=torch.tensor(node_labels, dtype=torch.long))
        return data

    def create_pyg_list(self):
        for G in self.graphs:
            self.pyg_graphs.append(self.graph_to_pygdata(G))
            

app = FastAPI()

# 설정: 디바이스, 모델 경로 및 체크포인트 로드
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_path = r"/Users/rickyhong/Desktop/Projects/solo/ai/best_model_epoch_1_val_loss_10.5528_val_acc_0.0027.pt"

# 모델 구조를 선언하고 체크포인트로부터 상태를 로드하는 함수
def load_model():
    df = pd.read_csv(r'/Users/rickyhong/Desktop/Projects/solo/ai/최종합데이터.csv')
    unique_travel_ids_count = df['TRAVEL_ID'].nunique()
    unique_VISIT_AREA_NM_ids_count = df['VISIT_AREA_NM'].nunique()
    num_users, num_items = unique_travel_ids_count, unique_VISIT_AREA_NM_ids_count
    num_classes = 41476
    model = NGCF(num_users=num_users, num_items=num_items, emb_size=64, layers=[128, 64, 32], heads=1, num_classes=num_classes).to(device) # 파라미터는 예시입니다
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model

model = load_model()

# 사용자 데이터를 받아 추천을 반환하는 POST 라우트 정의
@app.post("/recommend/")
async def recommend(user_data: str = Body(..., example="user_data_csv_string")):
    try:
        raw_data = """TRAVEL_ID,VISIT_AREA_NM,RESIDENCE_TIME_MIN,DGSTFN,REVISIT_INTENTION,RCMDTN_INTENTION,GENDER,AGE_GRP,FAMILY_MEMB,TRAVEL_COMPANIONS_NUM
                    a_a003071,성산일출봉,80.0,11,5.0,5.0,5.0,여,30,2,1
                    a_a003071,올레길,60.0,11,5.0,5.0,5.0,여,30,2,1
                    """

        user_df = pd.read_csv(io.StringIO(raw_data))
        graph_data = GraphDataU(user_df)
        
        # pickle 파일로부터 CustomDataset 객체 로드
        with open('custom_dataset.pkl', 'rb') as f:
            loaded_custom_dataset = pickle.load(f)
            
        # loaded_custom_dataset에서 graph_data 속성을 추출
        graph_data_T = loaded_custom_dataset.GraphData

        # 단일 사용자의 데이터 처리를 가정하여 첫 번째 그래프 데이터만 사용
        data = graph_data.pyg_graphs[0].to(device)
        with torch.no_grad():
            print("모델 돌아가는 중")
            output = model(data)
            print("결과")
        predicted_item_index = output.argmax(dim=1).cpu().numpy()
        predicted_item_names = graph_data_T.item_encoder.inverse_transform(predicted_item_index)
        print(predicted_item_names)
        return {"recommended_items": predicted_item_names}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # 서버 실행: uvicorn recommendation_api:app --reload
    uvicorn.run(app, host="127.0.0.1", port=8000)
    
