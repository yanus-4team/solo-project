import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Wrapper, LogoImage, LoginText } from "./styles";
import { useDispatch  } from "react-redux";
import { showModal } from "../../redux/LoginSlice";
import * as S from "./styles";
import LoginModal from "../LoginModal";

function LoginBtn(props) {
    const [logoSrc, setLogoSrc] = useState();
    const navigate = useNavigate();

    // const dispatch = useDispatch();

   

    const fetchLogo = async () => {
        const logo = await import(`../../assets/${props.loginType.logoUrl}`);
        setLogoSrc(logo.default);
    };

    useEffect(() => {
        fetchLogo();
    }, [props.loginType]);

    const onClickLoginBtn = async (event) => {
        const type = props.loginType.text;
        const NAVER_AUTH_URL = "";
        const KAKAO_AUTH_URL = "";
        const GOOGLE_AUTH_URL = "";

        // dispatch(showModal("true"))
        if (type === "이메일") {
            props.showModal();
        } else if (type === "네이버") {
            window.location.href = NAVER_AUTH_URL;
        } else if (type === "카카오") {
            window.location.href = KAKAO_AUTH_URL;
        } else if (type === "구글") {
            window.location.href = GOOGLE_AUTH_URL;
        }
    };

    return (
        <>
        <S.Button onClick={onClickLoginBtn}>
            <S.Wrapper>
                <S.LogoImage src={logoSrc} alt="" />
                <S.LoginText>{props.loginType.text}로 로그인</S.LoginText>
            </S.Wrapper>
        </S.Button>
        {
            props.showModalState ? <LoginModal /> : null
        }
        </>
    );
}

export default LoginBtn;
