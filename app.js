
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req,res) {
    
    res.sendFile(__dirname+"/index.html");

});

app.post("/", function (req,res) {
    // console.log("perfect");

    const cityName = req.body.city;
    const apiKey = "e12292d711146c695abb445b58aa115b";
    const unit = "metric";


    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+unit+"";

    https.get(url, function (response) {
        // console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            // console.log(iconUrl);
            res.write("<h1>The temperature in "+cityName+" is "+temp+" degrees Celsius.</h1>");
            res.write("<p>The weather condition is "+weatherDescription+".</p>");
            res.write("<img src="+iconUrl+">");

            res.send();

        });
    });

});


app.listen(3000, function () {
    console.log("Server started on port 3000.");
});
