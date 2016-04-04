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

var db = require('./models');

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
    documentation_url: "https://github.com/jtam11/express_self_api/README.md",
    base_url: "https://cherry-pudding-47792.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data on me and my pets!"},
      {method: "GET", path: "/api/teams", description: "View all teams"},
      {method: "POST", path: "/api/teams", description: "Create a new team"},
      {method: "GET", path: "/api/teams/:id", description: "Find a team by its ID"},
      {method: "PUT", path: "/api/teams/:id", description: "Find a team by its ID and update it"},
      {method: "DELETE", path: "/api/teams/:id", description: "Find a team by its ID and delete it"},
      {method: "POST", path: "/api/teams/:team_id/players", description: "Add a player to an existing team"}
    ]
  });
});

// get profile data
app.get('/api/profile', function (req, res) {
  res.json({ profile: profile });
});

// get all teams
app.get('/api/teams', function (req, res) {
  db.Team.find(function (err, allTeams) {
    if (err) {
      console.log(err);
    }
      res.json(allTeams);
  });
});

// get one team
app.get('/api/teams/:id', function (req, res) {
  db.Team.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

// create a new team
app.post('/api/teams', function (req, res) {
  var newTeam = new db.Team({
    city: req.body.city,
    name: req.body.name,
    logo: req.body.logo,
    sport: req.body.sport
  });
  newTeam.save(function(err, team){
    if (err) {
      console.log(err);
    }
    console.log("saved ", team.name);
    res.json(team);
  });
});

// update a team
app.put('/api/teams/:id', function (req, res) {
  var teamId = req.params.id;
  db.Team.findOne({ _id: req.params._id }, function (err, foundTeam) {
    if (err) {
      console.log(err);
    } else {
      foundTeam.city = req.body.city;
      foundTeam.name = req.body.name;
      foundTeam.logo = req.body.logo;
      foundTeam.sport = req.body.sport;

      // save updated todo in db
      foundTeam.save(function (err, savedTeam) {
        if (err) {
          console.log(err);
        } else {
          res.json(savedTeam);
        }
      });
    }
  });
});

// delete a team
app.delete('/api/teams/:id', function (req, res) {
  console.log('teams delete', req.params);
  var teamId = req.params.id;
  db.Team.findOneAndRemove({ _id: teamId }, function (err, deletedTeam) {
    res.json(deletedTeam);
  });
});



// create new player on an existing team
app.post('/api/teams/:team_id/players', function (req, res) {
  var teamId = req.params.team_id;
  db.Team.findById(teamId, function(err, foundTeam) {
      console.log(foundTeam);
      if (err) {
        res.json({error: err.message});
      } else if (foundTeam === null) {
        res.json({error: "No Team found by this ID"});
      } else {
        foundTeam.players.push(req.body);
        foundTeam.save();
        res.json(foundTeam);
      }
    });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
