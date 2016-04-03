var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SportSchema = new Schema ({
  sport: {
    type: String,
    required: true
  },
  league: {
    type: String,
    required: true
  }
});

var Sport = mongoose.model('Sport', SportSchema);
module.exports = Sport;
