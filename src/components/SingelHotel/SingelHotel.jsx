import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../Context/HotelProvider";
import { useEffect } from "react";

export default function SingelHotel() {
    const {id} =useParams();
    const {getHotel ,isLoadingCurrHotel ,currentHotel} = useHotels();
    useEffect(()=>{
      getHotel(id)
    },[id])
    // const {data,isLoding} = useFetch(`http://localhost:5000/hotels/${id}`)
    if (isLoadingCurrHotel || !currentHotel) return <div>loading...</div>  
  return (
    <div className="room">
        <div className="room-detail">
            <h2>{currentHotel.name}</h2>
            <div>
                {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
            </div>
            <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
        </div>

    </div>
  )
}
