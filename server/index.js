const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/aircraft', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ data:[{
            ident:'GABCD',
            type:'A320',
            economySeats:186,
            base:'EGKK'
        },
        {
            ident:'FUBUR',
            type:'A380',
            economySeats:275,
            base:'LFSB'
        }]
    }));
});

app.get('/api/flights/:aircraft_id', (req, res) => {
    let id = req.params.aircraft_id;
    let flights = require('./flights.json');
    // let filtered = JSON.parse(flights).filter(flight => flight.id === id);

    res.setHeader('Content-Type', 'application/json');
    res.send(flights);
  });
  
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);