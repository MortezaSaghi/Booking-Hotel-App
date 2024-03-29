import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../Context/HotelProvider";


export default function AppLayout() {
  const {hotels} = useHotels()
  return (
    <div className="app-layout">
        <div className="sidebar"><Outlet/></div>
        <Map markerLocation={hotels}/>
    </div>
  )
}
