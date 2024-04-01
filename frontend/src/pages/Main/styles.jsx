import styled, { css } from "styled-components";

const focusStyles = css`
background-color: #f0efef; 
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.8);
transition: background-color 0.5s ease, box-shadow 0.5s ease;
`;


export const MapContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: visible;
`;

export const MenuToggleBtnBox = styled.div`
    position: absolute;
    width: fit-content;
    height: fit-content;
    z-index: 5;
    right: 0;
    top: 43px;
    background-color: #fff;
    border-radius: 13px 0 0 13px;
    transition: right 0.5s ease;
    flex-direction: column;
    display:flex;
    padding:8px 3px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
    &:hover {
        ${focusStyles}
    }
`;

export const MenuToggleBtn = styled.button`
    background-color: transparent;
`;

export const MenuImage = styled.img`
    width: 30px;
    display: block;
    margin-top: 1px;
    height: 30px;
`;

export const CurrentLocationBtn = styled.button`
    position: absolute;
    bottom: 20px;
    right: 10px;
    z-index: 5;
    width: 45px;
    height: 45px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 50px ;
    transition: right 0.5s ease;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); 
    &:hover {
        ${focusStyles}
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
    border-radius: 35px;
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

export const Button = styled.button`
    background-color:  #CDF0ED;
    width: 100%;
`;

export const Text = styled.text`
    text-align: center;
    display: block;
    margin:10px;
    font-size: 30px;
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 7; 
`;