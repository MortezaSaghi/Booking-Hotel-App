import {createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000";


export default function HotelProvider({ children }) {
  const [currentHotel,setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel,setIsLoadingCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data : hotels } = useFetch(
    `${BASE_URL}/hotels`,
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id){
    setIsLoadingCurrHotel(true);
    try {
        const {data} = await axios.get(`${BASE_URL}/hotels/${id}`)
        setCurrentHotel(data);
        
    } catch (err) {
      toast.error(err.message);
      
    }finally{
      setIsLoadingCurrHotel(false)
    }
  }

  return <HotelContext.Provider value={{isLoading , hotels ,getHotel ,currentHotel ,isLoadingCurrHotel}}>{children}</HotelContext.Provider>;
}

export function useHotels() {
  return useContext(HotelContext);
}
