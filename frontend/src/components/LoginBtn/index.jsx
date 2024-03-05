import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Wrapper, LogoImage, LoginText } from "./styles";
import { useDispatch  } from "react-redux";
import { showModal } from "../../redux/LoginSlice";
import * as S from "./styles";

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


    return (
        <S.Button>
            <S.Wrapper>
                <S.LogoImage src={logoSrc} alt="" />
                <S.LoginText>{props.loginType.text}로 로그인</S.LoginText>
            </S.Wrapper>
        </S.Button>
    );
}

export default LoginBtn;
