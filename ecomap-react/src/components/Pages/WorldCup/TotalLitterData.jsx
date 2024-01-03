import {Col, Container, Row, Table} from "react-bootstrap";
import {LineChart} from "@mui/x-charts/LineChart";
import React from "react";
import getCountryFlag from "./getCountryFlag.jsx";
import Stack from "react-bootstrap/Stack";

const TotalLitterData = () => {
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
                    <Table responsive='lg' hover bordered className='leaderBoardTable'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>Total Litter</th>
                            <th>Avg. Litter/Person</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Stack direction='horizontal' gap={3}>
                                    <div style={{height: 30, width: 45}}>
                                        {getCountryFlag('Kazakhstan')}
                                    </div>
                                    <div>
                                        Kazakhstan
                                    </div>
                                </Stack>
                            </td>
                            <td>1000000</td>
                            <td>1000</td>
                        </tr>

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default TotalLitterData