import * as ACTION_TYPES from './constants';
import * as actions from './actions';

describe('Actions', () => {

    it('should set the current aircraft', () => {
        const payload = 'GABCD';
        const expectedAction = {
            type: ACTION_TYPES.SET_CURRENT_AIRCRAFT,
            payload
        };
        expect(actions.setCurrentAircraft(payload)).toEqual(expectedAction);
    });

    it('should schedule a flight', () => {
        const payload = {
            "id":"AS1001",
            "departuretime":21600,
            "arrivaltime":26100,
            "readable_departure":"06:00",
            "readable_arrival":"07:15",
            "origin":"LFSB",
            "destination":"LFMN"
        };
        const expectedAction = {
            type: ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE,
            payload
        };
        expect(actions.addFlightToSchedule(payload)).toEqual(expectedAction);
    });

    it('should reset the schedule', () => {
        const payload = true;
        const expectedAction = {
            type: ACTION_TYPES.RESET_SCHEDULE,
            payload
        };
        expect(actions.resetSchedule()).toEqual(expectedAction);
    });

});