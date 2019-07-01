import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../state/context';
import { API_URL } from '../../../state/constants';

const FlightList = () => {

    const { state } = useContext(Context);
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
    }  

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
                        // <Flight key={index} {...el} />
                        <li>{index}</li>
                    ))}
                    {data.length === 0 && <li data-testid="aircraft-msg">There are no flights to display</li>}
                </ul>
            }
            {hasError && <div data-testid="error">There has been an error</div>}
        </div>
    );

}

export default FlightList;