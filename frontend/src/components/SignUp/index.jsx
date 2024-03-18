import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import closeBtn from "../../assets/close-icon.svg";
import SignComplete from "../SignComplete";

const SignUpModal = (props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [timer, setTimer] = useState(180);
  const [showCertification, setShowCertification] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [certificationCode, setCertificationCode] = useState('');
  const [isCertificationCorrect, setIsCertificationCorrect] = useState(false);

  const emailInputRef = useRef(null);
  const certiInputRef = useRef(null);

  const completeSignUp = () => {
    setIsSignUpComplete(true);
  };

  const sendEmail = async () => {
    if (validateEmail(emailInputRef.current.value)) {
      try {
        const response = await fetch("http://localhost:8080/auth/verifyEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: emailInputRef.current.value,
          });
        if (response.ok) {
          const { resultData } = await response.json(); // JSON 형식의 응답을 파싱
          setEmailCode(resultData);
          setIsEmailSent(true);
          setTimer(180);
          setShowCertification(true);
          setEmailFormatError(false); // 형식 오류 초기화
        } else {
          const errorMessage = await response.text();
          setEmailFormatError(errorMessage); // 백엔드에서 전달된 에러 메시지 표시
          setIsEmailSent(false); // 이메일 전송 실패로 설정
        }
      } catch (error) {
        console.error("Failed to send verification email:", error);
        setEmailFormatError("Failed to send verification email."); // 네트워크 오류 등의 문제로 인한 에러 메시지 표시
        setIsEmailSent(false); // 이메일 전송 실패로 설정
      }
    } else {
      setEmailFormatError("올바르지 않은 이메일 형식입니다."); // 이메일 형식 오류 메시지 표시
      setIsEmailSent(false); // 이메일 전송 실패로 설정
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    console.log(emailCode); // emailCode 값이 변경될 때마다 새로운 값 로그로 출력
  }, [emailCode]);

  useEffect(() => {
    let intervalId;
    if (isEmailSent && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // 타이머가 0이 되면 clearInterval을 호출하여 타이머를 멈춤
    if (timer === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isEmailSent, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetEmail = () => {
    setTimer(180); // 타이머 초기화
  };

  const handleCertificationCheck = () => {
    console.log("잘됨.");
    if (certificationCode === emailCode) {
      console.log("잘됨.");
      setIsCertificationCorrect(true);
    } else {
      setIsCertificationCorrect(false);
    }
  };

  if (isSignUpComplete) {
    return <SignComplete onClose={props.onClose} />;
  }

  return (
    <S.SignUpContainer>
      <S.SignUpBox>
        <S.CloseButton src={closeBtn} onClick={props.onClose} />
        <S.Title>회원가입</S.Title>
        <S.TitleEmail>이메일</S.TitleEmail>
        <S.EmailInputButtonContainer>
          <S.EmailInput
            ref={emailInputRef}
            type="text"
            placeholder=""
            onChange={() => setEmailFormatError(false)} // 형식 오류 초기화
          />
          {isEmailSent ? (
            <S.EmailButton
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={resetEmail}
            >
              {hovered ? (
                "재전송"
              ) : (
                <S.TimerText style={{ color: timer <= 60 ? "red" : "inherit" }}>
                  {formatTime(timer)}
                </S.TimerText>
              )}
            </S.EmailButton>
          ) : (
            <S.EmailButton onClick={sendEmail}>이메일 인증</S.EmailButton>
          )}
        </S.EmailInputButtonContainer>
        {emailFormatError && (
          <S.EmailFormatError>올바르지 않은 이메일 형식입니다.</S.EmailFormatError>
        )}
        <S.EmailAlreadyUseError>사용중인 이메일 입니다.</S.EmailAlreadyUseError>
        {isEmailSent && <S.EmailSended>인증 이메일을 전송하였습니다.</S.EmailSended>}
        {showCertification && (
          <S.CertificationContainer visible={showCertification ? "true" : "false"}>
            <S.TitleCerti>인증번호</S.TitleCerti>
            <S.CertiInputButtonContainer>
              <S.CertiInput 
                ref={certiInputRef}
                type="text" 
                placeholder="" 
                onChange={(e) => setCertificationCode(e.target.value)}
              />
              <S.CertiButton disabled={!certificationCode || certificationCode !== emailCode} onClick={handleCertificationCheck}>
                확인
              </S.CertiButton>
            </S.CertiInputButtonContainer>
            {!isCertificationCorrect && <S.CertiError>인증번호가 틀렸습니다.</S.CertiError>}
          </S.CertificationContainer>
        )}
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
        <S.SignButton onClick={completeSignUp}>회원가입</S.SignButton>
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUpModal;
