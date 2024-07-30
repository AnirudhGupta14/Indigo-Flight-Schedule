const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const FlightModel = require('../models/flight');
const UserModel = require('../models/user');

const dotenv = require('dotenv').config();

//mongoose.connect("mongodb://127.0.0.1:27017/Flight")
const connectDB = async() => {
    try
    {
        await mongoose.connect(`mongodb+srv://anirudhgupta1441:RO3CenEVzGvI8eFJ@flight.waldype.mongodb.net/Flight`);
    console.log(`Mongoose is connect ${mongoose.connection.host}`)
    }
    catch(err)
    {
        console.log(err);
    }
    
}

connectDB();

async function UpdateDatabase(flight)
{
    try
    {
        const Newflight = await FlightModel.findByIdAndUpdate(flight._id, {$set: { prev_status: `${flight.status}`, prev_gate: `${flight.gate}`}});
    }
    catch(error)
    {
        console.log(error);
    }
}

async function SendEmail(user, flight)
{
    try
    {
        var body_para = "";
        if(flight.status == "On-Time")
        {
            body_para = `Hey ${user.name} your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is ${flight.status} and will departure at ${flight.flight_time} from gate no. ${flight.gate}. Hope you have a nice journey.`;
        }
        else if(flight.status == "Delayed")
        {
            body_para = `Hey ${user.name} your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is ${flight.status} and will departure at ${flight.flight_time} from gate no. ${flight.gate}. Sorry for inconvenience`;
        }
        else
        {
            body_para = `Hey ${user.name} your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is unfortunately been ${flight.status}. Sorry for inconvenience`;
        } 
        let testAccount = await nodemailer.createTestAccount();

        let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
        },
        });

        let info = await transporter.sendMail({
            from: `Indigo Airlines" <${process.env.ETHEREAL_USERNAME}>`, 
            to: `${user.email}`, 
            subject: "Indigo Flight Schedule Updates", 
            text: `${body_para}`, 
            html: `${body_para}`,
        });
        console.log(info);
    }
    catch(error)
    {
        console.log(error);
    }
}

async function sendSMS(user, flight)
{
    var body_para = "";
    if(flight.status == "On-Time")
    {
        body_para = `Hey ${user.name} your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is ${flight.status} and will departure at ${flight.flight_time} from gate no. ${flight.gate}. Hope you have a nice journey.`;
    }
    else if(flight.status == "Delayed")
    {
        body_para = `Hey ${user.name} your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is ${flight.status} and will departure at ${flight.flight_time} from gate no. ${flight.gate}. Sorry for inconvenience`;
    }
    else
    {
        body_para = `Hey ${user.name} your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is unfortunately been ${flight.status}. Sorry for inconvenience`;
    }
    const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    return client.messages
    .create({body: `${body_para}`, from: '+15077347361', to: `${user.mobile}`})
    .then(message => console.log(message))
    .catch(err => console.log(err))
}

async function getUserList()
{
    try
    {
        return await UserModel.find()
    }
    catch(error)
    {
        console.log(error);
    }
};

async function getFlightList()
{
    try
    {
        return await FlightModel.find()
    }
    catch(error)
    {
        console.log(error);
    }
};

setInterval(() => {
    getUserList().then(users => getFlightList().then(flights => 
        flights.map(flight => {
            if(flight.prev_status != flight.status || flight.prev_gate != flight.gate)
            {
                users.map(user => {
                    if(user.flight_num == flight.flight_num)
                    {
                        sendSMS(user, flight)
                        .then(res => SendEmail(user, flight)
                        .then(message => UpdateDatabase(flight)
                        .then(res => console.log("Successfully updated the record"))));   
                    };
                })
            }
        })
    ));
}, 5000);


router.get('/', (req, res) => {return res.status(200).json({"hello": "anirudh"})});

module.exports = router;