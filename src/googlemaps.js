async function loadSecrets() {
  const response = await fetch("./secrets.json");
  return await response.json();
}

async function getRestaurants(cuisine, dish, location, priceLevel=["PRICE_LEVEL_UNSPECIFIED"], nearby=false, callback) {
  const secrets = await loadSecrets();
  const apikey = await secrets.google;

  let preference = "RELEVANCE"
  if (nearby) {
    preference = "DISTANCE"
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apikey,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.userRatingCount'
    },
    body: JSON.stringify({
      "textQuery": cuisine + " " + dish + " at " + location,
      "languageCode": "en",
      "priceLevels": priceLevel,
      "rankPreference": preference
    })
  });
  const data = await response.json();
  callback(data["places"].slice(0,3));
  //callback(bestFit["displayName"]["text"], bestFit["rating"], bestFit["count"], bestFit["formattedAddress"])
  //log(JSON.stringify(data["places"], null, 2));
}

function log(text) {
  console.log(text);
}