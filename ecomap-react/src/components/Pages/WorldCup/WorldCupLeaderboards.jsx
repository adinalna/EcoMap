import {Button, Card, Col, Container, Dropdown, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Stack from 'react-bootstrap/Stack';
import {SearchOutline} from "react-ionicons";
import getCountryFlag from "./getCountryFlag.jsx";

function WorldCupLeaderboards() {
    const [selectedTime, setSelectedTime] = useState('All Time');
    const [selectedFilter, setSelectedFilter] = useState('None');
    const [selectedSort, setSelectedSort] = useState('Most Litter Tags');
    const [countryRankingData, setCountryRankingData] = useState([
        {
            rank: 1,
            country: "Netherlands",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 2,
            country: "China",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 3,
            country: "New Zealand",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 4,
            country: "United States",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 5,
            country: "Morocco",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 6,
            country: "Zimbabwe",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 7,
            country: "South Korea",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 8,
            country: "Palestine",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 9,
            country: "Hong Kong",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
        {
            rank: 10,
            country: "Taiwan",
            totalLitter: "1000000",
            avgLitterPerPerson: "12331213",
            avgImagePerPerson: "129387",
            totalContributors: "66",
            lastUpdated: "Date",
            totalPhotos: "1232131",
            dateCreated: 'DMY',
            createdBy: "Izzat"
        },
    ]);

    return (
        <div className='section'>
            <Container fluid>
                <Row style={{paddingBottom: 20}}>
                    <Col>
                        <Card style={{backgroundColor: '#163020'}}>
                            <Card.Body style={{textAlign: 'center'}} className='cardOutline'>
                                <h1 className='title'>Global Leaderboards</h1>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{paddingBottom: 20}}>
                    <Col>
                        <Card>
                            <Card.Body className='cardOutline'>
                                <Row>
                                    <Col>
                                        <Card style={{backgroundColor: '#355c44'}}>
                                            <Card.Body>
                                                <Stack direction='horizontal' gap={3}>
                                                    <div>
                                                        <p className='cardText'>Filters: </p>
                                                    </div>
                                                    <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="outline-light"
                                                                             id="dropdown-basic">
                                                                {selectedFilter}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {/*Need to determine the types of litter*/}
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('None')
                                                                }}>None</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Litter Type - Smoking')
                                                                }}>Litter Type - Smoking</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Litter Type - Food')
                                                                }}>Litter Type - Food</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Litter Type - Drinks')
                                                                }}>Litter Type - Drinks</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Litter Type - Sanitary')
                                                                }}>Litter Type - Sanitary</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Litter Type - Animal Waste')
                                                                }}>Litter Type - Animal Waste</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Litter Type - Others')
                                                                }}>Litter Type - Others</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Region - Americas')
                                                                }}>Region - Americas</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Region - Asia Pacific')
                                                                }}>Region - Asia Pacific</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Region - Europe')
                                                                }}>Region - Europe</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedFilter('Region - Middle East / Africa')
                                                                }}>Region - Middle East / Africa</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </Stack>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{backgroundColor: '#355c44'}}>
                                            <Card.Body>
                                                <Stack direction='horizontal' gap={3}>
                                                    <div>
                                                        <p className='cardText'>Sort: </p>
                                                    </div>
                                                    <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="outline-light"
                                                                             id="dropdown-basic">
                                                                {selectedSort}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('Most Litter Tags')
                                                                }}>Most Litter Tags</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('Average Litter Per Person')
                                                                }}>Average Litter Per Person</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('Total Contributors')
                                                                }}>Total Contributors</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('First Created')
                                                                }}>First Created</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('Most Recent Update')
                                                                }}>Most Recent Update</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('Alphabetical: A-Z')
                                                                }}>Alphabetical: A-Z</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedSort('Alphabetical: Z-A')
                                                                }}>Alphabetical: Z-A</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </Stack>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{backgroundColor: '#355c44'}}>
                                            <Card.Body>
                                                <Stack direction='horizontal' gap={3}>
                                                    <div>
                                                        <p className='cardText'>Time: </p>
                                                    </div>
                                                    <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="outline-light"
                                                                             id="dropdown-basic">
                                                                {selectedTime}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedTime('Today')
                                                                }}>Today</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedTime('Week')
                                                                }}>Week</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedTime('Month')
                                                                }}>Month</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedTime('Year')
                                                                }}>Year</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    setSelectedTime('All Time')
                                                                }}>All Time</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </Stack>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col style={{width:10}}>
                                        <Card style={{backgroundColor: '#355c44'}}>
                                            <Card.Body>
                                                <Button variant='light'>
                                                    <SearchOutline
                                                        color={'#163020'}
                                                        title={'SearchIcon'}
                                                        height="28px"
                                                        width="28px"
                                                    />
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <Row style={{paddingBottom: 20}}>
                    <Col>
                        <Card>
                            <Card.Body className='cardOutline'>
                                <Table responsive='lg' hover  className='leaderBoardTable'>
                                    <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Country</th>
                                        <th>Total Litter</th>
                                        <th>Avg. Litter/Person</th>
                                        <th>Total Contributors</th>
                                        <th>Last Updated</th>
                                        <th>Data</th>
                                    </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                    {countryRankingData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.rank}</td>
                                        <td>
                                            <Stack direction='horizontal' gap={3}>
                                                <div style={{height: 30, width: 45}}>
                                                    {getCountryFlag(data.country)}
                                                </div>
                                                <div>
                                                    {data.country}
                                                </div>
                                            </Stack>
                                        </td>
                                        <td>{data.totalLitter}</td>
                                        <td>{data.avgLitterPerPerson}</td>
                                        <td>{data.totalContributors}</td>
                                        <td>{data.lastUpdated}</td>
                                        <td>
                                            <Button>Details</Button>
                                        </td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <Button variant='success'>See All Ranks</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WorldCupLeaderboards