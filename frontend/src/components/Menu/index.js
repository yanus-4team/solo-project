import React from "react"
import './menu.css'
import menuImage from '../../assets/hamburger-menu-icon.png'
import user from '../../assets/user.png'

function Menu() {


    
    return (
        <div className="menu">
            <div className="menu-container">
                <img src={menuImage} alt="Menu" className="menu-image" />
                <div className="user-container">
                    <img src={user} alt="User" className="user-image" />
                </div>
            </div>
            <div className="text1">yanus 님</div>
            <div className="text2">마이페이지</div>
            <div className="text2">방문 기록</div>
            <div className="text2">내 리뷰</div>
        </div>
    )
}

export default Menu;