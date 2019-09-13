const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require("./utils/geocode");
const showWeather = require("./utils/weather");



const app = express();
const publicPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

const pageData = {
  title: "Weather",
  name: "Andrew Walpole"
}

app.get('', (req, res) => {
  res.render('index', {
    ...pageData,
    title: 'Weather'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    ...pageData,
    title: 'About me'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    ...pageData,
    title: "Help",
    helpMessage: "Help me!"
  });
});


app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "Please provide an address"
    });
  }

  const address = req.query.address

  geocode(address, (error, latlon) => {

    if (error) {
      return res.send({ error });

    } else {
      showWeather(latlon, (error, forecast) => {

        if (error) {
          return res.send({ error });
        }

        res.send({
          ...forecast,
          address
        });

      });

    }

  });

});

app.get('/products', (req, res) => {
  console.log(req.query);

  let products = [
    "apples",
    "oranges",
    "bananas"
  ];

  if (!req.query.search) {
    return res.send("Please provide a search parameter");
  }

  if (req.query.search) {
    products = products.filter(p => p.indexOf(req.query.search) !== -1);
  }


  res.send({
    products
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    ...pageData,
    errorMsg: "404: Help article not found",
    title: "404"
  });
});

app.get("*", (req, res) => {
  res.render('404', {
    ...pageData,
    errorMsg: "404: Page not found!",
    title: "404"
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});