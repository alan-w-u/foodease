import { useState, useEffect } from "react";
import { getRestaurants } from "../googlemaps";
import { googleKey } from "../secrets";
import { Button } from "primereact/button"
import { ProgressSpinner } from "primereact/progressspinner"
import "primeicons/primeicons.css";
import "./Restaurant.css";

function Restaurant(props) {
  var [loaded, setLoaded] = useState(false);
  var [name, setName] = useState("");
  var [photo, setPhoto] = useState("");
  var [rating, setRating] = useState("");
  var [ratingCount, setRatingCount] = useState("");
  var [priceLevel, setPriceLevel] = useState("");
  var [address, setAddress] = useState("");
  var [link, setLink] = useState("");

  var [data, setData] = useState(null);
  var [index, setIndex] = useState(0);

  var [refreshDisabled, setRefreshDisabled] = useState(false);

  useEffect(() => {
    getRestaurants(props.cuisine, props.dish, props.location, props.priceLevel).then((res) => {
      setData(res);
      setName(res[0].displayName.text);
      setPhoto(res[0].photos[0]["name"]);
      setRating(res[0].rating);
      setRatingCount(res[0].userRatingCount);
      setPriceLevel(res[0].priceLevel);
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
        <>
        <div className="restaurantCard">
          <div className="restaurantInfo">
            <p id="restaurant-name">{name}</p>
            <p>{address}</p>
            <p>&#9734; {rating} ({ratingCount})</p>
            {
              priceLevel == "PRICE_LEVEL_UNSPECIFIED" ? <p></p> :
              priceLevel == "PRICE_LEVEL_FREE" ? <p></p> :
              priceLevel == "PRICE_LEVEL_INEXPENSIVE" ? <p>$</p> :
              priceLevel == "PRICE_LEVEL_MODERATE" ? <p>$$</p> :
              priceLevel == "PRICE_LEVEL_EXPENSIVE" ? <p>$$$</p> :
              priceLevel == "PRICE_LEVEL_VERY_EXPENSIVE" ? <p>$$$$</p> :
              <></>
            }
            <Button label="Get Directions" onClick={() => document.getElementById("directions").scrollIntoView(true)}/>
            <Button label="Open in Google Maps" onClick={() => window.open(link, '_blank')}/>
          </div>
          <img className="restaurantPhoto" src={"https://places.googleapis.com/v1/" + photo + "/media?maxWidthPx=800&key=" + googleKey} alt="restaurant"></img>
        </div>
        <Button icon="pi pi-refresh" aria-label="Refresh" disabled={refreshDisabled} onClick={() => {
          setIndex(index + 1);
          console.log(data.length)
          if (index+1 === data.length) {
            setRefreshDisabled(true);
          }
          setLoaded(false);
          setName(data[index].displayName.text);
          setPhoto(data[index].photos[0]["name"]);
          setRating(data[index].rating);
          setRatingCount(data[index].userRatingCount);
          setPriceLevel(data[index].priceLevel);
          setAddress(data[index].formattedAddress);
          setLink(data[index].googleMapsUri);
          props.callback(data[index].displayName.text + " " + data[index].formattedAddress);
          setTimeout(() => setLoaded(true), 1000);
        }} />
        </> : 
        <div className="spinner">
          <ProgressSpinner />
        </div>
      }
    </>
  )
}

export default Restaurant