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

describe('<ScheduledflightList />', () => {

    it('should render no flights message', () => {
        const state = {
            scheduledFlights: []
        };
        const { getByTestId } = render(generateContext(state));
        expect(getByTestId('schedule')).toBeInTheDocument();
        expect(getByTestId('schedule-list-msg')).toHaveTextContent('There are no flights available for schedule');
    });

    it('should render a single flight', () => {

    });

    it('should render multiple flights', () => {

    });

});