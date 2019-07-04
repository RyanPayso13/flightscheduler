import React from 'react';
import { render } from '@testing-library/react';
import Context from '../../../state/context';
import ScheduledFlightList from './ScheduledFlightList';

function generateContext (obj = {}) {
    
    const state = {...obj};

    return <Context.Provider value={{ state }}>
                <ScheduledFlightList />
            </Context.Provider>;

}

describe('<ScheduledFlightList />', () => {

    it('should render no flights message', () => {
        const state = {
            scheduledFlights: []
        };
        const { getByTestId } = render(generateContext(state));
        expect(getByTestId('schedule')).toBeInTheDocument();
        expect(getByTestId('schedule-list-msg')).toHaveTextContent('There are no flights scheduled');
    });

    it('should render a single flight', () => {
        const state = {
            scheduledFlights: [{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}]
        };
        const { getByTestId } = render(generateContext(state));
        expect(document.querySelectorAll('li').length).toEqual(1);
    });

    it('should render flights', () => {
        const state = {
            scheduledFlights: [{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}, {"id":"AS1002","departuretime":27900,"arrivaltime":32100,"readable_departure":"07:45","readable_arrival":"08:55","origin":"LFMN","destination":"LFSB"}]
        };
        const { getByTestId } = render(generateContext(state));
        expect(document.querySelectorAll('li').length).toEqual(2);
    });

});