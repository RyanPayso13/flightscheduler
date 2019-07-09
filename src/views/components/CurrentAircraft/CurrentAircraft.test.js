import React from 'react';
import {
    render  
} from '@testing-library/react';
import Context from '../../../state/context';
import CurrentAircraft from './CurrentAircraft';

function generateContextTree(state = {}) {
    return (
        <Context.Provider value={{ state }}>
          <CurrentAircraft />
        </Context.Provider>
      );
}

describe('<CurrentAircraft />', () => {

    it('should render the initial state', () => {
        const state = {
            currentAircraft: ''
        };
        const tree = generateContextTree(state);
        const { getByText } = render(tree);
        expect(getByText(/^Schedule for/)).toHaveTextContent('Schedule for');
    });

    it('should render an aircraft id', () => {
        const state = {
            currentAircraft: 'A380'
        };
        const tree = generateContextTree(state);
        const { getByText } = render(tree);
        expect(getByText(/^Schedule for/)).toHaveTextContent('Schedule for A380');
    });

});