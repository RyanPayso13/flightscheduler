import { flightSchedulerReducer } from './reducers';
import * as ACTION_TYPES from './constants';
import * as actions from './actions';

describe('Reducers', () => {

    it('should return the initial state', () => {
        expect(flightSchedulerReducer()).toEqual({
            currentAircraft: '',
            scheduledFlights: []
        });
    });

    describe(`${ACTION_TYPES.SET_CURRENT_AIRCRAFT}`, () => {

        it('should handle an empty string', () => {
            expect(flightSchedulerReducer({}, {
                type: ACTION_TYPES.SET_CURRENT_AIRCRAFT,
                payload: ''
            })).toEqual({
                currentAircraft: ''
            });
        });

        it('should handle a non-empty string', () => {
            expect(flightSchedulerReducer({}, {
                type: ACTION_TYPES.SET_CURRENT_AIRCRAFT,
                payload: 'A380'
            })).toEqual({
                currentAircraft: 'A380'
            });
        });

    });

    describe(`${ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE}`, () => {

        const API_FLIGHTS_LIST = [
            {
                "id":"AS1001",
                "departuretime":21600,
                "arrivaltime":26100,
                "readable_departure":"06:00",
                "readable_arrival":"07:15",
                "origin":"LFSB",
                "destination":"LFMN"
            },
            {
                "id":"AS1002",
                "departuretime":27900,
                "arrivaltime":32100,
                "readable_departure":"07:45",
                "readable_arrival":"08:55",
                "origin":"LFMN",
                "destination":"LFSB"
            }
        ];
        const PAYLOAD = {
            "id":"AS9999",
            "departuretime":33300,
            "arrivaltime":42900,
            "readable_departure":"09:15",
            "readable_arrival":"11:55",
            "origin":"LEMG",
            "destination":"LFSB"
        };

        it('should add a flight to an empty schedule', () => {
            expect(flightSchedulerReducer({
                scheduledFlights: []
            }, {
                type: ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE,
                payload: PAYLOAD
            })).toEqual({
                scheduledFlights: [{...PAYLOAD}]
            });
        });     

        it('should add a flight to an existing schedule', () => {
            expect(flightSchedulerReducer({
                scheduledFlights: [...API_FLIGHTS_LIST]
            }, {
                type: ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE,
                payload: PAYLOAD
            })).toEqual({
                scheduledFlights: [...API_FLIGHTS_LIST, PAYLOAD]
            });
        });

    });

});