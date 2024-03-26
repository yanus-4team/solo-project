import React, { useState, useEffect } from "react";
import * as S from "./styles";
import closeIcon from "../../assets/close-icon.svg";
import user from '../../assets/user.png';
import { Link } from "react-router-dom";
import logOutIcon from "../../assets/logout-icon.png";
import { useCookieManager } from '../../storage/cookieManager'; 
import ConfirmModal from "../ConfirmModal";

function Menu({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(false);
    const { getCookies , removeCookies} = useCookieManager();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const { accessToken, refreshToken, accessTokenExpiresIn } = getCookies();
        if (accessToken && refreshToken && accessTokenExpiresIn) {
            setIsLogin(true);
        }
    }, [getCookies]);

    const handleClose = () => {
        onClose();
    };

    const handleLogOut = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmLogOut = () => {
        removeCookies();
        setIsLogin(false);
        setShowConfirmModal(false);
    };

    const handleCancelLogOut = () => {
        setShowConfirmModal(false);
    };

    return (
        <S.Container className={`${isOpen ? "open": ""}`}>
            <S.CloseBtn src={closeIcon} onClick={handleClose} />
            <S.UserContainer>
                <S.UserImage src={user} alt="User" />
            </S.UserContainer>
            <S.GoLogin to="/login">로그인을 해주세요</S.GoLogin>
            <Link to="/myPage"><S.Text2>마이페이지</S.Text2></Link>
            <S.Text2>방문 기록</S.Text2>
            <S.Text2>내 리뷰</S.Text2>
            {isLogin && (
                <S.LogOutContainer onClick={handleLogOut}>
                    <S.LogOutIcon src={logOutIcon} />
                    <S.LogOutText>로그아웃</S.LogOutText>
                </S.LogOutContainer>
            )}
            {showConfirmModal && 
                <ConfirmModal
                    message="로그아웃 하시겠습니까?"
                    onConfirm={handleConfirmLogOut}
                    onCancel={handleCancelLogOut}
                />
            }
        </S.Container>
    );
}

export default Menu;
