// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var teams_list = [
  {
    city: "San Francisco",
    name: "Giants",
    logo: "https://goo.gl/cbyvi4",
    sport: "MLB"
  },
  {
    city: "Sacramento",
    name: "Kings",
    logo: "https://goo.gl/w6Gbjg",
    sport: "NBA"
  }
];

db.Team.remove({}, function(err, teams){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all teams');

    db.Team.create(teams_list, function(err, teams){
      if (err) { return console.log('err', err); }
      process.exit();
    });
  }
});
