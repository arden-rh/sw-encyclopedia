import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {

	return (
		<Navbar bg="dark" variant="dark" expand='md' className="mb-3">
			<Container fluid>
				<Navbar.Brand href="#">The Star Wars Wiki</Navbar.Brand>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
				<Navbar.Offcanvas
					aria-labelledby={`offcanvasNavbarLabel-expand-md`}
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>
							The Star Wars Wiki - Resources
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link as={NavLink} to="/">Home</Nav.Link>
							<Nav.Link as={NavLink} to="/films">Films</Nav.Link>
							<Nav.Link as={NavLink} to="/people">People</Nav.Link>
							<Nav.Link as={NavLink} to="/planets">Planets</Nav.Link>
							<Nav.Link as={NavLink} to="/species">Species</Nav.Link>
							<Nav.Link as={NavLink} to="/starships">Starships</Nav.Link>
							<Nav.Link as={NavLink} to="/vechicles">Vechicles</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default Navigation
