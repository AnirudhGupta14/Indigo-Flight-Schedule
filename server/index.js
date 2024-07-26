const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const FlightModel = require('./models/flight')
const UserModel = require('./models/user')
const path = require('path')


const app = express()
app.use(cors())
app.use (express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Flight")

app.get("/getFlights", (req, res) => {
    FlightModel.find({}).then(function(flights) {
        res.json(flights)
        }).catch(function(err) {
        console.log(err)
        })
    })

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users)
        }).catch(function(err) {
        console.log(err)
        })
    })

app.use('/', require('./routes'));

app.listen(3001, () => {
console.log("Serve is running successfully ")
});


