import React from 'react';
import { Row, Col } from 'react-bootstrap'

const MatchInfo = ({matchSelected, countries}) => {
    const countryName = countries.find(country => country.id === matchSelected.country)
    return (
        <Row className="spacingBottom__5">
            <Col>
                <Row>
                    <p className="label label__marginLeft">Deporte</p>
                </Row>
                <Row>
                    <p className="disabled-input">{matchSelected.sport}</p>
                </Row>
            </Col>
            <Col>
                <Row>
                    <p className="label label__marginLeft">País</p>
                </Row>
                <Row>
                    <p className="disabled-input">{countryName.name}</p>
                </Row>
            </Col>
            <Col>
                <Row>
                    <p className="label label__marginLeft">Torneo</p>
                </Row>
                <Row>
                    <p className="disabled-input">{matchSelected.competition}</p>
                </Row>
            </Col>
        </Row>
    )
}

export default MatchInfo