import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {

	const [menuOpen, setMenuOpen] = useState(false)

	const handleClose = () => setMenuOpen(false)

	const toggleMenu = () => {

		if (window.innerWidth < 768) {
			setMenuOpen(!menuOpen)
		}
	}

	return (
		<Navbar bg="dark" variant="dark" expand='md' className="mb-3">
			<Container fluid>
				<Navbar.Brand href="#">The Star Wars Encyclopedia</Navbar.Brand>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={toggleMenu} />
				<Navbar.Offcanvas
					aria-labelledby={`offcanvasNavbarLabel-expand-md`}
					placement="end"
					show={menuOpen}
					onHide={handleClose}
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>
							The Star Wars Encyclopedia
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link as={NavLink} to="/" onClick={toggleMenu}>Home</Nav.Link>
							<Nav.Link as={NavLink} to="/films/?page=1" onClick={toggleMenu}>Films</Nav.Link>
							<Nav.Link as={NavLink} to="/people/?page=1" onClick={toggleMenu}>People</Nav.Link>
							<Nav.Link as={NavLink} to="/planets" onClick={toggleMenu}>Planets</Nav.Link>
							<Nav.Link as={NavLink} to="/species" onClick={toggleMenu}>Species</Nav.Link>
							<Nav.Link as={NavLink} to="/starships" onClick={toggleMenu}>Starships</Nav.Link>
							<Nav.Link as={NavLink} to="/vechicles" onClick={toggleMenu}>Vechicles</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default Navigation
