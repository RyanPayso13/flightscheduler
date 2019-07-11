import React from 'react';
import {
    render
} from '@testing-library/react';
import Flight from './Flight';

describe('<Flight />', () => {

    it('should render a flight', () => {
        const props = {
            "id":"AS1001",
            "departuretime":21600,
            "arrivaltime":26100,
            "readable_departure":"06:00",
            "readable_arrival":"07:15",
            "origin":"LFSB",
            "destination":"LFMN"
        };
        const { getByTestId } = render(<Flight {...props} />);

        expect(getByTestId('flight')).toBeInTheDocument();
        expect(getByTestId('flight-id')).toHaveTextContent('AS1001');
        expect(getByTestId('flight-origin')).toHaveTextContent('LFSB');
        expect(getByTestId('flight-readable-departure')).toHaveTextContent('06:00');
        expect(getByTestId('flight-destination')).toHaveTextContent('LFMN');
        expect(getByTestId('flight-readable-arrival')).toHaveTextContent('07:15');
      });
});