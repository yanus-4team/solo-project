import React from 'react';
import * as S from './styles';

const NotFoundPage = () => {
    return (
        <S.Container>
            <S.ErrorCode>페이지가 없어요!</S.ErrorCode>
            <S.GoMainPage to="/">메인 페이지로 돌아가기</S.GoMainPage>
        </S.Container>
    );
};

export default NotFoundPage;