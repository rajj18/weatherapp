const express = require("express");
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars location and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Raj'
  })
})

app.get('/about',(req,res) => {
  res.render('about', {
    title: 'About me',
    name: 'Raj'
  })
})

app.get('/help',(req,res) => {
  res.render('help', {
    helpText: 'This is some text',
    title: 'Help',
    name: 'Raj'
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude,longitude,location}) => {
    if(error) {
      return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
  // res.send({
  //   forcast: "It is sunny",
  //   location: 'Indore',
  //   address: req.query.address
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404',
    name: 'Raj',
    errorMessage: 'Help article not found'
  })
})


app.get('*', (req,res) => {
  res.render('404', {
    title: '404',
    name: 'Raj',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});





// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send(
//     {
//       name: "Raj",
//       age: 24,
//     },
//     { name: "Shivam", age: 24 }
//   );
// });

// app.get("/about", (req, res) => {
//   res.send('<h1>About page</h1>');
// });