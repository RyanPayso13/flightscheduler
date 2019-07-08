const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let AircraftSchema = new Schema({
  ident: String,
  type: String,
  economySeats: Number,
  base: String,
});

module.exports = mongoose.model('aircraft', AircraftSchema);