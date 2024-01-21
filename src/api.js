async function loadSecrets() {
    const response = await fetch("./secrets.json");
    return await response.json();
}

async function createChat(weather, temperature, meal, event, who, budget) {
    // const secrets = await loadSecrets();
    // const apiKey = await secrets.apiKey;
    var prompt = "Today it is " + weather + " and " + temperature + " degrees Celsius. " + event + "." + 
        " I am eating " + meal + "." +
        " I am going with " + who + "." + 
        " I want something that is " + budget + "." + 
        " Please recommend me 3 different dishes from 3 different cuisines." + 
        " Only output the cuisine and dish pairs as a single string in the form of - 'cuisine1-dish1;cuisine2-dish2;cuisine3-dish3'";
        
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${"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"}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "user",
                "content": prompt
              }
            ]
        })
    });
    const chat = await response.json();
    var result = chat.choices[0].message.content;

    var dash1;
    var dash2;
    var dash3;
    var semi1;
    var semi2;
    for (let i = 0; i < result.length; i++) {
        var charIsDash = result[i] == "-";
        var charIsSemi = result[i] == ";";
        if (charIsDash) {
            if (dash1 == null) {
                dash1 = i;
            } else if (dash2 == null) {
                dash2 = i;
            } else {
                dash3 = i;
            }
        } else if (charIsSemi) {
            if (semi1 == null) {
                semi1 = i;
            } else {
                semi2 = i;
            }
        }
    }
    var cuisine1 = result.substring(0, dash1);
    var dish1 = result.substring(dash1 + 1, semi1);
    var cuisine2 = result.substring(semi1 + 1, dash2);
    var dish2 = result.substring(dash2 + 1, semi2);
    var cuisine3 = result.substring(semi2 + 1, dash3);
    var dish3 = result.substring(dash3 + 1);
    var dishes = [cuisine1, dish1, cuisine2, dish2, cuisine3, dish3];
    for (let i = 0; i < dishes.length; i++) {
        dishes[i] = dishes[i].trim();
    }
    return dishes;
}

createChat("sunny", "5", "breakfast", "I finished my exam", " family", "expensive").then((res) => {
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);
    console.log(res[3]);
    console.log(res[4]);
    console.log(res[5]);
});




