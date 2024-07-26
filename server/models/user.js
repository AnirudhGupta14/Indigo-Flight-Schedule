const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema ({
flight_num: String,
name: String,
mobile: String,
email: String
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel