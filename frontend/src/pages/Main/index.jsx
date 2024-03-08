import React, { useEffect, useState } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import menuImage from '../../assets/hamburger-icon.svg';
import Menu from '../../components/Menu';
import pinImage from '../../assets/current.png';
import radioButtonImage from '../../assets/radio_button.svg'; // "radio_button.svg" 이미지 import
import SearchIcon from "../../components/Search";

const { kakao } = window;

const Main = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const [map, setMap] = useState(null); // map 변수 추가
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false); // 현재 위치 버튼 보이기 여부 상태 추가

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleCloseMenu = () => {
        setIsOpen(false); // 메뉴 닫기
    };


    useEffect(() => {
        const geoLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    const container = document.getElementById('map');
                    const options = {
                        center: new kakao.maps.LatLng(lat, lng),
                        level: 3
                    };
                    const map = new kakao.maps.Map(container, options);
                    setMap(map); // map 변수 설정

                    // 원하는 이미지로 마커 추가
                    const markerPosition = new kakao.maps.LatLng(lat, lng);
                    const markerImage = new kakao.maps.MarkerImage(
                        pinImage,
                        new kakao.maps.Size(50, 50),
                        {
                            offset: new kakao.maps.Point(15, 15)
                        }
                    );
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        image: markerImage
                    });
                    marker.setMap(map);

                    setCurrentLocationVisible(true); // 현재 위치 버튼 표시
                },(error) => {
                    console.error("failed : " + error.message);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };
        geoLocation();
    }, []);

    // 현재 위치로 이동하는 함수
    const moveToCurrentLocation = () => {
        if (navigator.geolocation && map) { // map이 정의되어 있을 때만 실행
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const currentPosition = new kakao.maps.LatLng(lat, lng);
                map.panTo(currentPosition); // 현재 위치로 지도 이동
            }, (error) => {
                console.error("failed : " + error.message);
            });
        } else {
            console.error("Geolocation is not supported by this browser or map is not initialized.");
        }
    };



    return (
        <S.MapContainer id="map">
            {isOpen && <S.ModalBackground onClick={toggleMenu} />}
            <SearchIcon />
            <S.MenuToggleBtnBox className={`${isOpen ? "open": ""}` }>
                <S.MenuToggleBtn onClick={toggleMenu}>
                    <S.MenuImage src={menuImage} alt="Menu" className="menu-image" />
                </S.MenuToggleBtn>
            </S.MenuToggleBtnBox>
            <Menu isOpen={isOpen} onClose={handleCloseMenu} />
            {isCurrentLocationVisible && map && ( // 현재 위치 버튼이 보이고 map이 정의되어 있을 때만 버튼을 렌더링합니다.
                <S.CurrentLocationBtn onClick={moveToCurrentLocation}  className={`${isOpen ? "open": ""}` }>
                    <S.CurrentLocationImg src={radioButtonImage} alt="Current Location" />
                </S.CurrentLocationBtn>
            )}
        </S.MapContainer>
    )
}

export default Main;