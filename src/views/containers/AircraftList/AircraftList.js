import React, { useState, useEffect } from 'react';
import Aircraft from '../../components/Aircraft/Aircraft';
import { API_URL } from '../../../state/constants';
import { ScaleLoader } from 'react-spinners';
import { css } from '@emotion/core';

const AircraftList = () => {

    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const fetchAircraft = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await fetch(`${API_URL}/aircraft`);
            result
                .json()
                .then(data => setData(data.data));
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };
    const override = css`
        margin-top: 1rem;
    `;

    useEffect(() => {
        fetchAircraft();
    }, []);

    return (
        <div data-testid="aircraft-list-container">
            {isLoading && <ScaleLoader
                            css={override}
                            sizeUnit={"px"}
                            size={100}
                            color={'#616161'}
                            loading={isLoading} />}
            {!isLoading && !hasError && 
                <ul data-testid="aircraft-list">
                    {data.length > 0 && data.map((el, index) => (
                        <Aircraft key={index} {...el} />
                    ))}
                    {data.length === 0 && <li data-testid="aircraft-msg">No data</li>}
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

export default AircraftList;