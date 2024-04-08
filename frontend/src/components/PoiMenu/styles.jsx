import styled from "styled-components";

export const PoiContainer = styled.div`
  position: fixed;
  top: 0;
  left: -350px;
  width: 300px;
  margin-left: 8px;
  margin-top: 100px;
  height: 200px;
  border-radius: 30px;
  background-color: #fff;
  transition: left 0.5s ease;
  z-index: 10;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  &.open {
    left: 0;
  }
  @media (max-width: 768px) {
    width: 300px;
    left: -350px;
    margin-left: 8px;
    margin-top: 100px;
    height: 130px;
    border-radius: 30px;
    &.open {
      left: 0;
    }
  }
`;

export const CloseBtn = styled.img`
  position: absolute;
  width: 20px;
  top: 25px;
  right: 20px;
  cursor: pointer;
`;

export const PoiContent = styled.div`
  padding: 20px;
  // 필요한 스타일 추가
`;

export const Title = styled.div`
    margin-left: 100px;
    margin-bottom: 2rem;
    margin-top: 50px;
    color: #333;
    font-weight: normal;
    font-size: 30px;
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