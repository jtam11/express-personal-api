var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

var TeamSchema = new Schema ({
  city: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  players: [PlayerSchema]
});

var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
