import { useEffect, useState } from "react";
import './main.css';
import menuImage from '../../assets/hamburger-menu-icon.png'
import user from '../../assets/user.png'

const { kakao } = window;

const Main = () => {

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
                console.error("Geolocation is not supported bt this browser.");
            }
        };
        geoLocation();
    },[])


    const [isOpen, setIsOpen ] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div id="map">
            <div className={`menu-toggle-btn-box   ${isOpen ? "open": ""}` }>
                            <button className="hamberger-btn" onClick={toggleMenu}>
                                <img src={menuImage} alt="Menu" className="menu-image" />
                            </button>
                        </div>
            <div className={`menu ${isOpen ? "open": ""} `}>
               
                {isOpen && (
                    <div>
                        
                        <div className="user-container">
                            <img src={user} alt="User" className="user-image" />
                        </div>
                        <div className="text1">yanus 님</div>
                        <div className="text2">마이페이지</div>
                        <div className="text2">방문 기록</div>
                        <div className="text2">내 리뷰</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main;
