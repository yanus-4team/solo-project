import "./style.css";
import menuImage from '../../assets/hamburger-icon.svg';
import Menu from '../../components/Menu';
import MainLogo from "../../assets/main_logo.png";
import { useState } from "react";
import SearchPlaceModal from "../../components/SearchPlaceModal";
import Logo from "../../components/icons/Logo";
function Form(){
    const [isOpen, setIsOpen ] = useState(false);
    const [map, setMap] = useState(null); // map 변수 추가
    const [isCurrentLocationVisible, setCurrentLocationVisible] = useState(false); // 현재 위치 버튼 보이기 여부 상태 추가
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const handleCloseMenu = () => {
        setIsOpen(false);
    };

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
            {isOpen && <div className="ModalBackground" onClick={toggleMenu}></div>}
            <div className={`MenuToggleBtnBox ${isOpen ? "open": ""}` }>
                <div className="MenuToggleBtn" onClick={toggleMenu}>
                    <img src={menuImage} alt="Menu" className="MenuImage" />
                </div>
            </div>
            <Menu isOpen={isOpen} onClose={handleCloseMenu} />
            <Logo  alt="logo" width="140px" height="140px" color1="#0a58ca" color2="#3d8bfd"/>
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
                                <span className="PlaceName">{value[0]} </span>
                                <span>| {value[1]}</span>
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