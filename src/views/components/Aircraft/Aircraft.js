import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { setCurrentAircraft } from '../../../state/actions';
import Context from '../../../state/context';

const Aircraft = ({ 
    ident = '', 
    type = '', 
    base = '' 
}) => {

    const { dispatch } = useContext(Context);

    return (
        <li data-testid="dispatch" onClick={() => dispatch(setCurrentAircraft(ident))}>
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