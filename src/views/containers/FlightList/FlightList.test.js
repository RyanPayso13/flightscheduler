import React from 'react';
import { 
    render,
    waitForElement,
    fireEvent
} from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { API_URL } from '../../../state/constants';
import * as ACTION_TYPES from '../../../state/constants';
import Context from '../../../state/context';
import FlightList from './FlightList';

function generateMock (obj = {}, resp = null, dispatch = jest.fn(), flightId = 'A380') {
    
    const state = {...obj};

    return <FetchMock options={{
                matcher: `${API_URL}/flights/${flightId}`,
                response: resp
            }}>
                <Context.Provider value={{ state, dispatch }}>
                    <FlightList />
                </Context.Provider>
            </FetchMock>;
}

describe('<FlightList />', () => {

    it('should render self', () => {
        const state = {
            currentAircraft: '',
            scheduledFlights: []
        };
        const { getByTestId } = render(generateMock(state));
        expect(getByTestId('flight-list-container')).toBeInTheDocument();
    });

    xit('should render loading state', async () => {
        // how to test loading only
        // currentaircraft must be proper string to fire fetch
        const state = {
            currentAircraft: '',
            scheduledFlights: []
        };
        const { getByTestId } = render(generateMock(state, {"data":[]}));
        const flightListMsg = await waitForElement(() => getByTestId('flight-list-msg'));
        expect(flightListMsg).toBeInTheDocument();
        expect(flightListMsg).toHaveTextContent('No data');
    });

    it('should render error state', async () => {
        const state = {
            currentAircraft: 'A380',
            scheduledFlights: []
        };
        const { getByTestId } = render(generateMock(state, Promise.reject('API error')));
        const errorEl = await waitForElement(() => getByTestId('error'));
        expect(errorEl).toBeInTheDocument();
        expect(errorEl).toHaveTextContent('There has been an error');
    });

    it('should render no flights message', async () => {
        const state = {
            currentAircraft: 'A380',
            scheduledFlights: []
        };
        const { getByTestId } = render(generateMock(state, {"data":[]}));
        const flightListMsg = await waitForElement(() => getByTestId('flight-list-msg'));
        expect(flightListMsg).toBeInTheDocument();
        expect(flightListMsg).toHaveTextContent('No data');
    });

    it('should render a single flight', async () => {
        const state = {
            currentAircraft: 'A380',
            scheduledFlights: []
        };
        const { getAllByTestId } = render(generateMock(state, {"data":[{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}]}));
        const flights = await waitForElement(() => getAllByTestId('flight'));
        expect(flights.length).toEqual(1);    
    });

    it('should render multiple flights', async () => {
        const state = {
            currentAircraft: 'A380',
            scheduledFlights: []
        };
        const { getAllByTestId } = render(generateMock(state, {"data":[{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}, {"id":"AS1002","departuretime":27900,"arrivaltime":32100,"readable_departure":"07:45","readable_arrival":"08:55","origin":"LFMN","destination":"LFSB"}]}));
        const flights = await waitForElement(() => getAllByTestId('flight'));
        expect(flights.length).toEqual(2);  
    });

    it('should dispatch a flight for scheduling', async () => {
        const state = {
            currentAircraft: 'A380',
            scheduledFlights: []
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateMock(
            state, 
            {"data":[{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}]},
            dispatch
            ));
        const flight = await waitForElement(() => getByTestId('flight-el'));
        fireEvent.click(flight);
        expect(dispatch).toHaveBeenCalled(); 
        expect(dispatch).toHaveBeenCalledWith({"payload": {"arrivaltime": 26100, "departuretime": 21600, "destination": "LFMN", "id": "AS1001", "origin": "LFSB", "readable_arrival": "07:15", "readable_departure": "06:00"}, "type": ACTION_TYPES.ADD_FLIGHT_TO_SCHEDULE});
    });

    it('should show only flights available for scheduling', async () => {
        const state = {
            currentAircraft: 'A380',
            scheduledFlights: []
        };
        const { 
            queryByText, 
            getAllByTestId 
        } = render(generateMock(
            state, 
            {"data":[
                {        
                    "aircraft_id":"GABCD",
                    "id":"AS1227",
                    "departure_time":40200,
                    "arrival_time":56400,
                    "readable_departure":"11:10",
                    "readable_arrival":"15:40",
                    "origin":"LFSB",
                    "destination":"GCLA",
                },
                {
                    "aircraft_id":"GABCD",
                    "id":"AS1228",
                    "departure_time":58800,
                    "arrival_time":74700,
                    "readable_departure":"16:20",
                    "readable_arrival":"20:45",
                    "origin":"GCLA",
                    "destination":"LFSB"
                }
            ]}
            ));
        const flights = await waitForElement(() => getAllByTestId('flight-el'));
        expect(flights.length).toEqual(2);
        fireEvent.click(flights[0]);
        const flightsUpdated = await waitForElement(() => getAllByTestId('flight-el'));
        expect(flightsUpdated.length).toEqual(1);
        expect(queryByText(/^Flight: AS1227/)).not.toBeInTheDocument();
        expect(queryByText(/^Flight: AS1228/)).toBeInTheDocument();
    });

});