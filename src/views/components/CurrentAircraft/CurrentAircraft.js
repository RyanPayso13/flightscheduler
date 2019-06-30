import React, { useContext } from 'react';
import Context from '../../../state/context';

const CurrentAircraft = () => {

    const { state } = useContext(Context);

    return (
        <React.Fragment>
           Current Aircraft: { state.currentAircraft }
        </React.Fragment>
    );
};

export default CurrentAircraft;