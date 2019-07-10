import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../state/context';
import { API_URL } from '../../../state/constants';
import { addFlightToSchedule } from '../../../state/actions';
import Flight from '../../components/Flight/Flight';
import { ScaleLoader } from 'react-spinners';
import { css } from '@emotion/core';

const FlightList = () => {

    const { state, dispatch } = useContext(Context);
    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const fetchFlights = async (id = '') => {
        setLoading(true);
        setError(false);
        try {
            const result = await fetch(`${API_URL}/flights/${id}`);
            result
                .json()
                .then(data => setData(data.data));
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };  
    const handleOnClick = (flight = null) => {
        const flights = [...data];
        const payload = {...flight};
        dispatch(addFlightToSchedule(payload));
        /**
         * Flights cannot teleport location
         * Flights must be at least 40 minutes in the future
         */
        setData(flights.filter(el => el.id !== flight.id 
                                && el.origin === flight.destination 
                                && el.departure_time >= (flight.arrival_time + (40 * 60)))
                );
    };
    const override = css`
        margin-top: 1rem;
    `;

    useEffect(() => {
        if (state.currentAircraft !== '' && 
            state.scheduledFlights.length === 0) {
            fetchFlights(state.currentAircraft);
        }
    }, [ state.currentAircraft, state.scheduledFlights ]);

    return (
        <div 
            data-testid="flight-list-container"
            className="overflow-y-auto max-h-full">
            {isLoading && <ScaleLoader
                            css={override}
                            sizeUnit={"px"}
                            size={100}
                            color={'#616161'}
                            loading={isLoading} />}
            {!isLoading && !hasError && 
                <ul data-testid="flight-list">
                    {data.length > 0 && data.map((el, index) => (
                        <li data-testid="flight-el" 
                            key={index} 
                            onClick={() => handleOnClick(el)}>
                            <Flight {...el} />
                        </li>
                    ))}
                    {data.length === 0 && <li data-testid="flight-list-msg" className="bg-blue-100 border border-blue-200 text-blue-700 mt-4 px-4 py-3 rounded relative" role="alert">No data</li>}
                </ul>
            }
            {hasError && <div 
                            data-testid="error"
                            className="bg-red-100 border border-red-200 text-red-700 mt-4 px-4 py-3 rounded relative" role="alert">
                                There has been an error
                        </div>
            }
        </div>
    );

}

export default FlightList;