import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AircraftList from './AircraftList';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const enzymeWrapper = shallow(<AircraftList />)
    return {
        enzymeWrapper
    };
}

describe('Aircraft Component', () => {

    it('should render self', () => {
        const { enzymeWrapper } = setup()
        const aircraftInfo = enzymeWrapper.find('p');

        expect(aircraftInfo.length).toEqual(3);
        expect(aircraftInfo.at(0).text()).toEqual('GABCD');
        expect(aircraftInfo.at(1).text()).toEqual('A320');
        expect(aircraftInfo.at(2).text()).toEqual('EGKK');
      });

});