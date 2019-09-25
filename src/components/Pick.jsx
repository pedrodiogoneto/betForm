import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'

import prepareOddsData from '../helpers/prepareOddsData'

export default class Pick extends Component {
    state = {
        market: '',
        pick: '',
        odds: '',
    }

    componentDidUpdate(prevProps) {
        if(prevProps.matchSelected !== this.props.matchSelected) {
            this.setState({ market: '', pick: '', odds: '' })
        }
    }

    onChangeSelect = (field, option) => this.setState({ [field]: option }, () => this.props.onChangeSelect(field, option.value))

    handlePickOptions = () => {
        //For simplification and according to the exercice, I'll assume just the options 1 and 2.
        return [{value: '1', label: '1'},{value: '2', label: '2'}]
    }

    handleOddsOptions = () => {
        const result = this.props.matchSelected.bets.map(bet => {
            return bet.odds.reduce((results, possibleOdd) => {
                if(possibleOdd.id === this.state.pick.value) {
                    results.push({ bookieId: bet.bookieId, odd: possibleOdd.value })
                }
                return results
            }, [])
        })
        return prepareOddsData(result, this.props.bookies)
    }

    render() {
        const { market, pick, odds } = this.state
        return (
            <div>  
                <h4 className="align-text__left">Pick</h4>
                <Row>
                    <Col>
                        <p className="label">Mercado</p>
                        <Select 
                            options={[{ value: '12', label: '12' }]} 
                            value={market} 
                            onChange={(option) => this.onChangeSelect('market', option)}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </Col>
                    <Col>
                        {market && 
                            <React.Fragment>
                                <p className="label">Pick</p>
                                <Select 
                                    options={this.handlePickOptions()} 
                                    value={pick} 
                                    onChange={(option) => this.onChangeSelect('pick', option)}
                                    components={{ IndicatorSeparator: () => null }}
                                />
                            </React.Fragment>
                        }
                    </Col>
                    <Col>
                        {pick && 
                            <React.Fragment>
                                <p className="label">Odds</p>
                                <Select 
                                    options={this.handleOddsOptions()} 
                                    value={odds} 
                                    onChange={(option) => this.onChangeSelect('odds', option)}
                                    components={{ IndicatorSeparator: () => null }}
                                />
                            </React.Fragment>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}