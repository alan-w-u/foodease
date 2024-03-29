import { googleKey } from "./secrets";

export async function getRestaurants(cuisine, dish, location, priceLevel = -1, nearby = false) {
  const apikey = googleKey

  let preference = "RELEVANCE"
  if (nearby) {
    preference = "DISTANCE"
  }

  var priceLevelArray = ["PRICE_LEVEL_UNSPECIFIED"];

  if (priceLevel > 0) {
    priceLevelArray = ["PRICE_LEVEL_INEXPENSIVE"]
    if (priceLevel > 10) {
      priceLevelArray.push("PRICE_LEVEL_MODERATE");
      if (priceLevel > 30) {
        priceLevelArray = ["PRICE_LEVEL_MODERATE", "PRICE_LEVEL_EXPENSIVE"]
        if (priceLevel > 50) {
          priceLevelArray = ["PRICE_LEVEL_EXPENSIVE", "PRICE_LEVEL_VERY_EXPENSIVE"]
        }
      }
    }
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apikey,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.userRatingCount,places.googleMapsUri,places.photos'
    },
    body: JSON.stringify({
      "textQuery": cuisine + " " + dish + " at " + location,
      "languageCode": "en",
      "priceLevels": priceLevelArray,
      "rankPreference": preference
    })
  });

  const data = await response.json();

  return await data["places"];
}