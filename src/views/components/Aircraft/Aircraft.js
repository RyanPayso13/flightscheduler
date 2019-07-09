import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setCurrentAircraft } from '../../../state/actions';
import Context from '../../../state/context';

const Aircraft = ({ 
    ident = '', 
    type = '', 
    base = '' 
}) => {

    const { state, dispatch } = useContext(Context);
    const [highlightClass, setHighlightClass] = useState('');
    let classes = `${ highlightClass } border border-grey-light p-2 mt-4 rounded`;

    useEffect(() => {
        return setHighlightClass(state.currentAircraft === ident ? 'bg-indigo-200' : '');
    }, [state.currentAircraft, ident]);

    return (
        <li className={ classes }
            data-testid="dispatch" 
            onClick={() => dispatch(setCurrentAircraft(ident))}>
            <p data-testid="ident">{ ident }</p>
            <p data-testid="type">{ type }</p>
            <p data-testid="base">{ base }</p>
        </li>
    );
};

Aircraft.propTypes = {
    ident: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
};

export default Aircraft;