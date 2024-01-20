async function loadSecrets() {
  const response = await fetch("./secrets.json");
  return await response.json();
}

async function getRestaurants(cuisine, dish, location) {
  const secrets = await loadSecrets();
  const apikey = await secrets.google;

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
      "priceLevels": ["PRICE_LEVEL_UNSPECIFIED"],
      "rankPreference": "RELEVANCE"
    })
  });
  const data = await response.json();
  log(JSON.stringify(data, null, 2));
}

function pickRestaurant() {

}

function log(text) {
  console.log(text);
}



getRestaurants("Korean", "Fried Chicken", "Kitsilano");