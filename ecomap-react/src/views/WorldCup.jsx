import React, { useEffect, useState } from 'react';
import {TypeAnimation} from "react-type-animation";
import {Button, Card, Col, Container, ProgressBar, Row, Stack, Badge, Spinner} from "react-bootstrap";
import { ArrowForwardOutline} from "react-ionicons";
import CountUp from "react-countup";
import getCountryFlag from "../components/Pages/WorldCup/getCountryFlag.jsx";
import {LinearProgress, Typography} from "@mui/joy";
import { useCountUp } from 'use-count-up';
import axios from "axios";


export default function WorldCup() {
    const [targetValue, setTargetValue] = useState(100);
    const [previousTarget, setPreviousTarget] = useState(10);
    const [totalLitter,setTotalLitter] = useState(0);
    const [totalPhotos,setTotalPhotos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [topThreeCountries,setTopThreeCountries] = useState([]);

    const progressPercentage = parseFloat((totalLitter / targetValue * 100).toFixed(2));

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const litterResponse = await axios.get(`http://localhost:8080/api/litter/all`);
                setTotalLitter(litterResponse.data.length);
                console.log(litterResponse.data)
                setTotalPhotos(litterResponse.data.length);
                const countryResponse = await axios.get(`http://localhost:8080/api/litter/countries/top/3`);
                setTopThreeCountries(countryResponse.data);
                console.log(countryResponse.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const LoadingPlaceholder = () => (
        <div>
            <Stack direction='horizontal' gap={2} style={{justifyContent:"center"}}>
                <Card style={{width:180}}>
                    <Card.Body>
                        <Spinner animation="border" variant="success" />
                    </Card.Body>
                </Card>
            </Stack>
        </div>
    );

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
                                        <Col>
                                            <Card className='otherCardsOutline'>
                                                <Card.Body className='totalOverall'>
                                                    <h4 style={{fontWeight:'bold', fontStyle:'italic', color:'#163020'}}>Total Litter</h4>
                                                    <CountUp
                                                        style={{
                                                            fontSize:65,
                                                            fontWeight:'bold',
                                                            color:'#163020'
                                                        }}
                                                        delay={0.5}
                                                        duration={5}
                                                        end={totalLitter}/>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card className='otherCardsOutline'>
                                                <Card.Body className='totalOverall'>
                                                    <h4 style={{fontWeight:'bold', fontStyle:'italic', color:'#163020'}}>Total Photos</h4>
                                                    <CountUp
                                                        style={{
                                                            fontSize:65,
                                                            fontWeight:'bold',
                                                            color:'#163020'
                                                        }}
                                                        delay={0.5}
                                                        duration={5}
                                                        end={totalPhotos}/>
                                                </Card.Body>
                                            </Card>
                                        </Col>
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
                                            {isLoading ? (
                                                <LoadingPlaceholder />
                                            ) : (
                                            <Stack direction='horizontal' gap={2} style={{justifyContent:"center"}}>
                                                {topThreeCountries.map((item,index) => (
                                                    <div key={item.countryId}>
                                                        <Card style={{width:180}}>
                                                            <Card.Header style={{fontStyle:"italic", fontWeight:"bolder",fontSize:20}}>{index + 1}</Card.Header>
                                                            <Card.Title>{getCountryFlag(item.countryName)}</Card.Title>
                                                            <Card.Title style={{fontSize:22, fontWeight:"bold",paddingTop:10}}>{item.countryName}</Card.Title>
                                                            <Card.Body>
                                                                Total Litter:
                                                                <h3>
                                                                    {item.litterCount}
                                                                </h3>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </Stack>
                                            )}
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
