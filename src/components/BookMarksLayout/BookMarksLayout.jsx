import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../Context/BookmarkProvider";


export default function BookMarksLayout() {
  const {bookmarks} = useBookmark();
  return (
    <div className="app-layout">
        <div className="sidebar"><Outlet/></div>
        <Map markerLocation={bookmarks}/>
    </div>
  )
}
