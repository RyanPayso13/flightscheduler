import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../state/context';
import Flight from '../../components/Flight/Flight';

const ScheduledFlightList = () => {

    const { state } = useContext(Context);
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = [...state.scheduledFlights];
        setData(data);
    }, [state.scheduledFlights]);

    return (
        <div data-testid="schedule">
            <ul data-testid="schedule-list">
                {data.length > 0 && data.map((el, index) => (
                    <li key={index}>
                        <Flight {...el} />
                    </li>
                ))}
                {data.length === 0 && <li data-testid="schedule-list-msg">There are no flights scheduled</li>}
            </ul>
        </div>
    );

}

export default ScheduledFlightList;