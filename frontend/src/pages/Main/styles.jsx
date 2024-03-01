import styled from "styled-components";

export const MapContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const MenuToggleBtnBox = styled.div`
    position: absolute;
    margin-right: 30px;
    margin-top: 30px;
    width: 40px;
    height: 40px;
    z-index: 5;
    right: 0;
    transition: right 0.5s ease;

    &.open {
        right: 200px;
    }
`;

export const MenuToggleBtn = styled.button`
    background-color: transparent;
`;

export const MenuImage = styled.img`
    width: 25px;
    display: block;
    margin-top: 1px;
    height: 25px;
`;
