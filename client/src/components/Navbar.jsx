import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const NavigationBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
          <span className="text-warning">Trip</span>Sync
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/hotels" className="mx-2">Hotels</Nav.Link>
            <Nav.Link as={Link} to="/cabs" className="mx-2">Cabs</Nav.Link>
            <Nav.Link as={Link} to="/guides" className="mx-2">Travel Guides</Nav.Link>
            <Nav.Link as={Link} to="/packages" className="mx-2">Travel Packages</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">Contact</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/bookings" className="mx-2">My Bookings</Nav.Link>
                <Button
                  variant="outline-warning"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn btn-warning ms-2 text-dark">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
