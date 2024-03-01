import React, { useEffect, useState } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import menuImage from '../../assets/hamburger-menu-icon.png';
import closeImage from '../../assets/close-icon.png'; // X 아이콘 이미지 import
import Menu from '../../components/Menu';

const { kakao } = window;

const Main = () => {
    const [isOpen, setIsOpen ] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(()=>{
        const geoLocation=()=>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    const lat=position.coords.latitude;
                    const lng=position.coords.longitude;

                    const container=document.getElementById('map');
                    const options={
                        center:new kakao.maps.LatLng(lat,lng),
                        level:3
                    };
                    const map = new kakao.maps.Map(container,options);
                },(error)=>{
                    console.error("failed : "+error.message);
                });
            }else{
                console.error("Geolocation is not supported by this browser.");
            }
        };
        geoLocation();
    },[])

    return (
        <S.MapContainer id="map">
            <S.MenuToggleBtnBox className={`${isOpen ? "open": ""}` }>
                <S.MenuToggleBtn onClick={toggleMenu}>
                    <S.MenuImage src={isOpen ? closeImage : menuImage} alt="Menu" className="menu-image" />
                </S.MenuToggleBtn>
            </S.MenuToggleBtnBox>
            <Menu isOpen={isOpen} />
        </S.MapContainer>
    )
}

export default Main;
