// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

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

db.Profile.create(profile, function (eff, profile){
  if (err) {
    console.log(err);
    return;
  }
});
// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
