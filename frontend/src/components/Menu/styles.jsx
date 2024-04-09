import styled from "styled-components";
import { Link } from "react-router-dom";


export const Container = styled.div`
    position: fixed;
    top: 0;
    right: -200px;
    width: 200px;
    height: 100vh;
    /* background-color: #CDF0ED; */
    background-color: #fff;
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

export const GoLogin = styled(Link)`
    text-align: center;
    margin-top: 265px;
    display: block;
    text-decoration: none;
    cursor: pointer;
    color: black;
`;

export const Text2 = styled.div`
    text-align: center;
    margin-top: 20px;
    color: black;
`;

export const CloseBtn = styled.img`
    position:absolute;
    width:25px;
    top:55px;
    right:10px;
`;
export const LogOutContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;
`;
export const LogOutIcon = styled.img`
    width: 30px;
    margin-right: 5px;
`;
export const LogOutText = styled.div`
    color: black;

`;
