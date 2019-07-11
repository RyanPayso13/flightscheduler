import React, { useState, useContext, useEffect } from 'react';
import { resetSchedule } from '../../../state/actions';
import Context from '../../../state/context';

const ResetBtn = () => {

    const { state, dispatch } = useContext(Context);
    const [ disabled, setDisabled ] = useState('');
    const [ btnClass, setBtnClass ] = useState('');
    const handleClick = () => {
        dispatch(resetSchedule());
    };
    let classes = `${ btnClass } self-end text-white font-bold py-2 px-4 rounded`;

    useEffect(() => {
        setDisabled(state.scheduledFlights.length === 0 ? 'disabled' : '');
        setBtnClass(state.scheduledFlights.length === 0 ? 'bg-gray-500 cursor-default' : 'bg-blue-500 hover:bg-blue-600');
    }, [state.scheduledFlights]);

    return (
        <button
            data-testid="reset-btn"
            type="button"
            className={ classes } 
            onClick={ handleClick }
            disabled={ disabled }>
                Reset Schedule
        </button>
    );
};

export default ResetBtn;