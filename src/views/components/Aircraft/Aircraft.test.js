import React from 'react';
import {
    render,
    fireEvent
} from '@testing-library/react';
import * as ACTION_TYPES from '../../../state/constants';
import Context from '../../../state/context';
import Aircraft from './Aircraft';

function generateContext (state = { currentAircraft: '' }, dispatch = jest.fn()) {

    const props = {
        ident: 'GABCD',
        type: 'A320',
        base: 'EGKK'
    };

    return <Context.Provider value={{ state, dispatch }}>
                <Aircraft {...props} />
            </Context.Provider>;
}

describe('<Aircraft />', () => {

    it('should render self', () => {
        const { getByTestId } = render(generateContext());
        expect(getByTestId('ident')).toHaveTextContent('GABCD');
        expect(getByTestId('type')).toHaveTextContent('A320');
        expect(getByTestId('base')).toHaveTextContent('EGKK');
    });

    it(`should dispatch both actions: ${ACTION_TYPES.SET_CURRENT_AIRCRAFT}, ${ACTION_TYPES.RESET_SCHEDULE}`, () => {
        const state = {
            currentAircraft: 'GABCD'
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('dispatch'));

        expect(dispatch).toHaveBeenCalled();  
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({"payload": true, "type": ACTION_TYPES.RESET_SCHEDULE});
        expect(dispatch.mock.calls[1][0]).toEqual({"payload": state.currentAircraft, "type": ACTION_TYPES.SET_CURRENT_AIRCRAFT});
    });

    it('should highlight the aircraft', () => {
        const state = {
            currentAircraft: 'GABCD'
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('dispatch'));

        expect(getByTestId('dispatch')).toHaveClass('bg-green-200');
    });

    it('should unhighlight the aircraft', () => {
        const state = {
            currentAircraft: ''
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('dispatch'));

        expect(getByTestId('dispatch')).not.toHaveClass('bg-green-200');
    });    

});