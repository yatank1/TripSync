import { useState } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [key, setKey] = useState('hotels');
  // Hotel search
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  // Cab search
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  // Guide search
  const [guideLocation, setGuideLocation] = useState('');
  const [guideExpertise, setGuideExpertise] = useState('');
  const [guideLanguage, setGuideLanguage] = useState('');
  // Package search
  const [packageDestination, setPackageDestination] = useState('');
  const [packageDuration, setPackageDuration] = useState('');

  const navigate = useNavigate();

  const handleHotelSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const handleCabSearch = (e) => {
    e.preventDefault();
    navigate(`/cabs?pickup=${pickupLocation}&dropoff=${dropoffLocation}&date=${date}&time=${time}&passengers=${passengers}`);
  };

  const handleGuideSearch = (e) => {
    e.preventDefault();
    navigate(`/guides?location=${guideLocation}&expertise=${guideExpertise}&languages=${guideLanguage}`);
  };

  const handlePackageSearch = (e) => {
    e.preventDefault();
    navigate(`/packages?destination=${packageDestination}&duration=${packageDuration}`);
  };

  return (
    <div className="hero-section position-relative">
      {/* Background image with overlay */}
      <div
        className="hero-bg position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      >
        <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      </div>

      <Container className="py-5">
        <Row className="py-5">
          <Col lg={6} className="text-white py-5">
            <h1 className="display-3 fw-bold mb-4">
              Discover the World with <span className="text-warning">Trip</span><span className="text-primary">Sync</span>
            </h1>
            <p className="lead mb-4">
              Book hotels, cabs, and more at the best prices. Your one-stop solution for all travel needs.
            </p>
            <Button variant="warning" size="lg" className="me-3">Explore Now</Button>
            <Button variant="outline-light" size="lg">Learn More</Button>
          </Col>

          <Col lg={6} className="mt-5 mt-lg-0">
            <div className="search-box bg-white p-4 rounded shadow">
              <Tabs
                id="search-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-4"
              >
                <Tab eventKey="hotels" title="Hotels">
                  <Form onSubmit={handleHotelSearch}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Where are you going?"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Check-in</Form.Label>
                          <Form.Control
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Check-out</Form.Label>
                          <Form.Control
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Guests</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2">
                      Search Hotels
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="cabs" title="Cabs">
                  <Form onSubmit={handleCabSearch}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pickup Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pickup location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Dropoff Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter dropoff location"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Time</Form.Label>
                          <Form.Control
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Passengers</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2">
                      Search Cabs
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="guides" title="Travel Guides">
                  <Form onSubmit={handleGuideSearch}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Where do you need a guide?"
                        value={guideLocation}
                        onChange={(e) => setGuideLocation(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Expertise</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. History, Food, Adventure"
                        value={guideExpertise}
                        onChange={(e) => setGuideExpertise(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Languages</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. English, Spanish"
                        value={guideLanguage}
                        onChange={(e) => setGuideLanguage(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2">
                      Find Travel Guides
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="packages" title="Travel Packages">
                  <Form onSubmit={handlePackageSearch}>
                    <Form.Group className="mb-3">
                      <Form.Label>Destination</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Where do you want to go?"
                        value={packageDestination}
                        onChange={(e) => setPackageDestination(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Maximum Duration (days)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        placeholder="e.g. 7, 14, 21"
                        value={packageDuration}
                        onChange={(e) => setPackageDuration(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2">
                      Find Travel Packages
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
