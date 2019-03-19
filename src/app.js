const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;
const geocode = require("./geocode");
const forecast = require("./forecast");

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send("Please provide an address");
  } else {
    geocode(req.query.address, (error, response) => {
      if (error) {
        return console.log(error);
      }

      forecast(response.latitude, response.longitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }

        res.send({
          forecast: forecastData,
          location: response.location,
          address: req.query.address
        });
      });
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
