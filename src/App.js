import React from 'react';
import AircraftList from './views/containers/AircraftList/AircraftList';


function App() {
  return (
    <div className="App">
      <header>
          <h1>Flight Scheduler</h1>
      </header>
      <div className="container">
        <div className="container__column">
          <AircraftList />
        </div>
      </div>
    </div>
  );
}

export default App;
