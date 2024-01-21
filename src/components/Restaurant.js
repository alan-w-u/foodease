import { useState, useEffect } from "react"
import { getRestaurants } from "../googlemaps";

function Restaurant(props) {
  var [loaded, setLoaded] = useState(false);
  var [name, setName] = useState("");
  var [photo, setPhoto] = useState("")
  useEffect(() => {
    getRestaurants(props.cuisine, props.dish, "Kitsilano").then((res) => {
      setName(res[0].displayName.text);
      console.log(res[0].photos);
      setPhoto(res[0].photos[0]);
      setLoaded(true);
    })
  }, []);

  return (
    <>
      {
        loaded ? 
        <>
          <h3>{name}</h3>
          <img src={photo} alt="restaurant"></img>
        </> : <></>
      }
    </>
  )
}

export default Restaurant