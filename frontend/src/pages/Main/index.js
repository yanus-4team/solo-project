import { useEffect } from "react";
import './main.css'

const { kakao } = window;

const Main=()=>{

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

    return(
        <div>
            <div id="map"></div>
        </div>
    )
}
export default Main;