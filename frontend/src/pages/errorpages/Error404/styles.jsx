import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Container = styled.div`
    display: flex;
    flex-direction: column; // 추가된 코드
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f1f1f1;
`;
export const ErrorMessage = styled.h1`
    font-size: 36px;
    color: #ff0000;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    display: block;
    font-size: 36px;
    color: #ff0000;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const ErrorCode = styled.h1`
    display: block;
    font-size: 36px;
    color: #ff0000;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const GoMainPage = styled(Link)`
    display: block;
    font-size: 36px;
    color: #ff0000;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    text-decoration: none;
    &:hover {
        color: #ff0000;
        text-decoration: underline;
    }
`;