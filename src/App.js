import React, { useReducer } from 'react';
import {
  initialState,
  flightSchedulerReducer
} from './state/reducers';
import Context from './state/context';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Flight from '@material-ui/icons/Flight';
import { makeStyles } from '@material-ui/core/styles';
import AircraftList from './views/containers/AircraftList/AircraftList';
import CurrentAircraft from './views/components/CurrentAircraft/CurrentAircraft';

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
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Flight className={classes.icon} />
            <h2>Flight Scheduler App</h2>
          </Toolbar>
        </AppBar>
        <div className="App">
          <div className="container">
            <div className="container__column">
              <AircraftList />
            </div>
            <div>
              <CurrentAircraft />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Context.Provider>
  );
}

export default App;
