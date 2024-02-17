import { Outlet } from "react-router-dom";


export default function AppLayout() {
  return (
    <div className="app-layout">
        <div className="sidebar"><Outlet/></div>
        <div className="map-container">map</div>
    </div>
  )
}
