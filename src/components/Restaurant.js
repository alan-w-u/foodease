import { useState, useEffect } from "react";
import { getRestaurants } from "../googlemaps";
import { googleKey } from "../secrets";
import "./Restaurant.css";

function Restaurant(props) {
  var [loaded, setLoaded] = useState(false);
  var [name, setName] = useState("");
  var [photo, setPhoto] = useState("")
  useEffect(() => {
    getRestaurants(props.cuisine, props.dish, "Kitsilano").then((res) => {
      setName(res[0].displayName.text);
      setPhoto(res[0].photos[0]["name"]);
      setLoaded(true);
      props.callback(res[0].displayName.text);
    })
  }, []);

  return (
    <>
      {
        loaded ? 
        <>
          <p>{name}</p>
          <img className="restaurant" src={"https://places.googleapis.com/v1/" + photo + "/media?maxWidthPx=800&key=" + googleKey} alt="restaurant"></img>
        </> : <></>
      }
    </>
  )
}

export default Restaurant