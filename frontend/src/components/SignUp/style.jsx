import styled from "styled-components";

export const SignUpContainer = styled.div`
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

export const SignUpBox = styled.div`
    min-height: 200px;
    position: relative;
    background-color: #fff;
    padding: 45px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CloseButton = styled.img`
    margin : 0;
    width:20px;
    position: absolute;
    top: 25px;
    right: 20px;
    transition: filter 0.3s ease;
    cursor: pointer;

    &:hover {
        filter: brightness(0.8) !important;
    }
`;

export const Title = styled.h1`
    margin-bottom: -0.5rem;
    color: #333;
    font-weight: normal;
`;

export const Text = styled.h1`
    margin-bottom: 0rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const EmailAlreadyUseError = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 9.3rem;
    display:none;
`;
export const EmailFormatError = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 6.3rem;
`;

export const EmailSended = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: green;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 7.3rem;
`


export const CertiError = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 9.6rem;
`;

export const PasswordError1 = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 7rem;
    display: none;
`;

export const PasswordError2 = styled.h1`
    margin-top: -0.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 2rem;
    display: none;
`;

export const CheckError = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 7.2rem;
    display: none;
`;


export const CertiRight = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: green;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 9.6rem;
`;

export const TitleEmail = styled.h1`
    margin-bottom: -2rem;
    margin-right: 13.9rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const TitleCerti = styled.h1`
    margin-top: 20px;
    margin-bottom: -2rem;
    margin-right: 13rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const Titlepassword = styled.h1`
    margin-top: 20px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const Titlecheck = styled.h1`
    margin-top: 20px;
    margin-bottom: 0rem;
    margin-right: 10.6rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const EmailInput = styled.input`
    width: 130px;
    padding: 10px;
    margin-bottom: -1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 1rem;
`;

export const CertiInput = styled.input`
    width: 150px;
    padding: 10px;
    margin-bottom: -1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 1rem;
`;

export const PasswordInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: -1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const CheckInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: -1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const CertificationContainer = styled.div`
    display: ${({ visible }) => (visible ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
`;

export const EmailInputButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
    margin-bottom: -2rem;
`;

export const EmailButton = styled.button`
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: #CDF0ED;
    color: black;
    margin-bottom: 1rem;
    margin-top: 2rem;
    margin-left: -9rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
    &:disabled{
        background-color: #b3b3b3;
        color: black;
    }
`;

export const CertiButton = styled.button`
    width: 80px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: #CDF0ED;
    color: black;
    margin-bottom: 1rem;
    margin-top: 2rem;
    margin-left: -10rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
    &:disabled{
        background-color: #b3b3b3;
    }
`;

export const SignButton = styled.button`
    width: 270px;
    padding: 10px;
    border: none;
    margin-top: 1.5rem;
    border-radius: 30px;
    background-color: #CDF0ED;
    color: black;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
`;

export const PasswordContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    align-self: flex-start;
`;


export const CertiInputButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
    margin-bottom: -2rem;
`;

export const QuestionMark = styled.span`
    background-color: #e8e8e8;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 12px;
    cursor: pointer;
    position: relative;
    display: inline-block;
    margin-left: 1rem;
    margin-top: 10px;
`;

export const Tooltip = styled.span`
    visibility: hidden;
    width: 280px;
    background-color: #e8e8e8;
    color: black;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
    
    /* 툴팁 화살표 */
    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #e8e8e8 transparent transparent transparent;
    }

    /* QuestionMark의 상태에 따라 표시되는 툴팁 */
    ${QuestionMark}:hover & {
        visibility: visible;
    }
`;


export const TimerText = styled.span`
  color: #333;
  font-size: 0.7rem;
  font-weight: normal;
`;
