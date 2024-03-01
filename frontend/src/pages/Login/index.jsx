import React, { useState } from "react";
import MainLogoSrc from "../../assets/main_logo.png";
import LoginBtn from "../../components/LoginBtn";
import { PageContainer,TopHeader, TopContainer, TopDescription, Underline, BottomContainer, Welcome, Text, NoLoginContainer, NoLoginLink, MainLogo, Wrapper, LoginBtnList } from "./styles";

function LoginPage() {
    const [oauthLogin, setOauthLogin] = useState([
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
    ])
    return (
        <PageContainer>
            <TopContainer>
                <TopHeader>
                    <MainLogo src={MainLogoSrc} alt="" />
                </TopHeader>
                <Wrapper>
                    <TopDescription >
                        <Welcome>WELCOME !</Welcome>
                        <Underline className="underline"></Underline>
                        <Text>같이 놀거나 여행갈 사람이 필요할 땐</Text>
                    </TopDescription>
                </Wrapper>
            </TopContainer>
            <BottomContainer>
                <Wrapper>
                    <LoginBtnList>
                        {oauthLogin.map((value, index) => (
                            <LoginBtn loginType={value} key={index} />
                        ))}
                    </LoginBtnList>
                </Wrapper>
                <NoLoginContainer>
                    <NoLoginLink to={'/'}>로그인 없이 이용하기</NoLoginLink>
                 </NoLoginContainer>
            </BottomContainer>
        </PageContainer>
    );
}

export default LoginPage;
