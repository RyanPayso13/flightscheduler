import React, { useReducer } from 'react';
import {
  initialState,
  flightSchedulerReducer
} from './state/reducers';
import Context from './state/context';
import Flight from '@material-ui/icons/Flight';
import { makeStyles } from '@material-ui/core/styles';
import AircraftList from './views/containers/AircraftList/AircraftList';
import CurrentAircraft from './views/components/CurrentAircraft/CurrentAircraft';
import FlightList from './views/containers/FlightList/FlightList';
import ScheduledFlightList from './views/containers/ScheduledFlightList/ScheduledFlightList';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
}));

function App() {

  const classes = useStyles();
  const [state, dispatch] = useReducer(flightSchedulerReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <React.Fragment>
            <h2><Flight className={classes.icon} /> Flight Scheduler App</h2>
        <div className="App">
          <div className="container">
            <div className="container__column">
              <AircraftList />
            </div>
            <div>
              <CurrentAircraft />
            </div>
            <div>
              <ScheduledFlightList />
            </div>
            <div>
              <FlightList />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Context.Provider>
  );
}

export default App;
