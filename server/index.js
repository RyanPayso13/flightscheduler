const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
const MONGO_URI = 'mongodb://localhost:27017/FlightSchedulerDB';
const mongoose = require('mongoose');
const AircraftModel = require('./models/aircraft');

//Set up default mongoose connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', () => {

    const port = parseInt(process.env.PORT, 10) || 3001;
    app.set('port', port);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(pino);
    
    app.listen(port, () => console.log(`Flight Scheduler app listening on port ${port}!`))
    
    app.get('/api/aircraft', (req, res) => {
        console.log(req);
        AircraftModel.find({}, (error, res) => {
            console.log(res);
        });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ data:[] }));
    });

    AircraftModel.find({}, (error, res) => {
        if (!error){ 
            if(!!res.length) {
                AircraftModel.insertMany([{
                    "ident":"GABCD",
                    "type":"A320",
                    "economySeats":186,
                    "base":"EGKK"
                },
                {
                    "ident":"FOBAR",
                    "type":"A380",
                    "economySeats":2766,
                    "base":"LFSD"
                }], (err, docs) => {
                    console.log(docs);
                });
            }
            process.exit();
        } else {
            throw err;
        }
    });
    
});

// app.get('/api/foo', (req, res) => {
//     MongoClient
//         .connect(mongo_uri, { useNewUrlParser: true })
//         .then(client => {
//             const db = client.db('db');
//             console.log(db);
//             // const collection = db.collection('aircraft');
//             // collection.find({}).toArray().then(response => res.status(200).json(response)).catch(error => console.error(error));
//         });
// });
// // api for get flights by aircraft id