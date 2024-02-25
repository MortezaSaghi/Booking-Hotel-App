import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
// import { useHotels } from "../Context/HotelProvider";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

export default function Map({markerLocation}) {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  // const { isLoding ,hotels} = useHotels();
  const [lat,lng] = useUrlLocation();
  const {
    isLoading: isLodingPosition,
    error,
    getPosition,
    position: locationPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (locationPosition?.lat && locationPosition?.lng) {
      setMapCenter([locationPosition.lat, locationPosition.lng]);
    }
  }, [locationPosition]);

  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="get-location" onClick={getPosition}>{isLodingPosition?"Loading ...":"Use Your Location"}</button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick/>
        <ChangeCenter position={mapCenter} />
        {markerLocation.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click:(e)=>navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
  return null;
}

