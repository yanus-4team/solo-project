import React from "react";
import * as S from "./style";

const LoginModal = () => {
    return (
        <S.LoginContainer>
            <S.LoginBox>
                <S.Title>로그인 해주세요</S.Title>
                <S.Input type="text" placeholder="이메일" />
                <S.Input type="password" placeholder="비밀번호" />
                <S.LoginButton>로그인</S.LoginButton>
                <S.Text>아이디 / 비밀번호를 잊었어요 회원가입</S.Text>
            </S.LoginBox>
        </S.LoginContainer>
    );
}

export default LoginModal;