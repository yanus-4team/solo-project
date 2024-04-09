import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style";
import { toast } from "react-toastify";

function AdditionalInfoModal({ onClose }) {
    const [additionalInfo, setAdditionalInfo] = useState({});
    const location = useLocation();
    const [memberNickName, setMemberNickName] = useState(''); 
    const params = new URLSearchParams(location.search);
    const [memberEmail] = useState(params.get('email'));
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [nicknameError, setNicknameError] = useState('');
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const birth = useRef('');
    const gender = useRef('');

    const nickname = useRef('');

    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const handleNicknameChange = (event) => {
        const newNickname = event.target.value;
        setMemberNickName(newNickname);
        // 여기에 닉네임 유효성 검사 로직 추가 (예: 길이 제한)
      };

      


    const verifyNickname = async () => {
        setIsNicknameChecked(true);
        console.log(nickname);
        try {
            const response = await fetch('http://localhost:8080/auth/verifyNickname', {
                method: 'POST',
                body:  memberNickName ,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            const data = await response.json();
            console.log(data);
            if (!data) {
                setIsNicknameValid(true);
                setNicknameError('');
                toast.success('사용 가능한 닉네임입니다.');
            } else {
                setIsNicknameValid(false);
                setNicknameError('사용중인 닉네임 입니다.');
                toast.error('사용중인 닉네임 입니다.');
            }
        } catch (error) {
            console.error('Failed to verify nickname:', error);
            setNicknameError('닉네임 인증 중 에러가 발생했습니다.');
            toast.error('닉네임 인증 중 에러가 발생했습니다.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에서 추가 정보를 서버로 전송하거나 필요한 작업을 수행하세요
        // 예: API 호출, 상태 업데이트 등
        
        
        onClose(); // 모달 닫기
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
      
        const isValidLength = newPassword.length >= 8 && newPassword.length <= 15;
        const hasSpecialChar = /[*?]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
      
        if (!isValidLength || !hasSpecialChar || !hasLowerCase) {
          if (!isValidLength) {
            setPasswordError("비밀번호는 8~15자 사이여야 합니다.");
          } else if (!hasSpecialChar) {
            setPasswordError("특수문자(*, ?)가 포함되어야 합니다.");
          } else if (!hasLowerCase) {
            setPasswordError("비밀번호에는 최소 한 개의 소문자가 포함되어야 합니다.");
          }
        } else {
          // 유효성 검사를 통과했을 때 에러 메시지를 비워줌
          setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
    
        if (password !== newConfirmPassword) {
            setIsConfirmPasswordValid(false);
        } else {
            setIsConfirmPasswordValid(true);
        }
    };
    

    return (
        <S.ModalContainer>
            <S.ModalContent>
                <S.ModalHeader>
                    <S.ModalTitle>추가 정보 입력</S.ModalTitle>
                </S.ModalHeader>
                <S.ModalBody>
                    <S.Subtitle>소셜로그인시 추가정보를 받아야해요</S.Subtitle>
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
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
                    </S.PasswordContainer>

                    <S.PasswordCheckContainer>
                        <S.PasswordCheckLabel>비밀번호 확인</S.PasswordCheckLabel>
                        <S.PasswordCheckInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {!isConfirmPasswordValid && <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>}
                    </S.PasswordCheckContainer>


                    <S.NickNameContainer>
                        <S.NickNameLabel>닉네임</S.NickNameLabel>
                        <S.NickNameInputContainer>
                            <S.NickNameInput
                                type="text"
                                name="nickName"
                                value={memberNickName}
                                onChange={handleNicknameChange}
                            />
                            <S.NickNameCheckButton onClick={verifyNickname}>
                                중복확인
                            </S.NickNameCheckButton>
                        </S.NickNameInputContainer>
                        {isNicknameValid && isNicknameChecked && <S.SuccessMessage>사용가능한 닉네임 입니다.</S.SuccessMessage>}
                        {!isNicknameValid && isNicknameChecked && <S.ErrorNickMessage>{nicknameError}</S.ErrorNickMessage>}
                    </S.NickNameContainer>

                    <S.BirthContainer> 
                        <S.BirthLabel>생년월일</S.BirthLabel>
                        <S.BirthInput
                            type="date"
                            name="birth"
                            ref={birth}
                        />
                    </S.BirthContainer>

                    <S.GenderContainer>
                        <S.GenderLabel>성별</S.GenderLabel>
                        <S.SelectInput ref={gender}>
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