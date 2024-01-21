import { pexelsKey } from "./secrets";

export async function getImageFor(cuisine, dish) {
  const apikey = pexelsKey
  const prompt = cuisine + "%20" + dish;

  const response = await fetch(`https://api.pexels.com/v1/search?query=${prompt}&per_page=1`, {
    method: "GET",
    headers: {
      'Authorization': apikey
    }
  })

  const json = await response.json();
  return json["photos"][0]["src"]["large"];
}