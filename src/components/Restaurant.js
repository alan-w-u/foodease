import { useState, useEffect } from "react";
import { getRestaurants } from "../googlemaps";
import { googleKey } from "../secrets";
import { Button } from "primereact/button"
import "./Restaurant.css";

function Restaurant(props) {
  var [loaded, setLoaded] = useState(false);
  var [name, setName] = useState("");
  var [photo, setPhoto] = useState("");
  var [rating, setRating] = useState("");
  var [ratingCount, setRatingCount] = useState("");
  var [address, setAddress] = useState("");
  var [link, setLink] = useState("");

  useEffect(() => {
    getRestaurants(props.cuisine, props.dish, props.location).then((res) => {
      setName(res[0].displayName.text);
      setPhoto(res[0].photos[0]["name"]);
      setRating(res[0].rating);
      setRatingCount(res[0].userRatingCount);
      setAddress(res[0].formattedAddress);
      setLink(res[0].googleMapsUri);
      setLoaded(true);
      props.callback(res[0].displayName.text + " " + res[0].formattedAddress);
    })
  }, []);

  return (
    <>
      {
        loaded ? 
        <div className="restaurantCard">
          <div className="restaurantInfo">
            <p id="restaurant-name">{name}</p>
            <p>{address}</p>
            <p>&#9734; {rating} ({ratingCount})</p>
            <Button label="Get Directions" onClick={() => document.getElementById("directions").scrollIntoView(true)}/>
            <Button label="Open in Google Maps" onClick={() => window.open(link, '_blank')}/>
          </div>
          <img className="restaurantPhoto" src={"https://places.googleapis.com/v1/" + photo + "/media?maxWidthPx=800&key=" + googleKey} alt="restaurant"></img>
        </div> : <></>
      }
    </>
  )
}

export default Restaurant