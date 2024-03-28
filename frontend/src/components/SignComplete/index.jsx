import React from "react";
import * as S from "./style";
import CheckIcon from "../icons/Check";

const SignComplete = (props) => {
    return (
        <S.SignCompleteContainer>
            <S.SignBox>
                <CheckIcon color="tomato" width={'80px'}/>
                <S.Title>회원가입 완료</S.Title>
                <S.TextBox>
                <S.Text>회원가입을 완료하였습니다.</S.Text>
                <S.Text>지금 로그인하여 서비스를 이용해보세요!</S.Text>
                </S.TextBox>
                <S.Button onClick={props.onClose}>확인</S.Button>
            </S.SignBox>
        </S.SignCompleteContainer>
    )
}

export default SignComplete





