import React, { useState, } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style";

function AdditionalInfoModal({ onClose }) {
    const [additionalInfo, setAdditionalInfo] = useState({});
    const location = useLocation();
    const [memberNickName, setMemberNickName] = useState(''); 
    const params = new URLSearchParams(location.search);
    const [memberEmail, setMemberEmail] = useState(params.get('email'));
    const [gender, setGender] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdditionalInfo({ ...additionalInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에서 추가 정보를 서버로 전송하거나 필요한 작업을 수행하세요
        // 예: API 호출, 상태 업데이트 등
        console.log("추가 정보:", additionalInfo);
        onClose(); // 모달 닫기
    };

    return (
        <S.ModalContainer>
            <S.ModalContent>
                <S.ModalHeader>
                    <S.ModalTitle>추가 정보 입력</S.ModalTitle>
                </S.ModalHeader>
                    <S.ModalTitle>소셜로그인시 추가정보를 받아야해요</S.ModalTitle>
                <S.ModalBody>
                    <S.EmailContainer>
                        <S.EmailLabel>이메일</S.EmailLabel>
                        <S.EmailInput
                            type="email"
                            name="email"
                            value={memberEmail}
                            disabled
                        />
                    </S.EmailContainer>

                    <S.PasswordContainer>
                        <S.PasswordLabel>비밀번호</S.PasswordLabel>
                        <S.PasswordInput
                            type="password"
                            name="password"
                            value={additionalInfo.password || ""}
                            onChange={handleChange}
                        />
                    </S.PasswordContainer>

                    <S.NickNameContainer>
                        <S.NickNameLabel>닉네임</S.NickNameLabel>
                        <S.NickNameInputContainer>
                            <S.NickNameInput
                                type="text"
                                name="nickName"
                                value={memberNickName}
                                onChange={(e) => setMemberNickName(e.target.value)}
                            />
                            <S.NickNameCheckButton>중복확인</S.NickNameCheckButton>
                        </S.NickNameInputContainer>
                    </S.NickNameContainer>

                    <S.BirthContainer> 

                        <S.BirthLabel>생년월일</S.BirthLabel>
                            <S.BirthInput
                                type="date"
                                name="birth"
                                value={additionalInfo.birth || ""}
                                onChange={handleChange}
                            />

                    </S.BirthContainer>

                    <S.GenderContainer>

                        <S.GenderLabel>성별</S.GenderLabel>

                        <S.SelectInput value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">선택...</option>
                            <option value="남성">남성</option>
                            <option value="여성">여성</option>
                        </S.SelectInput>
                    </S.GenderContainer>
                    <S.ConfirmButton onClick={handleSubmit}>완료</S.ConfirmButton>
                </S.ModalBody>
            </S.ModalContent>
        </S.ModalContainer>
    );
}

export default AdditionalInfoModal;
