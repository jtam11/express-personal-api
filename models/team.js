var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    City = require('./city');

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
    type: Schema.Types.ObjectId,
    ref: 'City'
  },
  name: {
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
