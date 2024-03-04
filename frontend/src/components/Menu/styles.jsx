import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: -200px;
    width: 200px;
    height: 100vh;
    background-color: #CDF0ED;
    border-left: 2px solid black;
    transition: right 0.5s ease;
    z-index: 7;
    &.open {
        right: 0;
    }
`;

export const UserContainer = styled.div`
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const UserImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const Text1 = styled.div`
    text-align: center;
    margin-top: 265px;
`;

export const Text2 = styled.div`
    text-align: center;
    margin-top: 20px;
`;

export const CloseBtn = styled.img`
    position:absolute;
    width:25px;
    top:30px;
    right:10px;
`;