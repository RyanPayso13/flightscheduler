import * as ACTION_TYPES from './constants';

export const initialState = {
    currentAircraft: '',
    scheduledFlights: []
};

export const flightSchedulerReducer = (state = initialState, action = '') => {
    switch(action.type) {
      case ACTION_TYPES.SET_CURRENT_AIRCRAFT:
        return {
          ...state,
          currentAircraft: action.payload
        };
      case ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE:
        return {
          ...state,
          scheduledFlights: [...state.scheduledFlights, {...action.payload}]
        };
      case ACTION_TYPES.RESET_SCHEDULE:
          return {
            ...state,
            scheduledFlights: []
          }
      default:
        return {...state}
    }
}