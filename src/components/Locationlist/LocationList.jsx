import useFetch from "../../hooks/useFetch"


export default function LocationList() {
  const {data,isLoding} = useFetch("http://localhost:5000/hotels","")
  return (
    <div className="nearby-location">
      <h2>Nearby Location</h2>
      <div className="location-list">
        {
          data.map(item=>{
          return(
          <div className="location-item" key={item.id}>
            <img src={item.picture_url.url} alt={item.name} />
            <div className="location-item-desc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
              €&nbsp;{item.price}&nbsp;
              <span>night</span>
              </p>
            </div>
          </div>
          )
        })
        }
      </div>

    </div>
  )
}
