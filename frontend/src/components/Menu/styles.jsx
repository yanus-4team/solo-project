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
    top: calc(100px);
    right: 26%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
`;

export const UserImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const Text1 = styled.div`
    text-align: center;
    margin-top: 265px;
`;

export const Text2 = styled.div`
    text-align: center;
    margin-top: 20px;
`;
