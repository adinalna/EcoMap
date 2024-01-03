import React, { useState, useRef } from 'react';
import {Table, Container, Row, Col, Nav, Modal, Button} from 'react-bootstrap'
import TotalLitterData from "./TotalLitterData.jsx";
import LitterTypeData from "./LitterTypeData.jsx";
import ContributorsData from "./ContributorsData.jsx";

const CountryGraphOverlay = (data) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [activeKey, setActiveKey] = useState('totalLitterData');

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };

    return (
        <div >
            <Button variant="success" onClick={handleShow}>
                Details
            </Button>
            <Modal
                size="xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
                fullscreen
            >
                <Modal.Header closeButton>
                    <Modal.Title>Country Litter Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Nav
                                    variant="underline"
                                    defaultActiveKey="totalLitterData"
                                    activeKey={activeKey}
                                    onSelect={handleSelect}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="totalLitterData" style={{color:"black"}}>
                                            Total Litter
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="totalTypeData" style={{color:"black"}}>
                                            Litter Type
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="contributorsData" style={{color:"black"}}>
                                            Contributors
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                {activeKey === 'totalLitterData' && <TotalLitterData />}
                                {activeKey === 'totalTypeData' && <LitterTypeData />}
                                {activeKey === 'contributorsData' && <ContributorsData />}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CountryGraphOverlay