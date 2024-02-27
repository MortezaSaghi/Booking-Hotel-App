import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkProvider";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

export default function BookmarkList() {
  const { bookmarks, isLoadig ,currentBookmark ,deleteBookmark } = useBookmark();
  if (isLoadig || !bookmarks) <div>Loading Bookmark list ...</div>;
  // console.log(currentBookmark);
  const handelDelete = (e,id)=>{
    e.preventDefault();
    deleteBookmark(id);
  }
  return (
    <div>
      <h2>Bookmark List</h2>
      {!bookmarks.length && <p>there is no bookmarked location. </p>}
      <div className="bookmark-list">
        {bookmarks.map((item) => {
          return (
            <Link key={item.id}  to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              {/* {console.log("x",item.latitude,item.longitude)} */}
              <div className={`bookmark-item ${item.id === currentBookmark?.id?"current-bookmark":""}`}>
                <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                <span>{item.country}</span>
                </div>
                <button className="trash" onClick={(e)=>handelDelete(e,item.id)}><HiTrash/></button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
