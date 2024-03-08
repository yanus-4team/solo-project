import styled from "styled-components";

export const SignCompleteContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`

export const SignBox = styled.div`
    position: relative;
    background-color: #fff;
    padding: 45px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CloseButton = styled.img`
margin : 0;
width:20px;
position: absolute;
top: 25px;
right: 20px;
transition: filter 0.3s ease;
cursor: pointer;

&:hover {
    filter: brightness(0.8) !important; /* !important 키워드 추가 */
}
`;

export const Title = styled.h1`
    margin-bottom: -0.5rem;
    color: #333;
    font-weight: normal;
`;

export const Guest = styled.div`
    margin-top: 1rem;
    margin-bottom: -0.5rem;
    color: #333;
    font-weight: normal;
`

export const Text = styled.div`
    margin-top: 1rem;
    margin-bottom: -0.5rem;
    color: #333;
    font-size: normal;
`