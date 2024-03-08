import React, { useState } from "react";
import * as S from "./style";
import closeBtn from "../../assets/close-icon.svg"

const SignUpModal = (props) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <S.SignUpContainer>
            <S.SignUpBox>
                <S.CloseButton src={closeBtn} onClick={props.onClose}/>
                <S.Title>회원가입</S.Title>
                <S.TitleEmail>이메일</S.TitleEmail>
                <S.EmailInputButtonContainer>
                    <S.EmailInput type="text" placeholder="" />
                    <S.EmailButton>이메일 인증</S.EmailButton>
                </S.EmailInputButtonContainer>
                <S.EmailError>사용중인 이메일 입니다.</S.EmailError>
                <S.TitleCerti>인증번호</S.TitleCerti>
                <S.CertiInputButtonContainer>
                    <S.CertiInput type="text" placeholder="" />
                    <S.CertiButton>확인</S.CertiButton>
                </S.CertiInputButtonContainer>
                <S.CertiError>인증번호가 틀렸습니다.</S.CertiError>
                <S.PasswordContainer>
                    <S.Titlepassword>비밀번호</S.Titlepassword>
                    <S.QuestionMark onClick={() => setTooltipVisible(!tooltipVisible)}>
                    ?
                    {tooltipVisible && (
                        <S.Tooltip>
                            비밀번호는 8~15자 사이, 특수문자와 대문자 소문자 영문이 포함되어야 합니다
                        </S.Tooltip>
                    )}
                    </S.QuestionMark>
                </S.PasswordContainer>
                <S.PasswordInput type="password" placeholder="" />
                <S.PasswordError1>비밀번호 형식이 맞지 않습니다.</S.PasswordError1>
                <S.PasswordError2>(특수문자는 *이나 ? 외엔 사용할 수 없습니다.)</S.PasswordError2>
                <S.Titlecheck>비밀번호 확인</S.Titlecheck>
                <S.CheckInput type="passwordcheck" placeholder="" />
                <S.CheckError>비밀번호가 일치하지 않습니다.</S.CheckError>
                <S.SignButton>회원가입</S.SignButton>
            </S.SignUpBox>
        </S.SignUpContainer>
    );
};

export default SignUpModal;