import React, { useEffect, useState } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import menuImage from '../../assets/hamburger-icon.svg';
import Menu from '../../components/Menu';
import pinImage from '../../assets/current.png';
import radioButtonImage from '../../assets/radio_button.svg'; // "radio_button.svg" 이미지 import
import SearchIcon from "../../components/Search";
import { useCookieManager } from "../../storage/cookieManager";
import PoiImage from "../../assets/pin.png"
import PoiMenu from '../../components/PoiMenu';
import Logo from "../../assets/main_logo.png"
const { kakao } = window;

const Main = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const [isPoiOpen, setIsPoiOpen] = useState(false);
    const [map, setMap] = useState(null); // map 변수 추가
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false); // 현재 위치 버튼 보이기 여부 상태 추가
    const { getCookies } = useCookieManager();

    const toggleMenu = () => {
        if (isPoiOpen) { // POI 모달이 열려 있는지 확인
            setIsPoiOpen(false); // 열려 있으면 닫기
        }
        setIsOpen(!isOpen); // 기존 메뉴 상태 변경 로직은 유지
    };
    const togglePoiMenu = () => setIsPoiOpen(!isPoiOpen);

    const handleCloseMenu = () => {
        setIsOpen(false); // 메뉴 닫기
    };

    const handleClosePoiMenu = () => {
        setIsPoiOpen(false); // 메뉴 닫기
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
        if(getCookies().accessToken) {
            const localAccessToken = getCookies().accessToken;
        fetch('http://localhost:8080/auth/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // 예를 들어, JWT 토큰을 헤더에 추가하는 방법
              'Authorization': ` ${localAccessToken}` // jwtToken은 JWT 토큰 값
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // JSON 형식으로 응답 데이터를 파싱
          })
          .then(data => {
            // 응답 데이터(data)를 처리
            console.log('User details:', data);
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
          });
        }
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
            <S.Test src={Logo} alt="로고" />
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
            <S.PoiToggleBtnBox className={`${isPoiOpen ? "open" : ""}`}> {/* POI 메뉴 위치 조정 */}
                <S.PoiToggleBtn onClick={togglePoiMenu}>
                    <S.PoiImage src={PoiImage} alt="POI" />
                </S.PoiToggleBtn>
            </S.PoiToggleBtnBox>
            <PoiMenu isPoiOpen={isPoiOpen} onClose={() => setIsPoiOpen(false)} />
            

        </S.MapContainer>
    )
}

export default Main;