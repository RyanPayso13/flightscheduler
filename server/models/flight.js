const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let FlighSchema = new Schema({
    aircraft_id: String,
    id: String,
    departure_time: Number,
    arrival_time: Number,
    readable_departure: String,
    readable_arrival: String,
    origin: String,
    destination: String,
});

module.exports = mongoose.model('flight', FlighSchema);