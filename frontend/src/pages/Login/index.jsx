// LoginPage 컴포넌트
import React, { useState } from "react";
import MainLogoSrc from "../../assets/main_logo.png";
import LoginBtn from "../../components/LoginBtn";
import LoginModal from "../../components/LoginModal";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleNoLoginClick = () => {
        navigate("/");
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

    const showModalFn = () => {
        setShowModal(!showModal); // showModal 상태 변경
    }

    // 모달 닫기 이벤트 핸들러
    const handleCloseModal = () => {
        setShowModal(false);
    }

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
                        {oauthLogin.map((value, index) => (
                            <LoginBtn showModal={showModalFn} showModalState={showModal} loginType={value} key={index} />
                        ))}
                    </S.LoginBtnList>
                </S.Wrapper>
                <S.NoLoginContainer>
                    <S.NoLoginLink onClick={handleNoLoginClick}>로그인 없이 이용하기</S.NoLoginLink>
                 </S.NoLoginContainer>
            </S.BottomContainer>
            {/* showModal 상태에 따라 LoginModal을 조건부 렌더링 */}
            {showModal && <LoginModal onClose={handleCloseModal} />} 
        </S.PageContainer>
    );
}

export default LoginPage;
