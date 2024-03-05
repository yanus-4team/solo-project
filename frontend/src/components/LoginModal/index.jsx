// LoginModal.jsx
import React from "react";
import * as S from "./styles";

function LoginModal(props) {
    return (
        <S.LoginContainer>
            <S.LoginBox>
                <S.CloseButton onClick={props.onClose}>닫기</S.CloseButton> {/* 모달 닫기 버튼 */}
                <S.Title>로그인 해주세요</S.Title>
                <S.Input type="text" placeholder="이메일" />
                <S.Input type="password" placeholder="비밀번호" />
                <S.LoginButton>로그인</S.LoginButton>
                <S.Text>아이디 / 비밀번호 찾기 회원가입</S.Text>
            </S.LoginBox>
        </S.LoginContainer>
    );
}

export default LoginModal;
