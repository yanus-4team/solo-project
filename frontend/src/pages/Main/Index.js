import { useEffect } from "react";

const MainPage=()=>{
    const KAKAO_MAP_APPKEY=	"d6ef1fe60b7e1eeb918754b27d96c9"
    useEffect(()=>{
        const container=document.getElementById('map');
        const options={
            center:new kakao.maps.LatLng(37.354352,127.545641),
            level:3
        }
        const map = new kakao.maps.Map(container,options);
    },[])

    return(
        <>
        <div>
            <div id="map"></div>
        </div>
        </>
    )
}
export default MainPage;