import React, { useState, useRef } from 'react';
import {Table, Container, Row, Col, Nav, Modal, Button} from 'react-bootstrap'
import TotalLitterData from "./TotalLitterData.jsx";
import LitterTypeData from "./LitterTypeData.jsx";
import getCountryFlag from "./getCountryFlag.jsx";

const nodes1 = [
    {
        litterType: {
            'alcohol': {
                numberOfLitterType: 2
            },
            'art': {
                numberOfLitterType: 3
            },
            'coffee': {
                numberOfLitterType: 1
            },
            'food': {
                numberOfLitterType: 2
            },
            'smoking': {
                numberOfLitterType: 1
            },
            'pets': {
                numberOfLitterType: 1
            },
        }
    },
];
const nodes2 = [
    {
        litterType: {
            'sanitary': {
                numberOfLitterType: 2
            },
            'pets': {
                numberOfLitterType: 3
            },
            'coffee': {
                numberOfLitterType: 1
            },
            'food': {
                numberOfLitterType: 2
            },
            'smoking': {
                numberOfLitterType: 1
            },
            'coastal': {
                numberOfLitterType: 1
            },
        }
    },
];
const nodes3 = [
    {
        litterType: {
            'alcohol': {
                numberOfLitterType: 2
            },
            'dumping': {
                numberOfLitterType: 3
            },
            'coffee': {
                numberOfLitterType: 1
            },
            'food': {
                numberOfLitterType: 2
            },
            'smoking': {
                numberOfLitterType: 1
            },
            'soft drinks': {
                numberOfLitterType: 1
            },
        }
    },
];
const nodes4 = [
    {
        litterType: {
            'alcohol': {
                numberOfLitterType: 2
            },
            'coffee': {
                numberOfLitterType: 2
            },
            'food': {
                numberOfLitterType: 3
            },
            'pets': {
                numberOfLitterType: 1
            },
        }
    }
];
const nodes5 = [
    {
        litterType: {
            'art': {
                numberOfLitterType: 3
            },
            'coffee': {
                numberOfLitterType: 1
            },
            'food': {
                numberOfLitterType: 3
            },
            'smoking': {
                numberOfLitterType: 2
            },
            'pets': {
                numberOfLitterType: 1
            },
        }
    }
];
const nodes6 = [
    {
        litterType: {
            'alcohol': {
                numberOfLitterType: 1
            },
            'smoking': {
                numberOfLitterType: 1
            }
        }
    }
];

const CountryGraphOverlay = (props) => {
    const [show, setShow] = useState(false);
    const [nodes, setNodes] = useState([])

    const handleClose = () => setShow(false);

    const handleShow = () => {
        switch (props.name){
            case 'Malaysia':
                setNodes(nodes1);
                break;
            case 'Myanmar':
                setNodes(nodes2);
                break;
            case 'Norway':
                setNodes(nodes3);
                break;
            case 'United Kingdom':
                setNodes(nodes4);
                break;
            case 'Sweden':
                setNodes(nodes5);
                break;
            case 'South Africa':
                setNodes(nodes6);
                break;
        }
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
                        defaultActiveKey="totalTypeData"
                        activeKey={activeKey}
                        onSelect={handleSelect}
                    >
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
                                <LitterTypeData id={props.id} nodes={nodes}/>
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