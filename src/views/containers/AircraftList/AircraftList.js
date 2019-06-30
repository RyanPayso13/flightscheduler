import React, { useState, useEffect } from 'react';
import Aircraft from '../../components/Aircraft/Aircraft';
import { API_URL } from '../../../state/constants';

const AircraftList = () => {

    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const fetchAircraft = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await fetch(`${API_URL}/aircrafts`);
            result
                .json()
                .then(data => setData(data.data));
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }  

    useEffect(() => {
        fetchAircraft();
    }, []);

    return (
        <div data-testid="aircraft-list-container">
            {isLoading && <div data-testid="loading">Loading...</div>}
            {!isLoading && !hasError && 
                <ul data-testid="aircraft-list">
                    {data.length > 0 && data.map((el, index) => (
                        <Aircraft key={index} {...el} />
                    ))}
                    {data.length === 0 && <li data-testid="aircraft-msg">There are no aircraft to display</li>}
                </ul>
            }
            {hasError && <div data-testid="error">There has been an error</div>}
        </div>
    );

}

export default AircraftList;