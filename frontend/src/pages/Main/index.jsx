import React, { useEffect, useState } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import menuImage from '../../assets/hamburger-icon.svg';
import Menu from '../../components/Menu';
import pinImage from '../../assets/place-icon.png';
import radioButtonImage from '../../assets/radio_button.svg'; // "radio_button.svg" 이미지 import
import useInput from '../../customHook/useInput';
import Input from "../../components/Input";
import { Form } from "react-router-dom";
import SearchIcon from "../../components/Search";

const { kakao } = window;

const Main = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const [map, setMap] = useState(null); // map 변수 추가
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false); // 현재 위치 버튼 보이기 여부 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열기 여부 상태 추가
    const emailInput = useInput('', validateEmail);
    const passwordInput = useInput('', validatePassword);

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

    // 모달 열기 함수
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
    };

    function validateEmail(value) {
        // 이메일 유효성 검사를 수행하고 결과를 반환합니다.
        // 예시로 간단한 형식 검사를 수행하도록 하겠습니다.
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return isValid ? 'valid' : 'invalid';
    }

    function validatePassword(value) {
        // 비밀번호 유효성 검사를 수행하고 결과를 반환합니다.
        // 예시로 비밀번호는 최소 6자 이상이어야 한다고 가정하겠습니다.
        const isValid = value.length >= 6;
        return isValid ? 'valid' : 'invalid';
    }

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("로그인?")
        // 여기서 유효성을 확인하거나 다른 작업을 수행할 수 있습니다.
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
            <S.LoginModal isOpen={isModalOpen}>
                <S.ModalContent>
                    <S.CloseButton onClick={closeModal}>X</S.CloseButton>
                    <Form onSubmit={handleSubmit}>
                        <S.Text>로그인을 해주세요</S.Text>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={emailInput.value}
                        onChange={emailInput.onChange}
                        isValid={emailInput.valid}
                    />  

                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={passwordInput.value}
                        onChange={passwordInput.onChange}
                        isValid={passwordInput.valid}
                    />
                    <S.Button>로그인</S.Button>
                </Form>
                </S.ModalContent>
            </S.LoginModal>
        </S.MapContainer>
    )
}

export default Main;