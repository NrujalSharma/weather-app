const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express configuration
const pathToPublicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set handle bars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pathToPublicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nrujal Sharma'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Nrujal Sharma'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is help. This is help.',
    title: 'help',
    name: 'Nrujal Sharma'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must specify a location'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, data) => {
      if(error){
        return res.send({ error });
      }
      res.send({
        forecast: data,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);

  res.send({
    products: []
  });
})

app.get('/help/*', (req, res) => {
  // res.send('Help article not found');
  res.render('404', {
    message: 'Article not found.',
    title: 'Error page',
    name: 'Nrujal Sharma'
  })
});

app.get('*', (req, res) => {
  // res.send('Error 404. Page not found.');
  res.render('404', {
    message: 'Error 404.Page not found.',
    title: 'Error page',
    name: 'Nrujal Sharma'
  });
});

// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>');
// });
//
// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Nrujal',
//     age: 20
//   });
// });
//
// app.get('/about', (req, res) => {
//   res.send('<title>About</title>');
// });


app.listen(port, () => {
  console.log('Server Running on port ' + port);
});
