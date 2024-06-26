import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
		<Navbar variant="dark" expand='md' className="mb-3" sticky='top'>
			<Container fluid>
				<Navbar.Brand as={Link} to="/">The Star Wars Encyclopedia</Navbar.Brand>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={toggleMenu} />
				<Navbar.Offcanvas
					aria-labelledby={`offcanvasNavbarLabel-expand-md`}
					placement="end"
					show={menuOpen}
					onHide={handleClose}
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id='canvas-title'>
							The Star Wars Encyclopedia
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link as={NavLink} to="/" onClick={toggleMenu}>Home</Nav.Link>
							<Nav.Link as={NavLink} to="/films/?page=1" onClick={toggleMenu}>Films</Nav.Link>
							<Nav.Link as={NavLink} to="/people/?page=1" onClick={toggleMenu}>Characters</Nav.Link>
							<Nav.Link as={NavLink} to="/planets/?page=1" onClick={toggleMenu}>Planets</Nav.Link>
							<Nav.Link as={NavLink} to="/species/?page=1" onClick={toggleMenu}>Species</Nav.Link>
							<Nav.Link as={NavLink} to="/starships/?page=1" onClick={toggleMenu}>Starships</Nav.Link>
							<Nav.Link as={NavLink} to="/vehicles/?page=1" onClick={toggleMenu}>Vehicles</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default Navigation
