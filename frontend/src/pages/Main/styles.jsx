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

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 7; 
`;

export const PoiToggleBtnBox = styled.div`
    position: absolute;
    width: 70px;
    height: 60px;
    z-index: 2;
    left: 0px;
    top: 110px;
    background-color: ${({ isActive }) => (isActive ? '#f0f0f0' : '#fff')}; /* isActive 상태에 따라 배경색 변경 */
    border-radius: 0px 0px 0px 0px;
    transition: background-color 0.5s ease; /* 배경색 변경에 대한 transition 추가 */
    flex-direction: column;
    display:flex;
    padding:8px 3px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0);
    cursor: pointer; /* 클릭 가능한 요소로 설정 */
`;

export const PoiToggleBtn = styled.button`
    background-color: transparent;
`;

export const PoiImage = styled.img`
    width: 30px;
    display: block;
    height: 30px;
    margin-left: 15px;
    margin-top: 8px;
`;


export const LogoContainer=styled.div`
    position: absolute;
    width: 40px;
    z-index: 2;
`

export const TapContainer = styled.div`
    position: absolute;
    width: 77px;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 44px; /* 로고와 위의 간격 */
    padding-bottom: 20px; /* 하단 여백 조정 */
    top: 0;
    left: 0;
    z-index: 100; /* 기존 스타일에 없던 z-index 추가 */
    border-right: 1px solid black;
    z-index: 2;
`

export const PoiText = styled.div`
    font-size: 14px;
    margin-left: 2px;
`