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

  return (
    <S.PoiContainer className={`${isPoiOpen ? "open" : ""}`}>
      {/* POI 관련 정보를 여기에 표시 */}
      <S.PoiContent>
        <S.Title>
          필터
        </S.Title>
        <S.MemberContainer>
          <S.Member>동승자수</S.Member>
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
        적용하기
      </S.ComplectButton>
    </S.PoiContainer>
  );
}

export default PoiMenu;