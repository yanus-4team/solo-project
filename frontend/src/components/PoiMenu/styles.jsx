import styled from "styled-components";

export const PoiContainer = styled.div`
  position: fixed;
  top: 0;
  left: -350px; // 기본 상태에서는 화면 왼쪽 바깥에 위치
  width: 300px;
  margin-left: 8px;
  margin-top: 100px;
  height: 130px;
  border-radius: 30px;
  background-color: #fff;
  transition: left 0.5s ease;
  z-index: 10;
  &.open {
    left: 0; // .open 클래스가 있을 때 화면 안으로 슬라이드
  }
  @media (max-width: 768px) {
    width: 300px; // 너비를 화면 너비와 같게 조정
    left: -350px; // 초기 위치를 화면 너비만큼 왼쪽으로 설정하여 화면 밖으로 이동
    margin-left: 8px; // 모바일 화면에서는 외부 여백을 제거
    margin-top: 100px; // 상단 여백 제거
    height: 130px; // 높이를 자동으로 조정하여 내용에 맞게 변경
    border-radius: 30px; // 모바일 화면에서는 모서리 둥글기 제거
    &.open {
      left: 0; // .open 클래스가 있을 때 화면 안으로 슬라이드
    }
  }
`;

export const CloseBtn = styled.img`
  position: absolute;
  width: 20px;
  top: 15px;
  right: 10px;
  cursor: pointer;
`;

export const PoiContent = styled.div`
  padding: 20px;
  // 필요한 스타일 추가
`;

export const Title = styled.div`
    margin-left: 105px;
    margin-bottom: 1rem;
    color: #333;
    font-weight: normal;
    font-size: 25px;
`
export const MemberContainer = styled.div`
  display: flex;
  align-items: center; // 자식 요소들을 세로 중앙에 정렬
  margin-bottom: 1rem; // 입력칸과 다음 요소 사이의 간격을 조정
`;

export const Member = styled.div`
  color: #333;
  font-weight: normal;
  margin-left: 5px;
  font-size: 17px;
  margin-top: -18px;
`;

export const MemberInput = styled.input`
    width: 40px;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-left: 5px;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 
    }
`