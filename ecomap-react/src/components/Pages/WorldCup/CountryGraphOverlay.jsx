import React, { useState, useRef } from 'react';
import {Table, Container, Row, Col, Nav, Modal, Button} from 'react-bootstrap'
import TotalLitterData from "./TotalLitterData.jsx";
import LitterTypeData from "./LitterTypeData.jsx";
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
const CountryGraphOverlay = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        console.log(props.name)
        setShow(true)
    };

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
                    <div style={{paddingRight:20}}>
                        <Modal.Title style={{fontWeight: 'bold', fontSize: 35,}}>
                            <div style={{height: 40, width: 60}}>
                                {getCountryFlag(props.name)}
                            </div>
                        </Modal.Title>
                    </div>
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
                    </Nav>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                {activeKey === 'totalLitterData' && <TotalLitterData id={props.id} />}
                                {activeKey === 'totalTypeData' && <LitterTypeData id={props.id}/>}
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