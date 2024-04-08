import React from "react";
import * as S from "./styles";
import closeIcon from "../../assets/close-icon.svg";

function PoiMenu({ isPoiOpen, onClose }) {
  return (
    <S.PoiContainer className={`${isPoiOpen ? "open" : ""}`}>
      <S.CloseBtn src={closeIcon} onClick={onClose} />
      {/* POI 관련 정보를 여기에 표시 */}
      <S.PoiContent>
        <S.Title>
            필터
        </S.Title>
        <S.MemberContainer>
            <S.Member>동승자수</S.Member>
            <S.MemberInput type="number" min="1" /> {/* 입력칸에 숫자만 입력되도록 type="number"를 추가했습니다. */}
        </S.MemberContainer>
      </S.PoiContent>
    </S.PoiContainer>
  );
}

export default PoiMenu;