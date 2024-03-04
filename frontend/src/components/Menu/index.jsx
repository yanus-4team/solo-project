import React from "react";
import * as S from "./styles";
import closeIcon from "../../assets/close-icon.svg"
import user from '../../assets/user.png';

function Menu({ isOpen }) { // isOpen prop 받기
    return (
        <S.Container className={`${isOpen ? "open": ""}`}> {/* isOpen에 따라 클래스 추가 */}
            <S.CloseBtn src={closeIcon}/>
            <S.UserContainer>
                <S.UserImage src={user} alt="User" />
            </S.UserContainer>
            <S.Text1>로그인을 해주세요</S.Text1>
            <S.Text2>마이페이지</S.Text2>
            <S.Text2>방문 기록</S.Text2>
            <S.Text2>내 리뷰</S.Text2>
        </S.Container>
    )
}

export default Menu;
