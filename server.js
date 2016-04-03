// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

var profile = {
  name: "Justin Tam",
  github_link: "https://github.com/jtam11",
  github_profile_image: "https://avatars1.githubusercontent.com/u/16862252?v=3&s=460",
  current_city: "San Francisco",
  pets: [{
    name: 'Mochi',
    type: 'Dog',
    breed: 'Shiba Inu'
  },
  {
    name: 'Sunny',
    type: 'Dog',
    breed: 'Golden Retriever'
  },
  {
    name: 'Nala',
    type: 'Dog',
    breed: 'American Eskimo'
  }]
};

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md",
    base_url: "https://cherry-pudding-47792.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data on me and my pets!"},
      {method: "GET", path: "/api/teams", description: "View all teams"},
      {method: "POST", path: "/api/teams", description: "Create a new team"},
      {method: "GET", path: "/api/teams/:id", description: "Find a team by its ID"},
      {method: "GET", path: "/api/cities", description: "View all cities"},
      {method: "POST", path: "/api/cities", description: "Create a new city"},
      {method: "GET", path: "/api/cities/:id", description: "Find a city by its ID"},
    ]
  });
});

// get
app.get('/api/profile', function (req, res) {
  res.json({ profile: profile });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
