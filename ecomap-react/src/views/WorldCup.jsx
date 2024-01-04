import React, { useEffect, useState } from 'react';
import {TypeAnimation} from "react-type-animation";
import {Button, Card, Col, Container, ProgressBar, Row, Stack, Badge} from "react-bootstrap";
import { ArrowForwardOutline} from "react-ionicons";
import CountUp from "react-countup";
import getCountryFlag from "../components/Pages/WorldCup/getCountryFlag.jsx";
import {LinearProgress, Typography} from "@mui/joy";
import { useCountUp } from 'use-count-up';


export default function WorldCup() {
    // Litter Target Logic
    const targetValue = 1000000; // Example target
    const currentData = 752456;  // Example current data
    const previousTarget = 500000;
    // Calculate the percentage of current data towards the target
    const progressPercentage = parseFloat((currentData / targetValue * 100).toFixed(2));

    //Litter Overall Totals Logic
    const totals = [
        { title: 'Total Litter', number: '752456' },
        { title: 'Total Photos', number: '478456' },
        { title: 'Total LitterCoin', number: '5456' }
    ];

    const topCountries = [
        { number: 1, country: 'Netherlands', totalLitter: 216115 },
        { number: 2, country: 'UK', totalLitter: 145348 },
        { number: 3, country: 'USA', totalLitter: 141217 }
    ];

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [buffer, setBuffer] = React.useState(10);
    const { value } = useCountUp({
        isCounting: true,
        duration: 5,
        easing: 'linear',
        start: 0,
        end: progressPercentage,
        onComplete: () => ({
            shouldRepeat: false,
            delay: 2,
        }),
    });




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
                                    <h3 style={{fontWeight: 'bold', paddingBottom:20}}>Litter Target</h3>
                                    <Card>
                                        <CountUp
                                            style={{
                                                fontSize: 65,
                                                fontWeight: 'bold',
                                                color: '#163020'
                                            }}
                                            delay={0.5}
                                            duration={5}
                                            end={targetValue}/>
                                        <p>litters targeted to be tagged using <b>EcoMap</b></p>
                                    </Card>
                                    <br/>
                                    <hr/>
                                    <h5 style={{fontWeight: 'bold',paddingBottom:20}}>Current Progress</h5>
                                    <>
                                        <>
                                            <LinearProgress
                                                determinate
                                                variant="outlined"
                                                color="neutral"
                                                size="sm"
                                                thickness={50}
                                                value={Number(value)}
                                                sx={{
                                                    '--LinearProgress-radius': '20px',
                                                    '--LinearProgress-thickness': '50px',
                                                }}
                                            >
                                                <Typography
                                                    level="body-xs"
                                                    fontWeight="xl"
                                                    textColor="common.white"
                                                    sx={{ mixBlendMode: 'difference' }}
                                                >
                                                    {`${Math.round(Number(value))}%`}
                                                </Typography>
                                            </LinearProgress>

                                            <p style={{paddingTop:20}}>Previous Target: {numberWithCommas(previousTarget)}</p>
                                        </>
                                    </>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body className='otherCards'>
                                    <Row>
                                        <Col>
                                            <h3 style={{fontWeight: 'bold',paddingBottom:20}}>Leaderboards</h3>
                                            <Stack direction='horizontal' gap={2} style={{justifyContent:"center"}}>
                                                {topCountries.map((item) => (
                                                    <div key={item.number}>
                                                        <Card style={{width:180}}>
                                                            <Card.Header style={{fontStyle:"italic", fontWeight:"bolder",fontSize:20}}>{item.number}</Card.Header>
                                                            <Card.Title>{getCountryFlag(item.country)}</Card.Title>
                                                            <Card.Title style={{fontSize:22, fontWeight:"bold",paddingTop:10}}>{item.country}</Card.Title>
                                                            <Card.Body>
                                                                Total Litter:
                                                                <h3>
                                                                    {item.totalLitter}
                                                                </h3>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </Stack>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-end" style={{paddingTop:10}}>
                                            <Button style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor:'#163020',
                                                borderColor:'#163020'
                                            }}
                                            href='/worldCupLeaderboards'
                                            >
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
