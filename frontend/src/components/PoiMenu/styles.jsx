import styled from "styled-components";

export const PoiContainer = styled.div`
  position: fixed;
  top: 0;
  left: -350px;
  width: 250px;
  height: 100vh;
  margin-left: 78px;
  border-radius: 0px 30px 30px 0px;
  background-color: #fff;
  transition: left 0.5s ease;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0); /* 그림자 추가 */
  &.open {
    left: 0;
  }
  z-index: 2; /* TapContainer 내의 모든 요소보다 뒤에 표시되도록 설정 */
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
    margin-left: 70px;
    margin-bottom: 1.8rem;
    margin-top: 10px;
    color: #333;
    font-weight: normal;
    font-size: 35px;
`
export const MemberContainer = styled.div`
  display: flex;
  align-items: center; // 자식 요소들을 세로 중앙에 정렬
  margin-bottom: 1rem; // 입력칸과 다음 요소 사이의 간격을 조정
  z-index: 99;
`;

export const Member = styled.div`
  color: #333;
  font-weight: normal;
  margin-left: 30px;
  font-size: 17px;
  margin-top: -17px;
`;

export const MemberInput = styled.input`
    width: 40px;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-left: 28px; /* 최대 입력값 제한 */
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 
    }
`;

export const ErrorMessage = styled.div`
    font-weight: normal;
    color: red;
    font-size: 0.7rem;
    margin-top: -2rem;
    margin-left: 1.6rem;
    position: absolute;
`

export const ComplectButton = styled.button`
    width: 200px;
    padding: 10px;
    border: none;
    margin-top: 30px;
    border-radius: 30px;
    background-color:  var(--primary-color);
    color: white;
    margin-top: -1.8rem;
    margin-bottom: 1.3rem;
    margin-left: 1.7rem;
    cursor: pointer;
    transition: filter 0.3s ease;
    display:block;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
`