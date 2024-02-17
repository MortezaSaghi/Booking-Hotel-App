import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  if (isLoading) return <div>loading ... </div>;
  return (
    <div className="search-list">
      <h2>Search Results ({data.length}) </h2>
      {data.map((item) => {
        return (
          <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
            <div className="search-item">
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
