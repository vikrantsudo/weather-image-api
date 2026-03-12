export default async function handler(req, res) {

const state = req.query.name || "London";

try {

const response = await fetch(`https://wttr.in/${encodeURIComponent(state)}?format=j1`);
const data = await response.json();

const weather = data.current_condition[0];
const area = data.nearest_area[0];

const city = area.areaName[0].value;
const country = area.country[0].value;

const tempC = weather.temp_C;
const tempF = weather.temp_F;
const wind = weather.windspeedKmph;
const humidity = weather.humidity;
const status = weather.weatherDesc[0].value;

const svg = `
<svg width="900" height="320" xmlns="http://www.w3.org/2000/svg">

<rect x="5" y="5" width="890" height="310" fill="white" stroke="black" stroke-width="6"/>

<text x="70" y="290" font-size="16">weather status for ${city} in ${country}</text>

<text x="300" y="80" font-size="22">${status}</text>

<text x="300" y="150" font-size="20">Temp: ${tempC}°C</text>
<text x="300" y="200" font-size="20">Temp: ${tempF}°F</text>

<text x="620" y="120" font-size="20">Wind: ${wind} km/h</text>
<text x="620" y="200" font-size="20">Humidity: ${humidity}%</text>

<circle cx="150" cy="120" r="50" fill="yellow" stroke="black" stroke-width="3"/>

</svg>
`;

res.setHeader("Content-Type", "image/svg+xml");
res.send(svg);

} catch {

res.status(500).send("Weather error");

}

}
