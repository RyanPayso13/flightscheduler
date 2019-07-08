const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
const uri = "mongodb+srv://payso:Q16AixyMA1r0vv7I@flightschedulercluster-xtxqg.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const AircraftModel = require('./models/aircraft');
const FlightModel = require('./models/flight');

//Set up default mongoose connection
mongoose.connect(uri, { useNewUrlParser: true });

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', () => {

    const port = parseInt(process.env.PORT, 10) || 5000;

    app.set('port', port);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(pino);
    
    app.listen(port, () => console.log(`Flight Scheduler app listening on port ${port}!`));
    
    app.get('/api/aircraft', (req, resp) => {
        AircraftModel.find({}, (error, res) => {
          resp.setHeader('Content-Type', 'application/json');
          resp.send(JSON.stringify({ data:res }));
        });
    });

    app.get('/api/flights/:id', (req, resp) => {
      FlightModel.find({'aircraft_id': req.params.id}, (error, res) => {
        console.log(res, req.params.id);
        resp.setHeader('Content-Type', 'application/json');
        resp.send(JSON.stringify({ data:res }));
      });
  });

  // seed mongodb
  AircraftModel.find({}, (error, res) => {
    if(error === null) {
      if (res.length === 0) {
        AircraftModel.insertMany([{
          "ident":"GABCD",
          "type":"A320",
          "economySeats":186,
          "base":"EGKK"
        },
        {
          "ident":"FUBUR",
          "type":"A380",
          "economySeats":2766,
          "base":"LFSD"
        }], (err, docs) => {
          console.log(docs);
        });
      }
    }
  });

  FlightModel.find({}, (error, res) => {
    if(error === null) {
      if (res.length === 0) {
        FlightModel.insertMany([{
          "aircraft_id": "GABCD",
          "id":"AS1227",
          "departure_time":40200,
          "arrival_time":56400,
          "readable_departure":"11:10",
          "readable_arrival":"15:40",
          "origin":"LFSB",
          "destination":"GCLA"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1228",
          "departure_time":58800,
          "arrival_time":74700,
          "readable_departure":"16:20",
          "readable_arrival":"20:45",
          "origin":"GCLA",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1229",
          "departure_time":59700,
          "arrival_time":67500,
          "readable_departure":"16:35",
          "readable_arrival":"18:45",
          "origin":"LFSB",
          "destination":"LICC"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1230",
          "departure_time":70200,
          "arrival_time":78600,
          "readable_departure":"19:30",
          "readable_arrival":"21:50",
          "origin":"LICC",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1233",
          "departure_time":19200,
          "arrival_time":25200,
          "readable_departure":"05:20",
          "readable_arrival":"07:00",
          "origin":"LFSB",
          "destination":"LHBP"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1234",
          "departure_time":27000,
          "arrival_time":33300,
          "readable_departure":"07:30",
          "readable_arrival":"09:15",
          "origin":"LHBP",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1249",
          "departure_time":45300,
          "arrival_time":60300,
          "readable_departure":"12:35",
          "readable_arrival":"16:45",
          "origin":"LFSB",
          "destination":"GCRR"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1250",
          "departure_time":62700,
          "arrival_time":77700,
          "readable_departure":"17:25",
          "readable_arrival":"21:35",
          "origin":"GCRR",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS130",
          "departure_time":30000,
          "arrival_time":33600,
          "readable_departure":"08:20",
          "readable_arrival":"09:20",
          "origin":"EGAA",
          "destination":"EGCC"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS131",
          "departure_time":24900,
          "arrival_time":28500,
          "readable_departure":"06:55",
          "readable_arrival":"07:55",
          "origin":"EGCC",
          "destination":"EGAA"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1311",
          "departure_time":49500,
          "arrival_time":60900,
          "readable_departure":"13:45",
          "readable_arrival":"16:55",
          "origin":"LSGG",
          "destination":"GMMX"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS1312",
          "departure_time":66900,
          "arrival_time":78600,
          "readable_departure":"18:35",
          "readable_arrival":"21:50",
          "origin":"GMMX",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "GABCD",
          "id":"AS132",
          "departure_time":54000,
          "arrival_time":57300,
          "readable_departure":"15:00",
          "readable_arrival":"15:55",
          "origin":"EGAA",
          "destination":"EGCC"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1327",
          "departure_time":18600,
          "arrival_time":23400,
          "readable_departure":"05:10",
          "readable_arrival":"06:30",
          "origin":"LSGG",
          "destination":"LIPZ"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1328",
          "departure_time":25500,
          "arrival_time":30300,
          "readable_departure":"07:05",
          "readable_arrival":"08:25",
          "origin":"LIPZ",
          "destination":"LSGG"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS133",
          "departure_time":48900,
          "arrival_time":52500,
          "readable_departure":"13:35",
          "readable_arrival":"14:35",
          "origin":"EGCC",
          "destination":"EGAA"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1333",
          "departure_time":46200,
          "arrival_time":52500,
          "readable_departure":"12:50",
          "readable_arrival":"14:35",
          "origin":"LSGG",
          "destination":"LHBP"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1334",
          "departure_time":54300,
          "arrival_time":61500,
          "readable_departure":"15:05",
          "readable_arrival":"17:05",
          "origin":"LHBP",
          "destination":"LSGG"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1337",
          "departure_time":51000,
          "arrival_time":59400,
          "readable_departure":"14:10",
          "readable_arrival":"16:30",
          "origin":"LSGG",
          "destination":"LEST"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1338",
          "departure_time":61500,
          "arrival_time":69000,
          "readable_departure":"17:05",
          "readable_arrival":"19:10",
          "origin":"LEST",
          "destination":"LSGG"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1343",
          "departure_time":37800,
          "arrival_time":43500,
          "readable_departure":"10:30",
          "readable_arrival":"12:05",
          "origin":"LSGG",
          "destination":"LIRF"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1344",
          "departure_time":45600,
          "arrival_time":51300,
          "readable_departure":"12:40",
          "readable_arrival":"14:15",
          "origin":"LIRF",
          "destination":"LSGG"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1345",
          "departure_time":64500,
          "arrival_time":70200,
          "readable_departure":"17:55",
          "readable_arrival":"19:30",
          "origin":"LSGG",
          "destination":"LIRF"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1346",
          "departure_time":72300,
          "arrival_time":78000,
          "readable_departure":"20:05",
          "readable_arrival":"21:40",
          "origin":"LIRF",
          "destination":"LSGG"
      },
      {        
          "aircraft_id": "GABCD",
          "id":"AS1351",
          "departure_time":30900,
          "arrival_time":36900,
          "readable_departure":"08:35",
          "readable_arrival":"10:15",
          "origin":"LSGG",
          "destination":"EHAM"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1227",
          "departure_time":40200,
          "arrival_time":56400,
          "readable_departure":"11:10",
          "readable_arrival":"15:40",
          "origin":"LFSB",
          "destination":"GCLA"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1228",
          "departure_time":58800,
          "arrival_time":74700,
          "readable_departure":"16:20",
          "readable_arrival":"20:45",
          "origin":"GCLA",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1229",
          "departure_time":59700,
          "arrival_time":67500,
          "readable_departure":"16:35",
          "readable_arrival":"18:45",
          "origin":"LFSB",
          "destination":"LICC"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1230",
          "departure_time":70200,
          "arrival_time":78600,
          "readable_departure":"19:30",
          "readable_arrival":"21:50",
          "origin":"LICC",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1233",
          "departure_time":19200,
          "arrival_time":25200,
          "readable_departure":"05:20",
          "readable_arrival":"07:00",
          "origin":"LFSB",
          "destination":"LHBP"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1234",
          "departure_time":27000,
          "arrival_time":33300,
          "readable_departure":"07:30",
          "readable_arrival":"09:15",
          "origin":"LHBP",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1249",
          "departure_time":45300,
          "arrival_time":60300,
          "readable_departure":"12:35",
          "readable_arrival":"16:45",
          "origin":"LFSB",
          "destination":"GCRR"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1250",
          "departure_time":62700,
          "arrival_time":77700,
          "readable_departure":"17:25",
          "readable_arrival":"21:35",
          "origin":"GCRR",
          "destination":"LFSB"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS130",
          "departure_time":30000,
          "arrival_time":33600,
          "readable_departure":"08:20",
          "readable_arrival":"09:20",
          "origin":"EGAA",
          "destination":"EGCC"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS131",
          "departure_time":24900,
          "arrival_time":28500,
          "readable_departure":"06:55",
          "readable_arrival":"07:55",
          "origin":"EGCC",
          "destination":"EGAA"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1311",
          "departure_time":49500,
          "arrival_time":60900,
          "readable_departure":"13:45",
          "readable_arrival":"16:55",
          "origin":"LSGG",
          "destination":"GMMX"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1312",
          "departure_time":66900,
          "arrival_time":78600,
          "readable_departure":"18:35",
          "readable_arrival":"21:50",
          "origin":"GMMX",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS132",
          "departure_time":54000,
          "arrival_time":57300,
          "readable_departure":"15:00",
          "readable_arrival":"15:55",
          "origin":"EGAA",
          "destination":"EGCC"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1327",
          "departure_time":18600,
          "arrival_time":23400,
          "readable_departure":"05:10",
          "readable_arrival":"06:30",
          "origin":"LSGG",
          "destination":"LIPZ"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1328",
          "departure_time":25500,
          "arrival_time":30300,
          "readable_departure":"07:05",
          "readable_arrival":"08:25",
          "origin":"LIPZ",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS133",
          "departure_time":48900,
          "arrival_time":52500,
          "readable_departure":"13:35",
          "readable_arrival":"14:35",
          "origin":"EGCC",
          "destination":"EGAA"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1333",
          "departure_time":46200,
          "arrival_time":52500,
          "readable_departure":"12:50",
          "readable_arrival":"14:35",
          "origin":"LSGG",
          "destination":"LHBP"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1334",
          "departure_time":54300,
          "arrival_time":61500,
          "readable_departure":"15:05",
          "readable_arrival":"17:05",
          "origin":"LHBP",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1337",
          "departure_time":51000,
          "arrival_time":59400,
          "readable_departure":"14:10",
          "readable_arrival":"16:30",
          "origin":"LSGG",
          "destination":"LEST"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1338",
          "departure_time":61500,
          "arrival_time":69000,
          "readable_departure":"17:05",
          "readable_arrival":"19:10",
          "origin":"LEST",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1343",
          "departure_time":37800,
          "arrival_time":43500,
          "readable_departure":"10:30",
          "readable_arrival":"12:05",
          "origin":"LSGG",
          "destination":"LIRF"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1344",
          "departure_time":45600,
          "arrival_time":51300,
          "readable_departure":"12:40",
          "readable_arrival":"14:15",
          "origin":"LIRF",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1345",
          "departure_time":64500,
          "arrival_time":70200,
          "readable_departure":"17:55",
          "readable_arrival":"19:30",
          "origin":"LSGG",
          "destination":"LIRF"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1346",
          "departure_time":72300,
          "arrival_time":78000,
          "readable_departure":"20:05",
          "readable_arrival":"21:40",
          "origin":"LIRF",
          "destination":"LSGG"
      },
      {
          "aircraft_id": "FUBUR",
          "id":"AS1351",
          "departure_time":30900,
          "arrival_time":36900,
          "readable_departure":"08:35",
          "readable_arrival":"10:15",
          "origin":"LSGG",
          "destination":"EHAM"
      }], (err, docs) => {
          console.log(docs);
        });
      }
    }
  });
    
});
