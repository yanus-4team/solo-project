import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Wrapper, LogoImage, LoginText } from "./styles";

function LoginBtn(props) {
    const [logoSrc, setLogoSrc] = useState();
    const navigate = useNavigate();

    const fetchLogo = async () => {
        const logo = await import(`../../assets/${props.loginType.logoUrl}`);
        setLogoSrc(logo.default);
    };

    useEffect(() => {
        fetchLogo();
    }, [props.loginType]);

    const onClickLoginBtn = (event) => {
        const type = props.loginType.text;
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

    return (
        <Button onClick={onClickLoginBtn}>
            <Wrapper>
                <LogoImage src={logoSrc} alt="" />
                <LoginText>{props.loginType.text}로 로그인</LoginText>
            </Wrapper>
        </Button>
    );
}

export default LoginBtn;
