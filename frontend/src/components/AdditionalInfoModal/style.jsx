// styles.js
import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
    width: 300px;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

export const ModalTitle = styled.h3`
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
`;

export const ModalBody = styled.div``;

export const EmailContainer = styled.div`
    margin-bottom: 15px;
`;

export const EmailLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const EmailInput = styled.input`
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export const PasswordContainer = styled.div`
    margin-bottom: 15px;
`;

export const PasswordLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const PasswordInput = styled.input`
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export const NickNameContainer = styled.div`
    margin-bottom: 15px;
`;

export const NickNameLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const NickNameInputContainer = styled.div`
    display: flex;
`;

export const NickNameInput = styled.input`
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export const NickNameCheckButton = styled.button`
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 5px;
`;

export const BirthContainer = styled.div`
    margin-bottom: 15px;
`;

export const BirthLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const BirthInput = styled.input`
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export const GenderContainer = styled.div`
    margin-bottom: 15px;
`;

export const GenderLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const GenderInput = styled.input`
    margin-right: 5px;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`;

export const ConfirmButton = styled.button`
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
`;

export const SelectInput = styled.select`
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

