import React, { 
    useState, 
    useEffect, 
    useContext 
} from 'react';
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
                {data.length === 0 && <li className="bg-blue-100 border border-blue-200 text-blue-700 mt-4 px-4 py-3 rounded relative" 
                                            role="alert"
                                            data-testid="schedule-list-msg">
                                                No data
                                    </li>}
            </ul>
        </div>
    );

}

export default ScheduledFlightList;