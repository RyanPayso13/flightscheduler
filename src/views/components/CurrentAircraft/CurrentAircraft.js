import React, { useContext } from 'react';
import Context from '../../../state/context';

const CurrentAircraft = () => {

    const { state } = useContext(Context);

    return (
        <h2 className="border-b border-grey-light pb-3">
           Schedule for { state.currentAircraft }
        </h2>
    );
};

export default CurrentAircraft;