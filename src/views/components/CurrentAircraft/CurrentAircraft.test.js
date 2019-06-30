import React from 'react';
import {
    render  
} from '@testing-library/react';
import CurrentAircraft from './CurrentAircraft';

describe('<CurrentAircraft />', () => {

    it('should render self', () => {
        const { getByText } = render(<CurrentAircraft />);
        expect(getByText('Current Aircraft: FOOBAR!')).toHaveTextContent('Current Aircraft: FOOBAR!');
    });

});