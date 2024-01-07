import {Col, Container, Row, Table} from "react-bootstrap";
import {LineChart} from "@mui/x-charts/LineChart";
import React from "react";
import getCountryFlag from "./getCountryFlag.jsx";
import Stack from "react-bootstrap/Stack";
import {CompactTable} from "@table-library/react-table-library/compact";
import CountryGraphOverlay from "./CountryGraphOverlay.jsx";
import { useSort} from "@table-library/react-table-library/sort";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined.js";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined.js";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined.js";

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
];

const COLUMNS = [
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
    { label: 'Last Updated', renderCell: (item) => item.dateCreated, sort: { sortKey: "LASTUPDATED" },},
];


const TotalLitterData = (country) => {
    const data = { nodes };

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
        <Container>
            <Row>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={700}
                    height={400}
                />
            </Row>
            <Row>
                <Col>
                    <div>
                        <CompactTable columns={COLUMNS} data={data} sort={sort}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TotalLitterData