import React, {useState} from "react";
import "./login.css";
import MainLogo from "../../assets/main_logo.png";
import LoginBtn from "../../components/login/LoginBtn";
import { Link } from "react-router-dom";
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
        <div>
        <div className="login-page">
            <div className="top">
                <div className="top-header">
                    <img className="main-logo" src={MainLogo} alt=""/>
                </div>
                <div className="wrapper">
                    <div className="top-description">
                        <h1>WELCOME !</h1>
                        <div className="underline"></div>
                        <p>같이 놀거나 여행갈 사람이 필요할 땐</p>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="wrapper">
                    <div className="login-btn-list">
                    {
                        oauthLogin.map((value,index) => {
                            return (
                                <LoginBtn loginType={value} key={index} />
                            )
                        })
                    }
                    </div>
                </div>
                <div className="no-login"><Link to={'/'}>로그인 없이 이용하기</Link></div>
            </div>
        </div>
        </div>
    )
}


export default LoginPage;
