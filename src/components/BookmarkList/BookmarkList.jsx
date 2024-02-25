import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkProvider";
import { Link } from "react-router-dom";

export default function BookmarkList() {
  const { bookmarks, isLoadig ,currentBookmark } = useBookmark();
  if (isLoadig) <div>Loading Bookmark list ...</div>;
    console.log(currentBookmark);
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmark-list">
        {bookmarks.map((item) => {
          return (
            <Link key={item.id}  to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              {/* {console.log("x",item.latitude,item.longitude)} */}
              <div className={`bookmark-item ${item.id === currentBookmark?.id?"current-bookmark":""}`}>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
