export async function getRestaurants(cuisine, dish, location, priceLevel=["PRICE_LEVEL_UNSPECIFIED"], nearby=false) {
  const apikey = process.env.GOOG_KEY;

  let preference = "RELEVANCE"
  if (nearby) {
    preference = "DISTANCE"
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
      "priceLevels": priceLevel,
      "rankPreference": preference
    })
  });
  const data = await response.json();
  return await data["places"].slice(0,3);
  //callback(bestFit["displayName"]["text"], bestFit["rating"], bestFit["count"], bestFit["formattedAddress"])
  //log(JSON.stringify(data["places"], null, 2));
}