import "./style.css";
import MainLogo from "../../assets/main_logo.png";
import { useState } from "react";
import SearchPlaceModal from "../../components/SearchPlaceModal";
function Form(){
    const [showSearchModal,setShowSearchModal]=useState(false);
    const [searchPlaceResult,setSearchPlaceResult]=useState("")
    const [placeResultArr,setPlaceResultArr]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);

    const itemsPerPage=7;
    const pages=Math.ceil(placeResultArr.length/itemsPerPage);
    const startIndex=(currentPage-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;
    const currentItems=placeResultArr.slice(startIndex,endIndex);

    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    
    const showSearchModalClick=(childEvent)=>{
        setShowSearchModal(true);
        setShowSearchModal(childEvent);
    }
    const handleSearchPlaceResult=(childResult)=>{
        setSearchPlaceResult(childResult);
        setPlaceResultArr([...placeResultArr,childResult])
    }


    return(
        <div className="FormWrapper">
            <dlv className="LOGO">
                <img className="LogoImg" src={MainLogo} alt=""/>
            </dlv>
            <div className="FormBox">
                <div className="FormField">
                    <input
                    onClick={showSearchModalClick}
                    className="InputField"
                    name="pastVisit" type="text"
                    placeholder="최근 방문지를 입력하세요."/>
                    <button className="SearchBtn" onClick={showSearchModalClick}>검색</button>
                </div>
                    <div className="ResultContainer">
                        {currentItems.map((value,index)=>(
                            <div className="ListBox" key={index}>
                                {value[0]} {value[1]}
                            </div>
                        ))}
                    </div>
                    <div className="Pagination">
                        {Array.from({length:pages},(_,i)=>i+1).map(number=>(
                            <button key={number} onClick={()=>handlePageChange(number)}
                                className={`PageButton ${currentPage===number ? "active":""}`}>
                                {number}
                            </button>
                        ))}
                    </div>
            </div>
            {
                 showSearchModal && <SearchPlaceModal showSearchModalClick={showSearchModalClick} searchPlaceResult={handleSearchPlaceResult}/>
            }
        </div>
    )
}
export default Form