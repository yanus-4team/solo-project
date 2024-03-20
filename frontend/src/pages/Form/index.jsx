import "./style.css";
import MainLogo from "../../assets/main_logo.png";
import { useState } from "react";
import SearchPlaceModal from "../../components/SearchPlaceModal";
function Form(){
    const [showSearchModal,setShowSearchModal]=useState(false);
    const [searchPlaceResult,setSearchPlaceResult]=useState("")
    const [placeResultArr,setPlaceResultArr]=useState([]);
    const [birthdate, setBirthdate] = useState("");
    
    const showSearchModalClick=(childEvent)=>{
        setShowSearchModal(true);
        setShowSearchModal(childEvent);
    }
    const handleSearchPlaceResult=(childResult)=>{
        setSearchPlaceResult(childResult);
        setPlaceResultArr([...placeResultArr,childResult])
    }
    const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value); // 생년월일 변경 핸들러
      };

    return(
        <div className="FormWrapper">
            <div className="Logo">
                <img className="LogoImg" src={MainLogo} alt=""/>
            </div>
            <div className="FormBox">
                <label htmlFor="gender">성별 :
                    <input type="radio" name="gender" value="male"/> 남
                    <input type="radio" name="gender" value="female"/> 여
                </label>
                <br/>
                <br/>
                <label htmlFor="birthdate">생년월일 :
                    <input type="date" name="birthdate" value={birthdate} onChange={handleBirthdateChange}></input>
                </label>
                <br/>
                <br/>
                <label htmlFor="pastVisit">
                    최근 방문지 : 
                    <input value={searchPlaceResult} defaultValue={searchPlaceResult} onClick={showSearchModalClick} className="PastVisitInput" name="pastVisit" type="text"/>
                    <button className="SearchBtn" onClick={showSearchModalClick} type="button">검색</button>
                </label>
                {
                    searchPlaceResult && placeResultArr.map((value,index)=>(
                        <div className="ListBox">
                            {value}    
                        </div>
                    ))
                }
            </div>
            {
                showSearchModal && <SearchPlaceModal showSearchModalClick={showSearchModalClick} searchPlaceResult={handleSearchPlaceResult}/>
            }
        </div>
    )

}
export default Form