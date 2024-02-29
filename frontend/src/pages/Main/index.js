import { useEffect, useState } from "react";
import './main.css';
import menuImage from '../../assets/hamburger-menu-icon.png'
import user from '../../assets/user.png'

const { kakao } = window;

const MainPage = () => {

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.354352, 127.545641),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
    }, [])

    const [isOpen, setIsOpen ] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div id="map">
            <div className="menu">
                <div className="menu-container">
                    <button onClick={toggleMenu}>
                        <img src={menuImage} alt="Menu" className="menu-image" />
                    </button>
                </div>
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

export default MainPage;
