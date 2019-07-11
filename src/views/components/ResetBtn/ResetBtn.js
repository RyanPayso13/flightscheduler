import React, { useState, useContext, useEffect } from 'react';
import { resetSchedule } from '../../../state/actions';
import Context from '../../../state/context';

const ResetBtn = () => {

    const { state, dispatch } = useContext(Context);
    const [ disabled, setDisabled ] = useState('');
    const handleClick = () => {
        dispatch(resetSchedule());
    };

    useEffect(() => {
        setDisabled(state.scheduledFlights.length === 0 ? 'disabled' : '');
    }, [state.scheduledFlights]);

    return (
        <button
            data-testid="reset-btn"
            type="button"
            className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
            onClick={ handleClick }
            disabled={ disabled }>
                Reset Schedule
        </button>
    );
};

export default ResetBtn;