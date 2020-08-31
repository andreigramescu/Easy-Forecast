const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { request } = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Gramescu Weather",
    name: "Andrei Gramescu",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
    return;
  }

  geocode(req.query.address, (error, geoResponse = {}) => {
    if (error) {
      res.send({ error: error });
      return;
    }

    forecast(geoResponse.latitude, geoResponse.longitude, (error, response) => {
      if (error) {
        res.send({ error: error });
        return;
      }
      res.send({
        forecast: response,
        location: geoResponse.location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("errorpage", {
    errorMessage: "404 Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About me",
//     name: "Andrei Gramescu",
//   });
// });

// app.get("/help", (req, res) => {
//   res.render("help", {
//     title: "Help page",
//     name: "Andrei Gramescu",
//   });
// });

// app.get("/help/*", (req, res) => {
//   res.render("errorpage", {
//     errorMessage: "Help article not found",
//   });
// });
