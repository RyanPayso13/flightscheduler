import React from 'react';
import {
    render,
    fireEvent
} from '@testing-library/react';
import Context from '../../../state/context';
import Aircraft from './Aircraft';

describe('<Aircraft />', () => {

    it('should render self', () => {
        const props = {
            ident: 'GABCD',
            type: 'A320',
            base: 'EGKK'
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(
            <Context.Provider value={{ dispatch }}>
                <Aircraft {...props} />
            </Context.Provider>
        );
        
        expect(getByTestId('ident')).toHaveTextContent('GABCD');
        expect(getByTestId('type')).toHaveTextContent('A320');
        expect(getByTestId('base')).toHaveTextContent('EGKK');
      });

    it('should handle click', () => {
        const props = {
            ident: 'GABCD',
            type: 'A320',
            base: 'EGKK'
        };
        const dispatch = jest.fn();
        const { getByTestId } = render(
            <Context.Provider value={{ dispatch }}>
                <Aircraft {...props} />
            </Context.Provider>
        );      

        fireEvent.click(getByTestId('dispatch'));

        expect(dispatch).toHaveBeenCalled();  
        expect(dispatch).toHaveBeenCalledWith({
            'payload': 'GABCD',
            'type': 'SET_CURRENT_AIRCRAFT'
        });
    });

});