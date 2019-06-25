import React from 'react';
import PropTypes from 'prop-types';

const Aircraft = ({ident, type, base}) => (
    <li>
        <p>{ident}</p>
        <p>{type}</p>
        <p>{base}</p>
    </li>
);

Aircraft.propTypes = {
    ident: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
};

export default Aircraft;