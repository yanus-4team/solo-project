import styled from "styled-components"

export const SearchContainer = styled.div`
    /* position: absolute;
    display: flex;
    justify-content: center;
    height: 5vh;
    padding-top: 3vh;
    z-index: 5; */
    position: fixed;
    display: flex;
    justify-content: center;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    width:fit-content;
`;

export const SearchInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border-radius: 30px;
    border: 3px solid #077368;
    width: 400px;
    background-image: url(${props => props.icon});
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: 10px center;
    padding-left: 48px;
    outline: none;
    transition: all 0.5s;
    @media (max-width: 390px) {
        width: 48%;
    }
    &:focus{
        width:600px;
        @media (max-width:390px){
            width:200px;
        }
    }
`
