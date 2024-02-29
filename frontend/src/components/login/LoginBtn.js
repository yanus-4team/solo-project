import { useNavigate } from "react-router-dom";
import "./LoginBtn.css"
import {useEffect, useState} from "react";
function LoginBtn(props) {
    const [logoSrc, setLogoSrc] = useState();
    const navigate=useNavigate();
    const fetchLogo  = async () => {
        const logo = await import(`../../assets/${props.loginType.logoUrl}`)
        setLogoSrc(logo.default);
    }
    useEffect(() => {
        fetchLogo();
    }, [props.loginType]);

    const onClickLoginbtn=(event)=>{
        const type=event.currentTarget.className.split(" ")
        const NAVER_AUTH_URL=""
        const KAKAO_AUTH_URL=""
        const GOOGLE_AUTH_URL=""
        console.log(type[1])
        if (type[1]==="이메일"){
            navigate("/login")
        }
        else if (type[1]==="네이버"){
            window.location.href=NAVER_AUTH_URL
        }
        else if(type[1]==="카카오"){
            window.location.href=KAKAO_AUTH_URL
        }
        else if(type[1]==="구글"){
            window.location.href=GOOGLE_AUTH_URL
        }
    }
    return (

            <button className={`login-btn ${props.loginType.text}`} onClick={onClickLoginbtn}>
                <div className="wrapper2">
                    <img src={logoSrc} alt=""/>
                    <span>{props.loginType.text}로 로그인</span>
                </div>
            </button>

    )
}


export default LoginBtn