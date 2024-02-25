import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
    const [cityName,setCityName] = useState("");
    const [country,setCountry] = useState("");
    const [countryCode,setCountryCode] = useState("");
    const [isLoadingGeoCoding,setIsLoadingGeoCoding] = useState(false);
    const [isLoading,setIsloading] = useState(false);
    const [geoCodingError,setGeoCodingError] = useState(null);
    const [lat,lng] =useUrlLocation();
    const navigate = useNavigate();
    const handelBack=(e)=>{
        e.preventDefault();
        navigate(-1);
    }
    useEffect(()=>{
        
        if (!lat || !lng) return;
        async function fetchLocationData(){
          setGeoCodingError(null);
          setIsLoadingGeoCoding(true);
            try {
                const {data} = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
                if (!data.countryCode) throw new Error("this Location is not a city! please click somewhere else.")
                setCityName(data.city || data.locality || "");
              setCountry(data.countryName || "");
              setCountryCode(data.countryCode);
            } catch (err) {
                setGeoCodingError(err.message)
                toast.error(err.message)
            }finally{
                setIsLoadingGeoCoding(false)
            }
        }
        fetchLocationData();
        // console.log(data)
    },[lat,lng])
    if (isLoadingGeoCoding) return <div>Loading ...</div>
  return (
    <div>
      <h2>New Bokkmark Location</h2>
      <form className="form">
        <div className="form-control">
          <label htmlFor="cityName">Cityname</label>
          <input type="text" name="cityName" id="cityName" value={cityName} onChange={(e)=>setCityName(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country"  value={country} onChange={(e)=>setCountry(e.target.value)} />
          <ReactCountryFlag className="flag" svg countryCode={countryCode}/>
        </div>
        <div className="buttons">
            <button className="btn btn--back" onClick={handelBack}>&larr;Back</button>
            <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
