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

const nodes = [
    {
        rank: 1,
        country: "Netherlands",
        totalLitter: "10000000",
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
        totalLitter: "900000",
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
        totalLitter: "800000",
        avgLitterPerPerson: "1331213",
        avgImagePerPerson: "1297",
        totalContributors: "6",
        lastUpdated: "Date",
        totalPhotos: "132131",
        dateCreated: 'DMY',
        createdBy: "Izzat"
    },
    {
        rank: 4,
        country: "United States",
        totalLitter: "10000",
        avgLitterPerPerson: "331213",
        avgImagePerPerson: "1287",
        totalContributors: "668",
        lastUpdated: "Date",
        totalPhotos: "12131",
        dateCreated: 'DMY',
        createdBy: "Izzat"
    },
    {
        rank: 5,
        country: "Morocco",
        totalLitter: "100000",
        avgLitterPerPerson: "1231213",
        avgImagePerPerson: "12987",
        totalContributors: "6876",
        lastUpdated: "Date",
        totalPhotos: "122131",
        dateCreated: 'DMY',
        createdBy: "Izzat"
    },
    {
        rank: 6,
        country: "Zimbabwe",
        totalLitter: "1000999000",
        avgLitterPerPerson: "1238991213",
        avgImagePerPerson: "129387",
        totalContributors: "696",
        lastUpdated: "Date",
        totalPhotos: "12392131",
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
];

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
    { label: 'Avg. Litter/Person', renderCell: (item) => item.avgLitterPerPerson, sort: { sortKey: "AVGLITTER" }, },
    { label: 'Total Contributors', renderCell: (item) => item.totalContributors, sort: { sortKey: "TOTALCONTRIBUTORS" }, },
    { label: 'Last Updated', renderCell: (item) => item.dateCreated, sort: { sortKey: "LASTUPDATED" },},
    { label: 'Data', renderCell: (item) => (
            <CountryGraphOverlay/>
        ) },
];

function WorldCupLeaderboards() {
    const [selectedTime, setSelectedTime] = useState('Frequency');
    const [selectedFilter, setSelectedFilter] = useState('Filters');
    const [selectedSort, setSelectedSort] = useState('Sort');

    const data = { nodes };

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
                    array.sort((a, b) => (a.rank || []).length - (b.rank || []).length),
                COUNTRY: (array) => array.sort((a, b) => a.country.localeCompare(b.country)),
                TOTALLITTER: (array) =>
                    array.sort((a, b) => (a.totalLitter || []).length - (b.totalLitter || []).length),
                AVGLITTER: (array) =>
                    array.sort((a, b) => (a.avgLitterPerPerson || []).length - (b.avgLitterPerPerson || []).length),
                TOTALCONTRIBUTORS: (array) =>
                    array.sort((a, b) => (a.totalContributors || []).length - (b.totalContributors || []).length),
                LASTUPDATED: (array) => array.sort((a, b) => a.dateCreated.localeCompare(b.type)),
            },
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }

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
                                        <Button variant='success'>See All</Button>
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