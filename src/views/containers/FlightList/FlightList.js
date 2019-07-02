import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../state/context';
import { API_URL } from '../../../state/constants';
import { addFlightToSchedule } from '../../../state/actions';
import Flight from '../../components/Flight/Flight';

const FlightList = () => {

    const { state, dispatch } = useContext(Context);
    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const fetchFlights = async (ident = '') => {
        setLoading(true);
        setError(false);
        try {
            const result = await fetch(`${API_URL}/flights`);
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
        setData(flights.filter(el => el.id !== flight.id && el.origin === flight.destination && el.departuretime >= (flight.arrivaltime + (40 * 60))));
    };

    useEffect(() => {
        if (state.currentAircraft !== '') {
            fetchFlights(state.currentAircraft);
        }
    }, [state.currentAircraft]);

    return (
        <div data-testid="flight-list-container">
            {isLoading && <div data-testid="loading">Loading...</div>}
            {!isLoading && !hasError && 
                <ul data-testid="flight-list">
                    {data.length > 0 && data.map((el, index) => (
                        <li key={index} onClick={() => handleOnClick(el)}>
                            <Flight {...el} />
                        </li>
                    ))}
                    {data.length === 0 && <li data-testid="flight-list-msg">There are no flights to schedule for the selected aircraft</li>}
                </ul>
            }
            {hasError && <div data-testid="error">There has been an error</div>}
        </div>
    );

}

export default FlightList;