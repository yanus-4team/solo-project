import React, { useState, useEffect } from 'react';
import * as S from "./styles";
import closeBtn from "../../assets/close-icon.svg"



const LoginModal = (props) => {

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
                    <S.LinkText as="a" href="/signup">회원가입</S.LinkText>
                </S.TextContainer>
            </S.LoginBox>
        </S.LoginContainer>
        </>
    );
}

export default LoginModal;
