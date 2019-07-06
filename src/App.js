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

function App() {

  const [state, dispatch] = useReducer(flightSchedulerReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <React.Fragment>
        <div className="container mx-auto max-w-5xl">
          <div className="flex bg-gray-200">
            <div className="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
              Available Aircraft
            </div>
            <div className="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
              <CurrentAircraft />
            </div>
            <div className="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
              Available Flights
            </div>
          </div>
          <div className="flex max-h-screen bg-gray-200">
            <div className="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
            <AircraftList />
            </div>
            <div className="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
            <ScheduledFlightList />
            </div>
            <div className="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
              <FlightList />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Context.Provider>
  );
}

export default App;
