const mongoose = require('mongoose')
const FlightSchema = new mongoose.Schema ({
flight_num: String,
departure: String,
destination: String,
flight_time: String,
prev_status: String,
status: String,
prev_gate: String,
gate: String
})
const FlightModel = mongoose.model("schedules", FlightSchema)
module.exports = FlightModel