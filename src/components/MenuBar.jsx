import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const MenuBar = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <LinkContainer to="/">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">LoLCamp</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </LinkContainer>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/sign_in">
            <NavItem eventKey={1}>Sign In</NavItem>
          </LinkContainer>
          <LinkContainer to="/register">
            <NavItem eventKey={2}>Register</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MenuBar