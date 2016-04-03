var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema ({
  name: {
    type: String,
    required: true
  }
});

var City = mongoose.model('City', CitySchema);
module.exports = City;
