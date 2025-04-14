import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h3 className="mb-4">
              <span className="text-warning">Trip</span>
              <span className="text-primary">Sync</span>
            </h3>
            <p>
              Your one-stop solution for all travel needs. Book hotels, cabs, and more at the best prices.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/hotels" className="text-light text-decoration-none">Hotels</Link></li>
              <li className="mb-2"><Link to="/cabs" className="text-light text-decoration-none">Cabs</Link></li>
              <li className="mb-2"><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/hotels" className="text-light text-decoration-none">Hotel Booking</Link></li>
              <li className="mb-2"><Link to="/cabs" className="text-light text-decoration-none">Cab Booking</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Flight Booking</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Tour Packages</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Travel Insurance</Link></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h5 className="mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><i className="bi bi-geo-alt me-2"></i> 123 Travel Street, City</li>
              <li className="mb-2"><i className="bi bi-telephone me-2"></i> +1 (123) 456-7890</li>
              <li className="mb-2"><i className="bi bi-envelope me-2"></i> info@tripsync.com</li>
            </ul>
            <div className="mt-4">
              <h6>Subscribe to Newsletter</h6>
              <div className="input-group mt-2">
                <input type="email" className="form-control" placeholder="Your Email" />
                <button className="btn btn-warning" type="button">Subscribe</button>
              </div>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} TripSync. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
