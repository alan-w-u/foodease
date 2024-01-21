async function loadSecrets() {
    const response = await fetch("./secrets.json");
    return await response.json();
}

async function createChat(weather, temperature, meal, event, others) {
    const secrets = await loadSecrets();
    const apiKey = await secrets.apiKey;
    var prompt = "Today it is " + weather + " and " + temperature + " degrees Celsius. " + event + " " + others + 
        " Please recommend me a cuisine and a dish to try. Only output the cuisine and the name of the dish separated by a semicolon."; 

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
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
    var colonIndex = result.indexOf(";");
    var cuisine = result.substring(0, colonIndex);
    var dish = result.substring(colonIndex + 2);
    return [cuisine, dish];
}

createChat("sunny", "5", "I finished my exam.", "I am going by myself.").then((res) => {
    console.log(res[0]);
    console.log(res[1]);
});


