import {Col, Container, Row, Table} from "react-bootstrap";
import {PieChart} from "@mui/x-charts/PieChart";
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';
import React from "react";

const LitterTypeData = () => {
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
                    <Table responsive='lg' hover bordered className='leaderBoardTable'>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Litter Type</th>
                            <th>Percentage (%)</th>
                            <th>Data</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Animal Waste</td>
                            <td>20</td>
                            <td>200</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default LitterTypeData