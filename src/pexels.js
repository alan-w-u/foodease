export async function getImageFor(cuisine, dish) {
  const secrets = await fetch("./secrets.json");
  const apikey = await secrets.json().pexels;
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