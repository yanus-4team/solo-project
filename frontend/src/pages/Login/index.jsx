import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MainLogoSrc from "../../assets/main_logo.png";
import LoginBtn from "../../components/LoginBtn";
import * as S from "./styles";

function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    }

    const handleNoLoginClick = () => {
        setShowLogin(false);
    }

    const oauthLogin = [
        {
            id: 1,
            logoUrl: "email_logo.png",
            text: "이메일"
        },
        {
            id: 2,
            logoUrl: "naver_logo.png",
            text: "네이버"
        },
        {
            id: 3,
            logoUrl: "kakao_logo.png",
            text: "카카오"
        },
        {
            id: 4,
            logoUrl: "google_logo.png",
            text: "구글"
        }
    ];

    return (
        <S.PageContainer>
            <S.TopContainer>
                <S.TopHeader>
                    <S.MainLogo src={MainLogoSrc} alt="" />
                </S.TopHeader>
                <S.Wrapper>
                    <S.TopDescription >
                        <S.Welcome>WELCOME !</S.Welcome>
                        <S.Underline className="underline"></S.Underline>
                        <S.Text>같이 놀거나 여행갈 사람이 필요할 땐</S.Text>
                    </S.TopDescription>
                </S.Wrapper>
            </S.TopContainer>
            <S.BottomContainer>
                <S.Wrapper>
                    <S.LoginBtnList>
                        {oauthLogin.map((value, index) => (
                            <LoginBtn loginType={value} key={index} />
                        ))}
                    </S.LoginBtnList>
                </S.Wrapper>
                <S.NoLoginContainer>
                    <S.NoLoginLink onClick={handleLoginClick}>로그인 없이 이용하기</S.NoLoginLink>
                 </S.NoLoginContainer>
            </S.BottomContainer>
        </S.PageContainer>
    );
}

export default LoginPage;
