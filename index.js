const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const cityId = req.body.cityId;
  const apiKey = "839ff57e9450018e3010817d6f50adef";
  const units = "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${units}`;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const cityName = weatherData.name;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const windDirection = weatherData.wind.deg;
      const cloudiness = weatherData.clouds.all;

      const responseText = `
        <h1>The city is ${cityName}</h1>
        <p>The current Temperature is: ${temperature} &#8457;</p>
        <p>The current Humidity is: ${humidity}%</p>
        <p>The current Wind Speed is: ${windSpeed} mph</p>
        <p>The current Wind Direction is: ${windDirection} &#176;</p>
        <p>The current level of Cloudiness is: ${cloudiness}%</p>
      `;

      res.send(responseText);
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
