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
            currentAircraft: ''
        };
        const { getByTestId } = render(generateMock(state));
        expect(getByTestId('flight-list-container')).toBeInTheDocument();
    });

    xit('should render loading state', async () => {
        // how to test loading only
        // currentaircraft must be proper string to fire fetch
        const state = {
            currentAircraft: ''
        };
        const { getByTestId } = render(generateMock(state, {"data":[]}));
        const flightListMsg = await waitForElement(() => getByTestId('flight-list-msg'));
        expect(flightListMsg).toBeInTheDocument();
        expect(flightListMsg).toHaveTextContent('No data');
    });

    it('should render error state', async () => {
        const state = {
            currentAircraft: 'A380'
        };
        const { getByTestId } = render(generateMock(state, Promise.reject('API error')));
        const errorEl = await waitForElement(() => getByTestId('error'));
        expect(errorEl).toBeInTheDocument();
        expect(errorEl).toHaveTextContent('There has been an error');
    });

    it('should render no flights message', async () => {
        const state = {
            currentAircraft: 'A380'
        };
        const { getByTestId } = render(generateMock(state, {"data":[]}));
        const flightListMsg = await waitForElement(() => getByTestId('flight-list-msg'));
        expect(flightListMsg).toBeInTheDocument();
        expect(flightListMsg).toHaveTextContent('No data');
    });

    it('should render a single flight', async () => {
        const state = {
            currentAircraft: 'A380'
        };
        const { getAllByTestId } = render(generateMock(state, {"data":[{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}]}));
        const flights = await waitForElement(() => getAllByTestId('flight'));
        expect(flights.length).toEqual(1);    
    });

    it('should render multiple flights', async () => {
        const state = {
            currentAircraft: 'A380'
        };
        const { getAllByTestId } = render(generateMock(state, {"data":[{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}, {"id":"AS1002","departuretime":27900,"arrivaltime":32100,"readable_departure":"07:45","readable_arrival":"08:55","origin":"LFMN","destination":"LFSB"}]}));
        const flights = await waitForElement(() => getAllByTestId('flight'));
        expect(flights.length).toEqual(2);  
    });

    it('should dispatch a flight for scheduling', async () => {
        const state = {
            currentAircraft: 'A380'
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
            currentAircraft: 'A380'
        };
        const { 
            queryByText, 
            getAllByTestId 
        } = render(generateMock(
            state, 
            {"data":[{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"},{"id":"AS1002","departuretime":27900,"arrivaltime":32100,"readable_departure":"07:45","readable_arrival":"08:55","origin":"LFMN","destination":"LFSB"},{"id":"AS1025","departuretime":22800,"arrivaltime":28200,"readable_departure":"06:20","readable_arrival":"07:50","origin":"LFSB","destination":"EDDH"},{"id":"AS1026","departuretime":30000,"arrivaltime":35100,"readable_departure":"08:20","readable_arrival":"09:45","origin":"EDDH","destination":"LFSB"},{"id":"AS1027","departuretime":35100,"arrivaltime":40500,"readable_departure":"09:45","readable_arrival":"11:15","origin":"LFSB","destination":"EDDH"},{"id":"AS1028","departuretime":42300,"arrivaltime":47400,"readable_departure":"11:45","readable_arrival":"13:10","origin":"EDDH","destination":"LFSB"},{"id":"AS1043","departuretime":27900,"arrivaltime":33600,"readable_departure":"07:45","readable_arrival":"09:20","origin":"LFSB","destination":"EHAM"},{"id":"AS1044","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"EHAM","destination":"LFSB"},{"id":"AS1057","departuretime":36900,"arrivaltime":43500,"readable_departure":"10:15","readable_arrival":"12:05","origin":"LFSB","destination":"LEPA"},{"id":"AS1058","departuretime":45600,"arrivaltime":52800,"readable_departure":"12:40","readable_arrival":"14:40","origin":"LEPA","destination":"LFSB"},{"id":"AS1067","departuretime":21600,"arrivaltime":31200,"readable_departure":"06:00","readable_arrival":"08:40","origin":"LFSB","destination":"LEMG"},{"id":"AS1068","departuretime":33300,"arrivaltime":42900,"readable_departure":"09:15","readable_arrival":"11:55","origin":"LEMG","destination":"LFSB"},{"id":"AS1075","departuretime":31800,"arrivaltime":37800,"readable_departure":"08:50","readable_arrival":"10:30","origin":"LFSB","destination":"LEBL"},{"id":"AS1076","departuretime":22800,"arrivaltime":29700,"readable_departure":"06:20","readable_arrival":"08:15","origin":"LEBL","destination":"LFSB"},{"id":"AS1081","departuretime":49800,"arrivaltime":55800,"readable_departure":"13:50","readable_arrival":"15:30","origin":"LFSB","destination":"LEBL"},{"id":"AS1082","departuretime":40800,"arrivaltime":47700,"readable_departure":"11:20","readable_arrival":"13:15","origin":"LEBL","destination":"LFSB"},{"id":"AS1083","departuretime":36000,"arrivaltime":44100,"readable_departure":"10:00","readable_arrival":"12:15","origin":"LFSB","destination":"LEAL"},{"id":"AS1084","departuretime":46200,"arrivaltime":54600,"readable_departure":"12:50","readable_arrival":"15:10","origin":"LEAL","destination":"LFSB"},{"id":"AS11","departuretime":43200,"arrivaltime":47700,"readable_departure":"12:00","readable_arrival":"13:15","origin":"EGGW","destination":"EGPH"},{"id":"AS1115","departuretime":21600,"arrivaltime":30000,"readable_departure":"06:00","readable_arrival":"08:20","origin":"LFSB","destination":"LEMD"},{"id":"AS1116","departuretime":32100,"arrivaltime":40200,"readable_departure":"08:55","readable_arrival":"11:10","origin":"LEMD","destination":"LFSB"},{"id":"AS1125","departuretime":43500,"arrivaltime":49500,"readable_departure":"12:05","readable_arrival":"13:45","origin":"LFSB","destination":"LIRN"},{"id":"AS1126","departuretime":35100,"arrivaltime":41700,"readable_departure":"09:45","readable_arrival":"11:35","origin":"LIRN","destination":"LFSB"},{"id":"AS1131","departuretime":36300,"arrivaltime":45600,"readable_departure":"10:05","readable_arrival":"12:40","origin":"LFSB","destination":"LPPR"},{"id":"AS1132","departuretime":25500,"arrivaltime":34200,"readable_departure":"07:05","readable_arrival":"09:30","origin":"LPPR","destination":"LFSB"}]}
            ));
        const flights = await waitForElement(() => getAllByTestId('flight-el'));
        expect(flights.length).toEqual(25);
        fireEvent.click(flights[1]);
        const flightsUpdated = await waitForElement(() => getAllByTestId('flight-el'));
        expect(flightsUpdated.length).toEqual(6);
        expect(queryByText(/^Flight: AS1002/)).not.toBeInTheDocument();
    });

});