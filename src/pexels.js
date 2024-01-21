async function loadSecrets() {
  const response = await fetch("./secrets.json");
  return await response.json();
}

export async function getImageFor(cuisine, dish) {

  console.log("getimage1")
  const secrets = await loadSecrets();
  const apikey = await secrets.pexels;
  const prompt = cuisine + "%20" + dish;

  console.log("getimage2")

  const response = await fetch(`https://api.pexels.com/v1/search?query=${prompt}&per_page=1`, {
    method: "GET",
    headers: {
      'Authorization': apikey
    }
  })

  const json = await response.json();
  return json["photos"][0]["src"]["large"];
}