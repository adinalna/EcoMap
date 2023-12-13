import React from 'react';
import { Button, Navbar, Nav, Container, NavDropdown, Row } from 'react-bootstrap';

export default function CustomNavbar({ user, token }) {

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#" className="ms-2">EcoMap</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto ms-2 my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="me-2" href="/about">About</Nav.Link>
            <Nav.Link className="me-2" href="/cleanup">Cleanup</Nav.Link>
            <Nav.Link className="me-2" href="/leaderboard">Leaderboards</Nav.Link>
            <Nav.Link className="me-2" href="/global">Global Map</Nav.Link>
            <Nav.Link className="me-2" href="/world">World Cup</Nav.Link>
            <Nav.Link className="me-2" href="/leaderboard">Leaderboards</Nav.Link>
            <Nav.Link className="me-2" href="/community">Community</Nav.Link>
            <Nav.Link className="me-2" href="/Login">Login</Nav.Link>
            <Nav.Link className="me-2" href="/signup">Signup</Nav.Link>
            <Nav.Link className="me-2" href="/upload">Upload</Nav.Link>
            <Row className="d-flex flex-row align-items-center">
              <NavDropdown title="More" className="me-2">
                <NavDropdown.Item href="/tag">Tag Litter</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/teams">Teams</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item href="/language">Language</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};