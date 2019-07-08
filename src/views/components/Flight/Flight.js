import React from 'react';
import PropTypes from 'prop-types';
import { FaPlane } from 'react-icons/fa';

const Flight = ({ 
    id, 
    origin, 
    departuretime,
    readable_departure, 
    destination, 
    arrivaltime,
    readable_arrival
}) => (
    <div className="border border-grey-light p-2 mt-4 rounded text-left" data-testid="flight">
        <div>
            <div data-testid="flight-id">Flight: { id }</div>
            <div className="flex justify-between mt-2">
                <div>
                    <p data-testid="flight-origin">{ origin }</p>
                    <p data-testid="flight-readable-departure">{ readable_departure }</p>
                </div>
                <div className="self-center">
                    <FaPlane />
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