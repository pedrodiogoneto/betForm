import React from 'react';
import { shallow } from 'enzyme';
import MatchInfo from '../components/MatchInfo';


describe('MyComponent', () => {
    it('should render correctly mode', () => {

        const countries = [
            { id: 'fr', name: 'France' },
            { id: 'es', name: 'Spain' },
        ]

        const matchSelected = {
            name: 'Barcelona - Madrid',
            sport: 'Fútbol',
            country: 'es',
            competition: 'La Liga',
            bets: [
                {
                    bookieId: 'bet365',
                    market: '12',
                    picks: ['1, 2'],
                    odds: [{ id: '1', value: 1.4 }, { id: '2', value: 3.4 }],
                },
                {
                    bookieId: 'hill',
                    market: '12',
                    picks: ['1, 2'],
                    odds: [{ id: '1', value: 1.6 }, { id: '2', value: 3.6 }],
                }
            ]
        }

        const component = shallow(<MatchInfo countries={countries} matchSelected={matchSelected}/>);
    
        expect(component).toMatchSnapshot();
    });
});