import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Dropdown, Row, Table} from "react-bootstrap";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Stack from 'react-bootstrap/Stack';
import {RefreshOutline} from "react-ionicons";
import getCountryFlag from "./getCountryFlag.jsx";
import CountryGraphOverlay from "./CountryGraphOverlay.jsx";
import { CompactTable } from '@table-library/react-table-library/compact';
import {SortToggleType, useSort} from "@table-library/react-table-library/sort";
import {useTheme} from "@table-library/react-table-library/theme";
import axios from "axios";

const COLUMNS = [
    { label: 'Rank', renderCell: (item) => item.rank, sort: { sortKey: "RANK" },},
    { label: 'Country', renderCell: (item) => (
            <Stack direction='horizontal' gap={3}>
                <div style={{height: 30, width: 45}}>
                    {getCountryFlag(item.country)}
                </div>
                <div>
                    {item.country}
                </div>
            </Stack>
        ),
        sort: { sortKey: "COUNTRY" },
    },
    { label: 'Total Litter', renderCell: (item) => item.totalLitter, sort: { sortKey: "TOTALLITTER" },},
    { label: 'Total Contributors', renderCell: (item) => item.userCount, sort: { sortKey: "TOTALCONTRIBUTORS" }, },
    { label: 'Data', renderCell: (item) => (<CountryGraphOverlay id={item.countryId} name={item.country}/>)},
];

function WorldCupLeaderboards() {
    const [selectedTime, setSelectedTime] = useState('Frequency');
    const [selectedFilter, setSelectedFilter] = useState('Filters');
    const [selectedSort, setSelectedSort] = useState('Sort');
    const [litterData,setLitterData] = useState([]);
    const [seeAllButtonText,setSeeAllButtonText] = useState('See All')

    const transformedData = litterData.map((item, index) => ({
        rank: index + 1,
        country: item.countryName,
        totalLitter: item.litterCount,
        userCount: item.userCount,
        countryId: item.countryId,
    }));

    const data = { nodes: transformedData };


    const theme = useTheme({
        BaseCell: ` 
        text-align: center;
        `,
    });

    const sort = useSort(
        data,
        {
            onChange: onSortChange,
        },
        {
            sortIcon: {
                margin: "0px",
                iconDefault: <UnfoldMoreOutlinedIcon fontSize="small" />,
                iconUp: <KeyboardArrowUpOutlinedIcon fontSize="small" />,
                iconDown: <KeyboardArrowDownOutlinedIcon fontSize="small" />,
            },
            sortToggleType: SortToggleType.AlternateWithReset,
            sortFns: {
                RANK: (array) =>
                    array.sort((a, b) => a.rank - b.rank),
                COUNTRY: (array) => array.sort((a, b) => a.country.localeCompare(b.country)),
                TOTALLITTER: (array) =>
                    array.sort((a, b) => a.litterCount - b.litterCount),
                TOTALCONTRIBUTORS: (array) =>
                    array.sort((c, d) => c.userCount - d.userCount),},
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }

    const handleLoadAllCountries = async () => {
        try {
            setSeeAllButtonText('Loading...');
            const response = await axios.get(
                `http://localhost:8080/api/litter/countries/all`
            );
            setLitterData(response.data);
        } catch (error) {
            setSeeAllButtonText('See All')
            console.error(
                "Error loading all country data:",
                error.response ? error.response.data : error.message
            );
        }
        setSeeAllButtonText('See All');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/litter/countries/top/5`);
                setLitterData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                        <div style={{paddingBottom:20}}>
                            <Stack direction='horizontal' gap={3} style={{justifyContent: 'flex-end'}}>
                                <div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-dark"
                                                         id="dropdown-basic">
                                            {selectedFilter}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {/*Need to determine the types of litter*/}
                                            <Dropdown.Item onClick={() => {
                                                setSelectedFilter('None')
                                            }}>Default: None</Dropdown.Item>
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
                                <div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-dark"
                                                         id="dropdown-basic">
                                            {selectedTime}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => {
                                                setSelectedTime('All Time')
                                            }}>Default: All Time</Dropdown.Item>
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
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-dark"
                                                         id="dropdown-basic">
                                            {selectedSort}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => {
                                                setSelectedSort('Most Litter Tags')
                                            }}>Default: Most Litter Tags</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                setSelectedSort('Average Litter Per Person')
                                            }}>Average Litter Per Person</Dropdown.Item>
                                            {/*<Dropdown.Item onClick={() => {
                                                setSelectedSort('Total Contributors')
                                            }}>Total Contributors</Dropdown.Item>*/}
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
                                <div>
                                    <Button variant='light'>
                                        <RefreshOutline
                                            color={'#163020'}
                                            title={'SearchIcon'}
                                            height="28px"
                                            width="28px"
                                        />
                                    </Button>
                                </div>
                            </Stack>
                        </div>
                        <Card>
                            <Card.Body className='cardOutline'>
                                <Stack direction='vertical' gap={3}>
                                    <div>
                                        <CompactTable columns={COLUMNS} data={data} sort={sort} theme={theme}/>
                                    </div>
                                    <div>
                                        <Button variant='success' onClick={() => {
                                            handleLoadAllCountries();
                                        }}>{seeAllButtonText}</Button>
                                    </div>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WorldCupLeaderboards