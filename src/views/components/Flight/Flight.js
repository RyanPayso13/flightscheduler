import React from 'react';
import PropTypes from 'prop-types';

const Flight = ({ 
    id, 
    origin, 
    departuretime,
    readable_departure, 
    destination, 
    arrivaltime,
    readable_arrival
}) => (
    <div data-testid="flight">
        <div>
            <div data-testid="flight-id">Flight: { id }</div>
            <div>
                <div>
                    <p data-testid="flight-origin">{ origin }</p>
                    <p data-testid="flight-readable-departure">{ readable_departure }</p>
                </div>
                <div>
                    <i className="large arrow right icon"></i>
                </div>
                <div>
                    <p data-testid="flight-destination">{ destination }</p>
                    <p data-testid="flight-readable-arrival">{ readable_arrival }</p>
                </div>
            </div>
        </div>
    </div>
);

Flight.propTypes = {
    id: PropTypes.string.isRequired,
    readable_departure: PropTypes.string.isRequired,
    readable_arrival: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    departuretime: PropTypes.number,
    arrivaltime: PropTypes.number
};

export default Flight;