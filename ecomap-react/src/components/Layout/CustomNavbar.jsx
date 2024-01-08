import React from 'react';
import { Button, Navbar, Nav, Container, NavDropdown, Row } from 'react-bootstrap';
import EcoMapLogo from '/ecomap.svg';

export default function CustomNavbar({ user, token }) {

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#" className="ms-2">
          <img
            alt="EcoMap Logo"
            src={EcoMapLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {" EcoMap"}
        </Navbar.Brand>
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
            <Nav.Link className="me-2" href="/worldcup">World Cup</Nav.Link>
            <Nav.Link className="me-2" href="/community">Community</Nav.Link>
            <Nav.Link className="me-2" href="/Login">Login</Nav.Link>
            <Nav.Link className="me-2" href="/signup">Signup</Nav.Link>
            <Nav.Link className="me-2" href="/upload">Upload</Nav.Link>
            <Nav.Link className="me-2" href="/tag">Tag Litter</Nav.Link>
            <Nav.Link className="me-2" href="/gallery">Gallery</Nav.Link>
            <Row className="d-flex flex-row align-items-center">
              <NavDropdown align="end" title="More" className="me-2">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/createTeam">Create Team</NavDropdown.Item>
                <NavDropdown.Item href="/joinTeam">Join Team</NavDropdown.Item>
                <NavDropdown.Item href="/myTeam">My Team</NavDropdown.Item>
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
