import { useNavigate, useParams } from "react-router-dom"
import { useBookmark } from "../Context/BookmarkProvider";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";


export default function SingelBookmark() {
    const {id} = useParams();
    const navigate =useNavigate();
    const {getBookmark ,isLoading ,currentBookmark} =useBookmark();
    useEffect(()=>{
        getBookmark(id)
    },[id])
    if (isLoading || !currentBookmark) return <div>loading singel bookmark...</div>
  return (
    <div>
        <button className="btn btn--back" onClick={()=>navigate(-1)}>&larr;back</button>
        <h2>{currentBookmark.cityName}</h2>
        <div className={`bookmark-item mt-1`}>
                <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
                &nbsp;<strong>{currentBookmark?.cityName}</strong>&nbsp;
                <span>{currentBookmark?.country}</span>
        </div>
    </div>
  )
}
