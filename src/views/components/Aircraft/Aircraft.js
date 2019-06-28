import React from 'react';
import PropTypes from 'prop-types';

const Aircraft = ({ident, type, base}) => (
    <li>
        <p data-testid="ident">{ident}</p>
        <p data-testid="type">{type}</p>
        <p data-testid="base">{base}</p>
    </li>
);

Aircraft.propTypes = {
    ident: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
};

export default Aircraft;