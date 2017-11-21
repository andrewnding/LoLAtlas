import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const MenuBar = () => {
  return (
    <Navbar collapseOnSelect>
      <LinkContainer to="/">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">LoLAtlas</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </LinkContainer>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to="/about">
            <NavItem eventKey={1}>About</NavItem>
          </LinkContainer>
          <LinkContainer to="/contact">
            <NavItem eventKey={2}>Contact</NavItem>
          </LinkContainer>
          <LinkContainer to="/privacy-policy">
            <NavItem eventKey={2}>Privacy Policy</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MenuBar