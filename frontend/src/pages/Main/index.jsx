import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import menuImage from '../../assets/hamburger-icon.svg';
import Menu from '../../components/Menu';
import pinImage from '../../assets/place-icon.png';
import radioButtonImage from '../../assets/radio_button.svg'; // "radio_button.svg" 이미지 import
import SearchIcon from "../../components/Search";

const { kakao } = window;
const Main = () => {
    const [isopen, setisopen] = useState(false);
    const [map, setMap] = useState(null);
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false);
  
    const mapRef = useRef(null);
  
    const toggleMenu = () => {
      setisopen(!isopen);
    };
  
    const handleCloseMenu = () => {
      setisopen(false);
    };
  
    useEffect(() => {
      const geoLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
  
              const container = mapRef.current; // Access ref directly
              const options = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3,
              };
              const map = new kakao.maps.Map(container, options);
              setMap(map);
  
              const markerPosition = new kakao.maps.LatLng(lat, lng);
              const markerImage = new kakao.maps.MarkerImage(
                pinImage,
                new kakao.maps.Size(50, 50),
                {
                  offset: new kakao.maps.Point(15, 15),
                }
              );
              const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
              });
              marker.setMap(map);
  
              setCurrentLocationVisible(true);
            },
            (error) => {
              console.error("failed : " + error.message);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      };
      geoLocation();
    }, []);
  
    const moveToCurrentLocation = () => {
      if (navigator.geolocation && map) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const currentPosition = new kakao.maps.LatLng(lat, lng);
            map.panTo(currentPosition);
          },
          (error) => {
            console.error("failed : " + error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser or map is not initialized.");
      }
    };
  
    return (
        <S.MapContainer ref={mapRef}>
            {isopen && <S.ModalBackground onClick={toggleMenu} />}
            <SearchIcon />
            <S.MenuToggleBtnBox className={`${isopen ? "open": ""}` }>
                <S.MenuToggleBtn onClick={toggleMenu}>
                    <S.MenuImage src={menuImage} alt="Menu" className="menu-image" />
                </S.MenuToggleBtn>
            </S.MenuToggleBtnBox>
            <Menu isopen={isopen} onClose={handleCloseMenu} />
            {isCurrentLocationVisible && map && ( // 현재 위치 버튼이 보이고 map이 정의되어 있을 때만 버튼을 렌더링합니다.
                <S.CurrentLocationBtn onClick={moveToCurrentLocation}  className={`${isopen ? "open": ""}` }>
                    <S.CurrentLocationImg src={radioButtonImage} alt="Current Location" />
                </S.CurrentLocationBtn>
            )}
        </S.MapContainer>
    )
}

export default Main;
