import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import closeBtn from "../../assets/close-icon.svg";
import SignComplete from "../SignComplete";
import { toast } from 'react-toastify';

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
  const [isCertificationWrong, setIsCertificationWrong] = useState(false); // 새로운 상태 추가
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isSpecialCharValid, setIsSpecialCharValid] = useState(true);
  const passwordLengthRegex = /^[A-Za-z\d*?]{8,15}$/; // 길이 8~15 사이
  const passwordSpecialCharRegex = /[*?]/; // 특수 문자는 * 또는 ?만 유효

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지 상태 추가
  
  const emailInputRef = useRef(null);
  const certiInputRef = useRef(null);
  const certiButtonRef = useRef(null);
  const emailButtonRef = useRef(null);
  const passwordInputRef = useRef(null);


  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const isValidLength = newPassword.length >= 8 && newPassword.length <= 15;
    const hasSpecialChar = /[*?]/.test(newPassword); // 특수문자 * 또는 ? 포함
    const hasLowerCase = /[a-z]/.test(newPassword); // 소문자 포함

    setIsPasswordValid(isValidLength && hasSpecialChar && hasLowerCase);

    // 특수 문자 검사
    if (passwordSpecialCharRegex.test(newPassword)) {
      setIsSpecialCharValid(false);
    } else {
      setIsSpecialCharValid(true);
    }
  
    // 길이 검사
    if (passwordLengthRegex.test(newPassword)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };


  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsConfirmPasswordValid(newConfirmPassword === password); // 비밀번호와 비밀번호 확인이 같은지 검사
  };

  const validatePassword = () => {
    setIsSpecialCharValid(true);
    setIsConfirmPasswordValid(true);
    setPasswordError("");

    if (!password) {
      setPasswordError("비밀번호를 입력하십시오.");
      return false;
    }
    if (!(password.length >= 8 && password.length <= 15)) {
      setPasswordError("비밀번호는 8~15자 사이여야 합니다.");
      return false;
    }
    if (!/[*?]/.test(password)) {
      setPasswordError("비밀번호에는 특수문자(*, ?)가 포함되어야 합니다.");
      setIsSpecialCharValid(false);
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("비밀번호에는 소문자가 포함되어야 합니다.");
      return false;
    }
    if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false);
      setPasswordError("입력하신 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const completeSignUp = () => {
    if (validatePassword()) {
      // 비밀번호 유효성 검사 통과 시, 회원가입 완료 처리
      setIsSignUpComplete(true);
    } else {
      // 실패 시, 유효성 검사에 따른 에러 메시지가 표시됩니다.
    }
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
          toast.success("이메일이 전송되었습니다");
          const { resultData } = await response.json(); // JSON 형식의 응답을 파싱
          setEmailCode(resultData);
          setIsEmailSent(true);
          setTimer(180);
          setShowCertification(true);
          setEmailFormatError(false); // 형식 오류 초기화
        } else {
          const errorMessage = await response.text();
          toast.error("이메일이 전송되었습니다");
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
    setEmailCode('');
  };

  const handleCertificationCheck = () => {
    if (certificationCode === emailCode) {
      emailInputRef.current.disabled = true;
      emailButtonRef.current.disabled = true;
      certiInputRef.current.disabled = true;
      certiButtonRef.current.disabled = true;
      setIsCertificationCorrect(true);
      setIsCertificationWrong(false); // 인증 성공 시 인증 실패 상태를 초기화
    } else {
      setIsCertificationCorrect(false);
      setIsCertificationWrong(true); // 인증 실패 시 인증 실패 상태를 설정
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
          {isEmailSent ? isCertificationCorrect ?   <S.EmailButton
          ref={emailButtonRef}
          onClick={sendEmail}
          >
          인증완료
        </S.EmailButton>
        : (
          <S.EmailButton
          ref={emailButtonRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={timer === 0 ? resetEmail : sendEmail}
        >
          {timer === 0 ? "재전송" : (
            hovered ? "재전송" : (
              <S.TimerText style={{ color: timer <= 60 ? "red" : "inherit" }}>
                {formatTime(timer)}
              </S.TimerText>
            )
          )}
        </S.EmailButton>
      ) : (
        <S.EmailButton
          ref={emailButtonRef}
          onClick={sendEmail}
        >
          이메일 인증
        </S.EmailButton>
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
              <S.CertiButton ref={certiButtonRef} onClick={handleCertificationCheck}>
                확인
              </S.CertiButton>
            </S.CertiInputButtonContainer>
            {isCertificationWrong && (
              <S.CertiError>인증번호가 틀렸습니다.</S.CertiError>
            )}
            {isCertificationCorrect && (
              <S.CertiRight>인증번호가 맞았습니다.</S.CertiRight>
            )}
          </S.CertificationContainer>
        )}
        {isCertificationCorrect && (
      <S.BottomContainer isVisible={isCertificationCorrect}>
        <S.PasswordContainer>
        <S.TitlePassword>비밀번호</S.TitlePassword>
              <S.QuestionMark onClick={() => setTooltipVisible(!tooltipVisible)}>
                ?
                {tooltipVisible && (
                  <S.Tooltip>
                    비밀번호는 8~15자 사이, 특수문자와 대문자 소문자 영문이 포함되어야 합니다
                  </S.Tooltip>
                )}
              </S.QuestionMark>
          <S.PasswordInput type="password" placeholder="" ref={passwordInputRef} onChange={handlePasswordChange}/>
          {passwordError === "비밀번호를 입력하십시오." && <S.PasswordError1>{passwordError}</S.PasswordError1>}
          {passwordError === "비밀번호는 8~15자 사이여야 합니다." && <S.PasswordError1>{passwordError}</S.PasswordError1>}
          {!isSpecialCharValid && (
            <>
              <S.PasswordError1>비밀번호 형식이 맞지 않습니다.</S.PasswordError1>
              <S.PasswordError2>(특수문자는 *이나 ? 외엔 사용할 수 없습니다.)</S.PasswordError2>
            </>
          )}
        </S.PasswordContainer>
        <S.TitleCheck>비밀번호 확인</S.TitleCheck>
        <S.CheckInput type="password" placeholder="" onChange={handleConfirmPasswordChange} />
        {!isConfirmPasswordValid && <S.CheckError>비밀번호가 일치하지 않습니다.</S.CheckError>}
        <S.SignButton onClick={completeSignUp}>회원가입</S.SignButton>
      </S.BottomContainer>
    )}
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUpModal;