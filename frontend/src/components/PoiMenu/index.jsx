import React, { useState } from "react"; // useState import 추가
import * as S from "./styles";

function PoiMenu({ isPoiOpen }) {
  const [errorMessage, setErrorMessage] = useState(""); // useState 사용

  const handleChange = (e) => {
    const value = e.target.value.trim(); // 입력 값의 앞뒤 공백을 제거
    if (!/^\d+$/.test(value) || value < 0 || value > 50) {
      setErrorMessage("0~50만 입력가능합니다.");
    } else {
      setErrorMessage("");
    }
  };
  const applyFilter=()=>{

  }

  return (
    <S.PoiContainer className={`${isPoiOpen ? "open" : ""}`}>
      {/* POI 관련 정보를 여기에 표시 */}
      <S.PoiContent>
        <S.Title>
          탐색 옵션 설정
        </S.Title>
        <S.HelperText>동행자 수에 맞는 POI를 추천받으세요.</S.HelperText>
        <S.MemberContainer>
          <S.Member>동행자 수 :</S.Member>
          <S.MemberInput
            type="number"
            min="0"
            max="50"
            onChange={handleChange}
          />
        </S.MemberContainer>
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      </S.PoiContent>
      <S.ComplectButton>
        설정 적용
      </S.ComplectButton>
    </S.PoiContainer>
  );
}

export default PoiMenu;