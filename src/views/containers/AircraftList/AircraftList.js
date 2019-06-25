import React, { useState, useEffect } from 'react';
import Aircraft from '../../components/Aircraft/Aircraft';

function AircraftList () {

    const API_URL = 'https://infinite-dawn-93085.herokuapp.com/aircrafts';
    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const fetchAircraft = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await fetch(`${API_URL}`);
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
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && !hasError && 
                <ul>
                    {data.map((el, index) => (
                        <Aircraft key={index} {...el} />
                    ))}
                </ul>
            }
            {hasError && <div>There has been an error</div>}
        </div>
    );

}

export default AircraftList;