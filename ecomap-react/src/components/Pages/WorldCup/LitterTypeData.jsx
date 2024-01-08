import React, {useEffect, useState} from "react";
import {Col, Container, Row, Stack} from "react-bootstrap";
import {CompactTable} from "@table-library/react-table-library/compact";
import {useSort} from "@table-library/react-table-library/sort";
import {PieChart} from "@mui/x-charts/PieChart";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined.js";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined.js";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined.js";
import axios from "axios";
import {useTheme} from "@table-library/react-table-library/theme";

const LitterTypeData = (props) => {
    const [countryLitterData,setCountryLitterData] = useState([])
    const [litterTypeData, setLitterTypeData] = useState([]);
    const nodes = props.nodes;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/litter/country/${props.id}`);
                setCountryLitterData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const litterTypeAggregation = {};
        nodes.forEach(country => {
            Object.entries(country.litterType).forEach(([type, details]) => {
                litterTypeAggregation[type] = (litterTypeAggregation[type] || 0) + details.numberOfLitterType;
            });
        });

        const sortedLitterTypeData = Object.entries(litterTypeAggregation)
            .map(([type, count], index) => ({ type, count }))
            .sort((a, b) => b.count - a.count)
            .map((item, index) => ({ ...item, rank: index + 1 }));

        const totalCount = sortedLitterTypeData.reduce((sum, item) => sum + item.count, 0);

        const updatedLitterTypeData = sortedLitterTypeData.map(item => ({
            ...item,
            percentage: (item.count / totalCount * 100).toFixed(2) // calculate percentage
        }));


        fetchData();
        setLitterTypeData(updatedLitterTypeData);
    }, [props.name]);


    const pieChartData = litterTypeData.map(item => ({
        id: item.rank, // or some other unique identifier
        value: item.count,
        label: item.type
    }));



    const COLUMNS = [
        { label: 'Rank', renderCell: (item) => item.rank, sort: { sortKey: "RANK" }, },
        { label: 'Litter Type', renderCell: (item) => item.type, sort: { sortKey: "LITTERTYPES" }, },
        { label: 'Total Number', renderCell: (item) => item.count },
        { label: 'Percentage', renderCell: (item) => `${item.percentage}%` },
    ];

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
            sortFns: {
                RANK: (array) =>
                    array.sort((a, b) => (a.rank || []).length - (b.rank || []).length),
                LITTERTYPES: (array) => array.sort((a, b) => a.type.localeCompare(b.country)),
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
                            data: pieChartData,
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
                        <CompactTable
                            columns={COLUMNS}
                            data={{ nodes: litterTypeData }}
                            sort={sort}
                            theme={theme}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LitterTypeData