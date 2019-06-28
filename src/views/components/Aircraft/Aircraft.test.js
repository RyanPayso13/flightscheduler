import React from 'react';
import {
    render  
} from '@testing-library/react';
import Aircraft from './Aircraft';

describe('<Aircraft />', () => {

    it('should render self', () => {
        const props = {
            ident: 'GABCD',
            type: 'A320',
            base: 'EGKK'
        };
        const { getByTestId } = render(<Aircraft {...props} />);
        expect(getByTestId('ident')).toHaveTextContent('GABCD');
        expect(getByTestId('type')).toHaveTextContent('A320');
        expect(getByTestId('base')).toHaveTextContent('EGKK');
      });

});