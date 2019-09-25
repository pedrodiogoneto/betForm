import React, { Component } from 'react';
import Select from 'react-select'
import {Spinner, Button } from 'react-bootstrap';

import MatchInfo from '../components/MatchInfo'
import Pick from '../components/Pick'
import RequestData from '../components/RequestData'

import prepareSelectData from '../helpers/prepareSelectData'

import matches from '../data/matches'
import bookies from '../data/bookies'
import countries from '../data/countries'

export default class Bet extends Component {

    state = {
        loading: false,
        matches: [],
        bookies: [],
        countries: [],
        matchSelected: '',
        market: '',
        pick: '',
        odds: '',
        showRequestData: false
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const availableMatches = this.getData(matches)
            const availableBookies = this.getData(bookies)
            const availableCountries = this.getData(countries)
            const result = await Promise.all([ availableMatches, availableBookies, availableCountries ])
            const matchesSelectOptions = await prepareSelectData(result[0])
            this.setState({
                loading: false,
                matches: result[0],
                bookies: result[1],
                countries: result[2],
                matchesSelectOptions
            })
        } catch (error) {
            //Add function to handle errors
            console.log(error)
        }
    }

    getData = (dataTitle) => {
        const data = new Promise((resolve, reject) => {
            return setTimeout(() => {
                if(dataTitle) resolve(dataTitle)
                else reject([])
            }, 2000)
        })
        return data
    };

    onMatchSelected = ({ value }) => {
        if(!value) return
        const matchSelected = this.state.matches.find(match => match.name === value)
        this.setState({ 
            matchSelected,
            market: '',
            pick: '',
            odds: '',
            showRequestData: false,
        })
    }

    onChangePick = (field, value) => this.setState({ [field]: value })

    render() {
        const { loading, matchesSelectOptions, matchSelected, bookies, countries, market, pick, odds, showRequestData } = this.state
        return (
            <div>
                <h1 className="title">Apuesta</h1>
                <p className="label">Partido</p>

                {loading ? 
                    <Spinner animation="border" role="status">
                       <span className="sr-only">Loading...</span>
                    </Spinner>
                :
                    <Select 
                        options={ matchesSelectOptions }
                        value={{ value: matchSelected.name, label: matchSelected.name}}
                        onChange={(match)=> this.onMatchSelected(match)}
                        components={
                            {
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null
                        }}
                        placeholder={"Seleccionar partido"}
                        className="select"
                        isSearchable
                    />
                }

                { matchSelected && <MatchInfo matchSelected={matchSelected} countries={countries}/> }
                
                { matchSelected && <Pick matchSelected={matchSelected} onChangeSelect={this.onChangePick} bookies={bookies}/> }
                
                <div className="spacingTop__5">
                    { matchSelected &&  market && pick && odds && 
                        <Button 
                            variant="dark" 
                            onClick={() => this.setState({ showRequestData: !showRequestData })}
                            >Submit
                        </Button>
                    }
                </div>

                { showRequestData && <RequestData matchSelected={matchSelected} market={market} pick={pick} odds={odds}/>}
            </div>
        );
    }
}