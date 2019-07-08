import React, { useReducer } from 'react';
import {
  initialState,
  flightSchedulerReducer
} from './state/reducers';
import Context from './state/context';
import AircraftList from './views/containers/AircraftList/AircraftList';
import CurrentAircraft from './views/components/CurrentAircraft/CurrentAircraft';
import FlightList from './views/containers/FlightList/FlightList';
import ScheduledFlightList from './views/containers/ScheduledFlightList/ScheduledFlightList';
import { TiPlaneOutline } from 'react-icons/ti';

function App() {

  const [state, dispatch] = useReducer(flightSchedulerReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
        <React.Fragment>
          <nav className="container flex container mx-auto max-w-5xl py-4 px-2">
            <h2><TiPlaneOutline className="align-baseline inline-block" /> Flight Scheduler App</h2>
          </nav>
          <main className="overflow-y-hidden max-h-screen container mx-auto max-w-5xl flex justify-between mt-4">
            <div className="w-full bg-white shadow-md rounded m-2 p-4 text-center">
              <h2 className="border-b border-grey-light pb-3">Aircraft List</h2>
              <AircraftList />
            </div>
            <div className="w-full bg-white shadow-md rounded m-2 p-4 text-center">
              <CurrentAircraft />
              <ScheduledFlightList />
            </div>
            <div className="w-full bg-white shadow-md rounded m-2 p-4 text-center">
              <h2 className="border-b border-grey-light pb-3">Flight List</h2>
              <FlightList />
            </div>
          </main>
        </React.Fragment>
      </Context.Provider>
  );
}

export default App;
