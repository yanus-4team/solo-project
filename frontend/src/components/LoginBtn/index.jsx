// LoginBtn.jsx
import React, { useEffect, useState } from "react";
import * as S from "./styles";

function LoginBtn(props) {
    const [logoSrc, setLogoSrc] = useState();

    const fetchLogo = async () => {
        const logo = await import(`../../assets/${props.loginType.logoUrl}`);
        setLogoSrc(logo.default);
    };

    useEffect(() => {
        fetchLogo();
    }, [props.loginType]);

    const onClickLoginBtn = () => {
        props.showModal(); // 모달 열기 함수 호출
    };

    return (
        <S.Button onClick={onClickLoginBtn}>
            <S.Wrapper>
                <S.LogoImage src={logoSrc} alt="" />
                <S.LoginText>{props.loginType.text}로 로그인</S.LoginText>
            </S.Wrapper>
        </S.Button>
    );
}

export default LoginBtn;
