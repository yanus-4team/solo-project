import React from "react";
import * as S from "./style";
import closeBtn from "../../assets/close-icon.svg"

const SignComplete = (props) => {
    return (
        <S.SignCompleteContainer>
            <S.SignBox>
                <S.CloseButton src={closeBtn} onClick={props.onClose}/>
                <S.Title>회원가입</S.Title>
                <S.Guest>땡땡 회원님!</S.Guest>
                <S.Text>회원이 되신걸 축하드립니다!</S.Text>
                <S.Text>더 많은걸 함께해요</S.Text>
            </S.SignBox>
        </S.SignCompleteContainer>
    )
}

export default SignComplete


