import React from 'react' 
import {Navbar, Nav, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand><Link to="/" style={{textDecoration: 'none', color: 'white'}}><i className="fas fa-code"></i>  Dev Connector</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto">
      <Nav.Link><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Portfolio</Link></Nav.Link>
      <Nav.Link><Link to="/register" style={{textDecoration: 'none', color: 'white'}}>Register</Link></Nav.Link>
      <Nav.Link><Link to="/login" style={{textDecoration: 'none', color: 'white'}}>Login</Link></Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
