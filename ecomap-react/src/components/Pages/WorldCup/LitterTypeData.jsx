import React from "react";
import {Col, Container, Row, Stack} from "react-bootstrap";
import {CompactTable} from "@table-library/react-table-library/compact";
import {useSort} from "@table-library/react-table-library/sort";
import {PieChart} from "@mui/x-charts/PieChart";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined.js";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined.js";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined.js";
import getCountryFlag from "./getCountryFlag.jsx";

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
    { label: 'Rank', renderCell: (item) => item.rank, sort: { sortKey: "RANK" },},
    { label: 'Litter Type', renderCell: (item) => (
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
    { label: 'Percentage', renderCell: (item) => item.totalLitter, sort: { sortKey: "TOTALLITTER" },},
    { label: 'Total Litter', renderCell: (item) => item.avgLitterPerPerson, sort: { sortKey: "AVGLITTER" }, },
];
const LitterTypeData = () => {
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
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10.25, label: 'A'},
                                { id: 1, value: 9.75, label: 'B'},
                                { id: 2, value: 30, label: 'C'},
                                { id: 3, value: 20, label: 'D'},
                                { id: 4, value: 10, label: 'E'},
                                { id: 5, value: 20, label: 'Others' },
                            ],
                            innerRadius: 37,
                            outerRadius: 147,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 360,
                            cx: 150,
                            cy: 150,
                        }]
                    }
                    width={600}
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

export default LitterTypeData