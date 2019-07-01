import * as ACTION_TYPES from './constants';

export function setCurrentAircraft(ident = '') {
    return {
        type: ACTION_TYPES.SET_CURRENT_AIRCRAFT,
        payload: ident
    }
}

export function addFlightToSchedue(flight = {}) {
    return {
        type: ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE,
        payload: flight
    }
}