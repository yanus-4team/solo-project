import React from "react";
import searchicon from "../../assets/search.png"
import * as S from "./style";

const SearchIcon = () => {
    return (
        <S.SearchContainer>
            <S.SearchInput icon={searchicon} type="text" placeholder="" />
        </S.SearchContainer>
    );
};

export default SearchIcon;