import React from 'react';
import {
    render,
    waitForElement
} from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { API_URL } from '../../../state/constants';
import Context from '../../../state/context';
import AircraftList from './AircraftList';

function generateMock (resp = null) {

    const dispatch = jest.fn();

    return <FetchMock options={{ 
                matcher: `${API_URL}/aircrafts`,
                response: resp
                }}>
                <Context.Provider value={{ dispatch }}>
                    <AircraftList />
                </Context.Provider>
            </FetchMock>;
}

describe('<AircraftList />', () => {

    it('should render self', () => {
        const { getByTestId } = render(<AircraftList />);
        expect(getByTestId('aircraft-list-container')).toBeInTheDocument();
    });

    it('should render loading state', () => {
        const { getByTestId } = render(<AircraftList />);
        const loadingEl = getByTestId('loading');
        expect(loadingEl).toBeInTheDocument();
        expect(loadingEl).toHaveTextContent('Loading...');
    });

    it('should render error state', async () => {
        const { getByTestId } = render(generateMock(Promise.reject('API error')));
        const errorEl = await waitForElement(() => getByTestId('error'));
        expect(errorEl).toBeInTheDocument();
        expect(errorEl).toHaveTextContent('There has been an error');
    });

    it('should render one aircraft', async () => {
        let data = {"pagination":{"offset":0,"limit":25,"total":1},"data":[{"ident":"GABCD","type":"A320","economySeats":186,"base":"EGKK"}]};
        const { getByTestId } = render(generateMock(data));
        const listEl = await waitForElement(() => getByTestId('aircraft-list-container'));
        expect(listEl).toBeInTheDocument();
        expect(listEl).toContainElement(getByTestId('ident'));
    });

    it('should render multiple aircraft', async () => {
        let data = {"pagination":{"offset":0,"limit":25,"total":1},"data":[{"ident":"GABCD","type":"A320","economySeats":186,"base":"EGKK"}, {"ident":"FOOBAR","type":"A320","economySeats":99,"base":"LOND"}]};
        const { getByTestId } = render(generateMock(data));
        const listEl = await waitForElement(() => getByTestId('aircraft-list-container'));
        expect(listEl).toBeInTheDocument();
        expect(document.querySelectorAll('[data-testid="ident"]').length).toEqual(2);
    });

    it('should render no aircraft message', async () => {
        let data = {"pagination":{"offset":0,"limit":25,"total":1},"data":[]};
        const { getByTestId } = render(generateMock(data));
        const aicraftMsgEl = await waitForElement(() => getByTestId('aircraft-msg'));
        expect(aicraftMsgEl).toBeInTheDocument();
        expect(aicraftMsgEl).toHaveTextContent('There are no aircraft to display');
    });

});