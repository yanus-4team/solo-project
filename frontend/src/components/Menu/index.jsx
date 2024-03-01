import React from "react";
import * as Styled from "./styles";
import user from '../../assets/user.png';

function Menu({ isOpen }) { // isOpen prop 받기
    return (
        <Styled.Container className={`${isOpen ? "open": ""}`}> {/* isOpen에 따라 클래스 추가 */}
            <Styled.UserContainer>
                <Styled.UserImage src={user} alt="User" />
            </Styled.UserContainer>
            <Styled.Text1>yanus 님</Styled.Text1>
            <Styled.Text2>마이페이지</Styled.Text2>
            <Styled.Text2>방문 기록</Styled.Text2>
            <Styled.Text2>내 리뷰</Styled.Text2>
        </Styled.Container>
    )
}

export default Menu;
