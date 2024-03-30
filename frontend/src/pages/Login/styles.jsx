import styled  from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    width: 100%; // 추가된 부분

    @media (max-width: 390px) {
        width: 100%; 
        padding: 0 10px; 
    }
`;

export const TopContainer = styled.div`
    text-align: center;
`;

export const TopDescription = styled.div`
    margin-top: 60px;
    text-align: left;
    color: var(--primary-color);
`
export const Welcome = styled.h1`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
    text-align: center;
`
export const Underline = styled.div`
    background-color: var(--primary-color);
    height: 4px;
    width: 100%;
    margin: 8px 0;
`
export const Text = styled.p`
    font-weight: bold;
    font-size: 28px;
    margin: 0px;
    text-align: center;
`
export const Text2 = styled.p`
    font-weight: bold;
    font-size: 28px;
    margin: 0px;
    text-align: center;
`

export const MainLogo = styled.svg`
    /* width: 200px; */
    width: 160px;
    margin-bottom: 20px;
    fill: tomato;
`

export const Wrapper = styled.div`
    padding: 0 60px;
    @media (max-width: 390px) {
        padding: 0 20px; // 수정된 부분
    }
`;

export const TopHeader = styled.div`
    margin-top: 80px;
`;

export const LoginBtnList = styled.div`

`;

export const BottomContainer = styled.div`
    text-align: center;
    margin-top: 40px;
`;

export const NoLoginLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        text-decoration: underline;
        font-weight: bold;
    }
`;

export const NoLoginContainer = styled.div`
    padding:20px;
    text-align: center;
    margin-top: 8px;
`;
