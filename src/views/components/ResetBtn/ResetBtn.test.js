import React from 'react';
import {
    render,
    fireEvent
} from '@testing-library/react';
import * as ACTION_TYPES from '../../../state/constants';
import Context from '../../../state/context';
import ResetBtn from './ResetBtn';

function generateContext (state = { scheduledFlights: [] }, dispatch = jest.fn()) {

    return <Context.Provider value={{ state, dispatch }}>
                <ResetBtn />
            </Context.Provider>;
}

describe('<ResetBtn />', () => {

    it('should render self', () => {
        const { getByTestId } = render(generateContext());
        const btnEl = getByTestId('reset-btn');
        expect(btnEl).toBeInTheDocument();
        expect(btnEl).toHaveTextContent('Reset Schedule');
    });

    it('should be disabled', () => {
        const state = {
            scheduledFlights: [],
        };
        const { getByTestId } = render(generateContext(state));
        expect(getByTestId('reset-btn')).toHaveAttribute('disabled');
    }); 

    it('should be enabled', () => {
        const state = {
            scheduledFlights: [{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}],
        };
        const { getByTestId } = render(generateContext(state));
        expect(getByTestId('reset-btn')).not.toHaveAttribute('disabled');
    });

    it('should reset the schedule', () => {
        const state = {
            scheduledFlights: [{"id":"AS1001","departuretime":21600,"arrivaltime":26100,"readable_departure":"06:00","readable_arrival":"07:15","origin":"LFSB","destination":"LFMN"}],
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('reset-btn'));

        expect(dispatch).toHaveBeenCalled();  
        expect(dispatch).toHaveBeenCalledWith({"payload": true, "type": ACTION_TYPES.RESET_SCHEDULE});
    });

    it('should not reset the schedule', () => {
        const state = {
            scheduledFlights: [],
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('reset-btn'));

        expect(dispatch).not.toHaveBeenCalled();  
        expect(dispatch).not.toHaveBeenCalledWith({"payload": true, "type": ACTION_TYPES.RESET_SCHEDULE});
    });

});