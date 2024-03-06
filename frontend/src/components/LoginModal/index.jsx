import React, { useState } from 'react';
import * as S from "./styles";
import closeBtn from "../../assets/close-icon.svg"
import SignUpModal from '../SignUp';

const LoginModal = (props) => {
    const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

    // 회원가입 모달을 표시하는 함수
    const handleSignUpClick = () => {
        setIsSignUpModalVisible(true);
    };

    // 회원가입 모달을 숨기는 함수
    const handleCloseSignUpModal = () => {
        setIsSignUpModalVisible(false);
    };

    return (
        <>
            <S.LoginContainer>
                <S.LoginBox>
                    <S.CloseButton src={closeBtn} onClick={props.onClose}/>
                    <S.Title>로그인 해주세요</S.Title>
                    <S.Input type="text" placeholder="이메일" />
                    <S.Input type="password" placeholder="비밀번호" />
                    <S.LoginButton>로그인</S.LoginButton>
                    <S.TextContainer>
                        <S.LinkText as="a" href="/find-id">아이디</S.LinkText>
                        <S.Text>/</S.Text>
                        <S.LinkText as="a" href="/find-password">비밀번호 찾기</S.LinkText>
                        <S.Text>|</S.Text>
                        <S.LinkText as="a" onClick={handleSignUpClick}>회원가입</S.LinkText>
                    </S.TextContainer>
                </S.LoginBox>
            </S.LoginContainer>
            {isSignUpModalVisible && <SignUpModal onClose={handleCloseSignUpModal} />}
        </>
    );
}

export default LoginModal;