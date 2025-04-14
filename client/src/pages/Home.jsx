import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Hero from '../components/Hero';
import HotelCard from '../components/HotelCard';
import CabCard from '../components/CabCard';
import { hotelService, cabService } from '../services/api';

const Home = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [featuredCabs, setFeaturedCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would have endpoints for featured items
        // For now, we'll just get all and take the first few
        const [hotelsResponse, cabsResponse] = await Promise.all([
          hotelService.getAllHotels(),
          cabService.getAllCabs()
        ]);
        
        setFeaturedHotels(hotelsResponse.data.slice(0, 3));
        setFeaturedCabs(cabsResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured items:', error);
        // Use dummy data for now
        setFeaturedHotels([
          {
            id: 1,
            name: 'Luxury Resort & Spa',
            location: 'Maldives',
            description: 'Experience luxury like never before with our beachfront resort offering stunning views and world-class amenities.',
            price_per_night: 299,
            rating: 4.8
          },
          {
            id: 2,
            name: 'Mountain View Lodge',
            location: 'Switzerland',
            description: 'Nestled in the heart of the Alps, our lodge offers breathtaking mountain views and cozy accommodations.',
            price_per_night: 199,
            rating: 4.6
          },
          {
            id: 3,
            name: 'Urban Boutique Hotel',
            location: 'New York',
            description: 'Located in the heart of Manhattan, our boutique hotel offers modern amenities with easy access to major attractions.',
            price_per_night: 249,
            rating: 4.5
          }
        ]);
        
        setFeaturedCabs([
          {
            id: 1,
            type: 'Luxury Sedan',
            capacity: 4,
            price_per_km: 2.5
          },
          {
            id: 2,
            type: 'SUV',
            capacity: 6,
            price_per_km: 3.0
          },
          {
            id: 3,
            type: 'Minivan',
            capacity: 8,
            price_per_km: 3.5
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <Hero />
      
      {/* Featured Hotels Section */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Featured Hotels</h2>
            <p className="text-muted">Discover our handpicked selection of the finest hotels</p>
          </Col>
          <Col xs="auto" className="align-self-center">
            <Button variant="outline-primary" href="/hotels">View All</Button>
          </Col>
        </Row>
        
        <Row>
          {featuredHotels.map(hotel => (
            <Col key={hotel.id} md={6} lg={4} className="mb-4">
              <HotelCard hotel={hotel} />
            </Col>
          ))}
        </Row>
      </Container>
      
      {/* Why Choose Us Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h2 className="fw-bold">Why Choose TripSync</h2>
              <p className="text-muted">We offer the best travel experience with our unique features</p>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card className="border-0 bg-transparent text-center h-100">
                <div className="icon-box mx-auto mb-4 d-flex align-items-center justify-content-center bg-primary rounded-circle" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-piggy-bank text-white fs-3"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Best Price Guarantee</Card.Title>
                  <Card.Text className="text-muted">
                    We compare prices from multiple websites to ensure you get the best deals on hotels and cabs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="border-0 bg-transparent text-center h-100">
                <div className="icon-box mx-auto mb-4 d-flex align-items-center justify-content-center bg-warning rounded-circle" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-shield-check text-white fs-3"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Secure Booking</Card.Title>
                  <Card.Text className="text-muted">
                    Your personal and payment information is protected with industry-standard encryption.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="border-0 bg-transparent text-center h-100">
                <div className="icon-box mx-auto mb-4 d-flex align-items-center justify-content-center bg-success rounded-circle" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-headset text-white fs-3"></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">24/7 Customer Support</Card.Title>
                  <Card.Text className="text-muted">
                    Our dedicated support team is available round the clock to assist you with any queries.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Featured Cabs Section */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Featured Cabs</h2>
            <p className="text-muted">Choose from our wide range of comfortable and reliable cabs</p>
          </Col>
          <Col xs="auto" className="align-self-center">
            <Button variant="outline-primary" href="/cabs">View All</Button>
          </Col>
        </Row>
        
        <Row>
          {featuredCabs.map(cab => (
            <Col key={cab.id} md={6} lg={4} className="mb-4">
              <CabCard cab={cab} />
            </Col>
          ))}
        </Row>
      </Container>
      
      {/* Testimonials Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h2 className="fw-bold">What Our Customers Say</h2>
              <p>Thousands of travelers trust TripSync for their travel needs</p>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card className="bg-white text-dark h-100">
                <Card.Body>
                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <Card.Text className="mb-4">
                    "TripSync made my vacation planning so easy! I found a great hotel at an amazing price, and the cab booking was seamless. Highly recommend!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <span className="fw-bold">JD</span>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">John Doe</h6>
                      <small className="text-muted">New York, USA</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="bg-white text-dark h-100">
                <Card.Body>
                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <Card.Text className="mb-4">
                    "The best prices for hotels! I compared with other websites and TripSync consistently offered better deals. Their customer service is excellent too."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <span className="fw-bold">JS</span>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Jane Smith</h6>
                      <small className="text-muted">London, UK</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="bg-white text-dark h-100">
                <Card.Body>
                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                  <Card.Text className="mb-4">
                    "I love how TripSync combines all travel services in one place. Booked my entire trip - hotel, cab, and activities - in just a few minutes. Amazing!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <span className="fw-bold">RJ</span>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Robert Johnson</h6>
                      <small className="text-muted">Sydney, Australia</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Newsletter Section */}
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2 className="fw-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted mb-4">Stay updated with our latest offers, travel tips, and exclusive deals</p>
            <div className="input-group mb-3 mx-auto" style={{ maxWidth: '500px' }}>
              <input type="email" className="form-control" placeholder="Your Email Address" />
              <Button variant="warning">Subscribe</Button>
            </div>
            <p className="small text-muted">By subscribing, you agree to our Privacy Policy and Terms of Service</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
