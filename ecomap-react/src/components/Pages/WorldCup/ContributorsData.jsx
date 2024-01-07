import {Col, Container, Row, Table} from "react-bootstrap";
import { BarChart } from '@mui/x-charts/BarChart';
import React from "react";

const chartSetting = {
    xAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 500,
    height: 400,
};

const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        seoul: 21,
        month: 'Jan',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        seoul: 28,
        month: 'Fev',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        seoul: 41,
        month: 'Mar',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        seoul: 73,
        month: 'Apr',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        seoul: 99,
        month: 'May',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        seoul: 144,
        month: 'June',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        seoul: 319,
        month: 'July',
    },
    {
        london: 65,
        paris: 60,
        newYork: 106,
        seoul: 249,
        month: 'Aug',
    },
    {
        london: 51,
        paris: 51,
        newYork: 95,
        seoul: 131,
        month: 'Sept',
    },
    {
        london: 60,
        paris: 65,
        newYork: 97,
        seoul: 55,
        month: 'Oct',
    },
    {
        london: 67,
        paris: 64,
        newYork: 76,
        seoul: 48,
        month: 'Nov',
    },
    {
        london: 61,
        paris: 70,
        newYork: 103,
        seoul: 25,
        month: 'Dec',
    },
];

const valueFormatter = (value) => `${value}mm`;

const ContributorsData = () => {

    return (
        <Container>
            <Row>
                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[{ dataKey: 'seoul', label: 'Litter', valueFormatter }]}
                    layout="horizontal"
                    width={600}
                    height={400}
                />
            </Row>
            <Row>
                <Col>
                    <Table responsive='lg' hover bordered className='leaderBoardTable'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Contributor</th>
                            <th>Total Litter Tagged</th>
                            <th>Last Updated</th>
                            <th>Number of Updates</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Abdul</td>
                            <td>10000</td>
                            <td>10 May 2024</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Abdul</td>
                            <td>10000</td>
                            <td>10 May 2024</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Abdul</td>
                            <td>10000</td>
                            <td>10 May 2024</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Abdul</td>
                            <td>10000</td>
                            <td>10 May 2024</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Abdul</td>
                            <td>10000</td>
                            <td>10 May 2024</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Abdul</td>
                            <td>10000</td>
                            <td>10 May 2024</td>
                            <td>5</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default ContributorsData