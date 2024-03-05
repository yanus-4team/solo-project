import React, { useState } from "react";
import MainLogoSrc from "../../assets/main_logo.png";
import LoginBtn from "../../components/LoginBtn";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const handleLoginClick = (loginType) => {
        const type = loginType.text;
        const NAVER_AUTH_URL = "";
        const KAKAO_AUTH_URL = "";
        const GOOGLE_AUTH_URL = "";

        if (type === "이메일") {
            navigate("/");
        } else if (type === "네이버") {
            window.location.href = NAVER_AUTH_URL;
        } else if (type === "카카오") {
            window.location.href = KAKAO_AUTH_URL;
        } else if (type === "구글") {
            window.location.href = GOOGLE_AUTH_URL;
        }
    };

    const handleNoLoginClick = () => {
        navigate('/');
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
                        <S.Text>같이 놀거나 여행갈 사람이 필요할 땐 소로</S.Text>
                    </S.TopDescription>
                </S.Wrapper>
            </S.TopContainer>
            <S.BottomContainer>
                <S.Wrapper>
                    <S.LoginBtnList>
                        {oauthLogin.map((loginType) => (
                            <LoginBtn
                                onClick={() => handleLoginClick(loginType)}
                                loginType={loginType}
                                key={loginType.id} 
                            />
                        ))}
                    </S.LoginBtnList>
                </S.Wrapper>
                <S.NoLoginContainer>
                    <S.NoLoginLink onClick={handleNoLoginClick}>로그인 없이 이용하기</S.NoLoginLink>
                 </S.NoLoginContainer>
            </S.BottomContainer>
        </S.PageContainer>
    );
}

export default LoginPage;
