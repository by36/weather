const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//displays index.html of root path
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//invoked after hitting go in the html form
<<<<<<< HEAD
app.post("/", function (req, res) {

   // takes in the CityID from the html form, display in console. Takes in as string
  const cityId = req.body.cityId;

      //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
  const units = "imperial";
  const apiKey = "839ff57e9450018e3010817d6f50adef";
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${units}`;

      // this gets the data from Open Weather API
  https.get(url, function (response) {
=======
app.post("/", function(req, res) {
    
    // takes in the latitude and longitude from the html form, display in console. Takes in as string
    const lat = req.body.latInput;
    const lon = req.body.lonInput;
    console.log("Latitude: " + lat);
    console.log("Longitude: " + lon);
    
    //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
    const units = "imperial";
    const apiKey = "839ff57e9450018e3010817d6f50adef";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey;
    
    // this gets the data from Open Weather API
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in " + lat + " N, " + lon + " W " + " is " + temp + " Degrees Fahrenheit<h2>");
            res.write("<h2>The Humidity in " + lat + " N, " + lon + " W " + " is " + humidity + " %<h2>");
            res.write("<h2>The Wind Speed in " + lat + " N, " + lon + " W " + " is " + windSpeed + " mph<h2>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})
>>>>>>> origin/master

    // gets individual items from Open Weather API
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const cityName = weatherData.name;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const windDirection = weatherData.wind.deg;
      const cloudiness = weatherData.clouds.all;

      // displays the output of the results
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

<<<<<<< HEAD
app.listen(3000, function () {
  console.log("Server is running on port 3000.");
=======
//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port");
>>>>>>> origin/master
});
