import React, { useEffect, useState } from "react";
import * as S from "./styles"; // 스타일 파일 가져오기
import Menu from '../../components/Menu';
import User from '../../components/icons/User';
import pinImage from '../../assets/current.png';
import radioButtonImage from '../../assets/radio_button.svg'; // "radio_button.svg" 이미지 import
import SearchIcon from "../../components/Search";
import PoiImage from "../../assets/pin.png"
import PoiMenu from '../../components/PoiMenu';
import Logo from "../../components/icons/Logo";
const { kakao } = window;


const Main = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const [isPoiOpen, setIsPoiOpen] = useState(false);
    const [map, setMap] = useState(null); // map 변수 추가
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false); // 현재 위치 버튼 보이기 여부 상태 추가
    const [isactive, setIsactive] = useState(false);

    const toggleMenu = () => {
        if (isPoiOpen) { // POI 모달이 열려 있는지 확인
            setIsPoiOpen(false); // 열려 있으면 닫기
        }
        setIsOpen(!isOpen); // 기존 메뉴 상태 변경 로직은 유지
    };
    const togglePoiMenu = () => setIsPoiOpen(!isPoiOpen);

    const handleClick = () => {
        setIsactive(!isactive); // 클릭 시 isActive 상태를 토글
    };

    const handleCloseMenu = () => {
        setIsOpen(false); // 메뉴 닫기
    };

    const handleClosePoiMenu = () => {
        setIsPoiOpen(false); // 메뉴 닫기
    };

    const SearchPOIBtn=()=>{
        var POIImageSrc=PoiImage,
            POIImageSize=new kakao.maps.Size(36,40),
            POIImageOption={offset:new kakao.maps.Point(27,69)};

        // POI 마커 이미지정보를 가진 마커이미지 생성
        var POIMarkerImage=new kakao.maps.MarkerImage(POIImageSrc,POIImageSize,POIImageOption),
            POIMarkerPosition=new kakao.maps.LatLng(37.54699,127.09598);

        // POI 마커 생성
        // var POIMarker=new kakao.maps.Marker({
        //     position:POIMarkerPosition,
        //     image:POIMarkerImage
        // });

        // POI 마커가 지도 위에 표시되도록 설정
        // POIMarker.setMap(map);
        
        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능
        // var POIContent='<div class="customoverlay">' +
        // '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        // '    <span class="title"></span>' +
        // '  </a>' +
        // '</div>';

        // 커스텀 오버레이가 표시될 위치
        // var POIPosition=new kakao.maps.LatLng(37.54699, 127.09598);

        // 커스텀 오버레이 생성
        // var customOverlay = new kakao.maps.CustomOverlay({
        //     map: map,
        //     position: POIPosition,
        //     content: POIContent,
        //     yAnchor: 1 
        // });

        // 주소-좌표 변환 객체 생성
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        geocoder.addressSearch('경북 안동시 송천1길 146-9', function(result, status) {

            // 정상적으로 검색이 완료시
            if (status === kakao.maps.services.Status.OK) {
                console.log(result)
                var POIPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시
                var POIMarker = new kakao.maps.Marker({
                    map: map,
                    position: POIPosition,
                    image:POIMarkerImage
                });

                // 인포윈도우로 설명 표시
                var infoWindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;font-weight:bold;">POI임</div>'
                });
                
                // 마우스오버 이벤트
                kakao.maps.event.addListener(POIMarker, 'mouseover', function() {
                    // 마우스오버 이벤트가 발생시 인포윈도우 표시
                    infoWindow.open(map, POIMarker);
                });
  
                // 마우스아웃 이벤트
                kakao.maps.event.addListener(POIMarker, 'mouseout', function() {
                    // 마우스아웃 이벤트가 발생시 인포윈도우 제거
                    infoWindow.close();
                });

                // 지도의 중심을 결과값으로 받은 위치로 이동
                map.setCenter(POIPosition);
            } 
        });    
    }

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

                    // 지도타입 컨트롤을 생성
                    var mapTypeControl = new kakao.maps.MapTypeControl();

                    // 지도에 컨트롤을 추가
                    map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOM);

                    // 줌 컨트롤을 생성
                    var zoomControl = new kakao.maps.ZoomControl();
                    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

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
            <Menu isOpen={isOpen} onClose={handleCloseMenu} />
            {isCurrentLocationVisible && map && (
                <S.CurrentLocationBtn onClick={moveToCurrentLocation}  className={`${isOpen ? "open": ""}` }>
                    <S.CurrentLocationImg src={radioButtonImage} alt="Current Location" />
                </S.CurrentLocationBtn>
            )}
            <S.TapContainer>
                <S.LogoContainer onClick={SearchPOIBtn}>
                    <Logo  alt="logo" width="40px" height="40px" color1="var(--sub-color2)" color2="var(--sub-color1)"/>
                </S.LogoContainer>
                <S.PoiToggleBtnBox {...(isactive ? { isactive: "true" } : {})} onClick={togglePoiMenu}>
                    <S.PoiToggleBtn>
                        <S.PoiImage src={PoiImage} alt="POI" />
                        <S.PoiText>POI 찾기</S.PoiText>
                    </S.PoiToggleBtn>
                </S.PoiToggleBtnBox>
                <S.CourseToggleBtnBox {...(isactive ? { isactive: "true" } : {})} onClick={togglePoiMenu}>
                    <S.CourseToggleBtn>
                        <S.CourseImage src={PoiImage} alt="COURSE" />
                        <S.CourseText>코스 찾기</S.CourseText>
                    </S.CourseToggleBtn>
                </S.CourseToggleBtnBox>
                <S.MemberToggleBtnBox className={`${isOpen ? "open": ""}` }>
                    <S.MenuToggleBtn onClick={toggleMenu}>
                        <User alt="user" width="40px" height="40px" color="#6c757d"/>
                    </S.MenuToggleBtn>
                </S.MemberToggleBtnBox>
            </S.TapContainer>
            <PoiMenu isPoiOpen={isPoiOpen} onClose={() => setIsPoiOpen(false)} />
        </S.MapContainer>
    )
}

export default Main;