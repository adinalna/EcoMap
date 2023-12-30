import React, { useEffect, useState } from 'react';
import {TypeAnimation} from "react-type-animation";
import {LinearProgress, Stack} from "@mui/material";
import {Button, Card, Col, Container, ProgressBar, Row} from "react-bootstrap";
import {ArrowForwardCircleOutline, ArrowForwardOutline} from "react-ionicons";
import CountUp from "react-countup";

export default function WorldCup() {

    //Litter Overall Totals Logic
    const totals = [
        { title: 'Total Litter', number: '752456' },
        { title: 'Total Photos', number: '478456' },
        { title: 'Total LitterCoin', number: '5456' }
    ];

    const topCountries = [
        { number: 1, country: 'Netherlands' },
        { number: 2, country: 'UK' },
        { number: 3, country: 'USA' }
    ];

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Litter Target Logic
    const targetValue = 1000000; // Example target
    const currentData = 752456;  // Example current data
    const previousTarget = 500000;

    // Calculate the percentage of current data towards the target
    const progressPercentage = parseFloat((currentData / targetValue * 100).toFixed(2));


    return (
        <>
            <div className='section'>
                <Container fluid >
                    <Row style={{paddingBottom: 20}}>
                        <Col>
                            <Card style={{backgroundColor:'#163020'}}>
                                <Card.Body style={{textAlign:'center'}}>
                                    <h1 className='title'>Litter World Cup</h1>
                                    <TypeAnimation
                                        sequence={[
                                            'Our Global Community',
                                            3500,
                                            'Our Global Impact',
                                            3500,
                                            'Our Global Progress',
                                            3500,
                                        ]}
                                        wrapper="span"
                                        speed={25}
                                        className='subtitle'
                                        repeat={Infinity}
                                    />
                                    <Row style={{paddingTop:20}}>
                                        {totals.map((item) => (
                                            <Col key={item.title}>
                                                <Card className='otherCardsOutline'>
                                                    <Card.Body className='totalOverall'>
                                                        <h4 style={{fontWeight:'bold', fontStyle:'italic', color:'#163020'}}>{item.title}</h4>
                                                        <CountUp
                                                            style={{
                                                                fontSize:65,
                                                                fontWeight:'bold',
                                                                color:'#163020'
                                                            }}
                                                            delay={0.5}
                                                            duration={5}
                                                            end={item.number}/>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='parentContainer'>
                        <Col>
                            <Card>
                                <Card.Body className='otherCards'>
                                    <h3 style={{fontWeight: 'bold'}}>Litter Target</h3>
                                    <hr/>
                                    <Card>
                                        <p style={{
                                            fontSize: 50,
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                            color: '#163020'
                                        }}>{numberWithCommas(targetValue)}</p>
                                    </Card>
                                    <hr/>
                                    <h5 style={{fontWeight: 'bold'}}>Current Progress</h5>
                                    <Card>
                                        <Card.Body>
                                            <ProgressBar
                                                now={progressPercentage}
                                                variant='success'
                                                label={`${progressPercentage}%`}
                                                style={{height: 30}}
                                                animated='true'
                                            />
                                            <p>Previous Target: {numberWithCommas(previousTarget)}</p>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body className='otherCards'>
                                    <Row>
                                        <Col>
                                            <h3 style={{fontWeight: 'bold'}}>Leaderboards</h3>
                                            <hr/>
                                            <Stack gap={3}>
                                                {topCountries.map((item) => (
                                                    <div key={item.number}>
                                                        <Card>
                                                            <p>{item.country}</p>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </Stack>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-end">
                                            <Button style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor:'#163020',
                                                borderColor:'#163020'
                                            }}>
                                                <p style={{ margin: '0', paddingRight: '10px' }}>Leaderboards</p>
                                                <ArrowForwardOutline
                                                    color={'#00000'}
                                                    title='arrow'
                                                    height="20px"
                                                    width="20px"
                                                />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
