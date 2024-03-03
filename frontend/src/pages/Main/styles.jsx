import styled from "styled-components";

export const MapContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: visible; /* 이 부분을 추가하여 버튼이 영역을 벗어나도 보이도록 설정 */
`;

export const MenuToggleBtnBox = styled.div`
    position: absolute;
    width: fit-content;
    height: fit-content;
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    z-index: 5;
    right: 0;
    background-color: #CDF0ED;
    border-radius: 0 0 0 13px;
    transition: right 0.5s ease;
    &.open {
        right: 200px;
    }
`;

export const MenuToggleBtn = styled.button`
    background-color: transparent;
`;

export const MenuImage = styled.img`
    width: 35px;
    display: block;
    margin-top: 1px;
    height: 35px;
`;

export const CurrentLocationBtn = styled.button`
    position: absolute;
    bottom: 20px;
    right: 0;
    z-index: 5;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 13px 0 0 13px;
    border-left: 2px solid black;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    transition: right 0.5s ease;
    background-color: #CDF0ED;
    &.open {
        right: 200px;
    }
`;

export const CurrentLocationImg = styled.img`
    width: 100%;
    height: 100%;
    transition: right 0.5s ease;
    
`;

export const LoginModal = styled.div`
    display: ${props => props.isOpen ? "block" : "none"}; // 모달 열기/닫기 상태에 따라 표시 여부 결정
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    border:2px solid black;
`;

export const ModalContent = styled.div`
    padding: 30px;

`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: gray;
`;

export const OpenModalButton = styled.button`
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    z-index: 10;
`;
export const Button = styled.button`
    background-color:  #CDF0ED;
    width: 100%;
`;

export const Text = styled.text`
    text-align: center;
    display: block;
    margin:10px;
    font-size: 30px;
`