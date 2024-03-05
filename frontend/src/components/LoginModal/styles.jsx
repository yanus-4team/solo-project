import styled from "styled-components";

export const LoginContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const LoginBox = styled.div`
    background-color: #fff;
    padding: 40px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: normal;
`;

export const Input = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const LoginButton = styled.button`
    width: 250px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: #CDF0ED;
    color: black;
    margin-bottom: 1rem;
    cursor: pointer;
`;

export const Text = styled.p`
    color: #555;
    font-size: 0.9rem;
`;
export const CloseButton = styled.h1`

`;