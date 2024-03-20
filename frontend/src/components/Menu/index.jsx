import React from "react";
import * as S from "./styles";
import closeIcon from "../../assets/close-icon.svg"
import user from '../../assets/user.png';
import { Link } from "react-router-dom";

function Menu({ isOpen, onClose }) { // onClose prop 추가
    const handleClose = () => {
        onClose(); // onClose 핸들러 호출
    };

    return (
        <S.Container className={`${isOpen ? "open": ""}`}>
            <S.CloseBtn src={closeIcon} onClick={handleClose} /> {/* close-btn에 onClick 이벤트 추가 */}
            <S.UserContainer>
                <S.UserImage src={user} alt="User" />
            </S.UserContainer>
            <S.GoLogin to="/login">로그인을 해주세요</S.GoLogin>
            <Link to="/myPage"><S.Text2>마이페이지</S.Text2></Link>
            <S.Text2>방문 기록</S.Text2>
            <S.Text2>내 리뷰</S.Text2>
        </S.Container>
    )
}

export default Menu;
