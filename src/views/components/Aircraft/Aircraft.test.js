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

    it('should dispatch the aircraft', () => {
        const state = {
            currentAircraft: 'GABCD'
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('dispatch'));

        expect(dispatch).toHaveBeenCalled();  
        expect(dispatch).toHaveBeenCalledWith({
            'payload': 'GABCD',
            'type': ACTION_TYPES.SET_CURRENT_AIRCRAFT
        });
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

    it('should not highlight the aircraft', () => {
        const state = {
            currentAircraft: ''
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(generateContext(state, dispatch));

        fireEvent.click(getByTestId('dispatch'));

        expect(getByTestId('dispatch')).not.toHaveClass('bg-green-200');
    });    

});