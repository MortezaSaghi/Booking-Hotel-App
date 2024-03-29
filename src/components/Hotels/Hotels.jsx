import { Link } from "react-router-dom";
import { useHotels } from "../Context/HotelProvider";

export default function Hotels() {
  const {isLoading , hotels ,currentHotel} = useHotels();
  if (isLoading) return <div>loading ... </div>;
  return (
    <div className="search-list">
      <h2>Search Results ({hotels.length}) </h2>
      {hotels.map((item) => {
        return (
          <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
            <div className={`search-item ${item.id === currentHotel?.id ?"current-hotel":""}`}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="search-item-desc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
