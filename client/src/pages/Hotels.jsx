import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { hotelService } from '../services/api';

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: searchParams.get('guests') || 1,
    priceMin: '',
    priceMax: '',
    rating: ''
  });

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        let response;
        
        if (filters.location) {
          response = await hotelService.searchHotels(filters.location);
        } else {
          response = await hotelService.getAllHotels();
        }
        
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Failed to load hotels. Please try again later.');
        // Use dummy data for now
        setHotels([
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
          },
          {
            id: 4,
            name: 'Beachfront Paradise',
            location: 'Bali',
            description: 'Enjoy the pristine beaches and crystal-clear waters from our beachfront paradise in Bali.',
            price_per_night: 179,
            rating: 4.7
          },
          {
            id: 5,
            name: 'Historic City Hotel',
            location: 'Rome',
            description: 'Stay in the heart of Rome in our historic hotel, walking distance from major attractions and authentic Italian cuisine.',
            price_per_night: 220,
            rating: 4.4
          },
          {
            id: 6,
            name: 'Tropical Island Resort',
            location: 'Hawaii',
            description: 'Experience the beauty of Hawaii with our all-inclusive resort offering stunning ocean views and tropical gardens.',
            price_per_night: 329,
            rating: 4.9
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [filters.location]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // In a real app, you would call the API with filters
    // For now, we'll just filter the existing data
    const filteredHotels = hotels.filter(hotel => {
      // Filter by price range if set
      if (filters.priceMin && hotel.price_per_night < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && hotel.price_per_night > parseFloat(filters.priceMax)) {
        return false;
      }
      // Filter by rating if set
      if (filters.rating && hotel.rating < parseFloat(filters.rating)) {
        return false;
      }
      return true;
    });
    
    setHotels(filteredHotels);
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Find Your Perfect Hotel</h1>
      
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Filters</h5>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Where are you going?"
                  />
                </Form.Group>
                
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Check-in</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkIn"
                        value={filters.checkIn}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Check-out</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOut"
                        value={filters.checkOut}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="guests"
                    value={filters.guests}
                    onChange={handleFilterChange}
                    min="1"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Price Range</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        name="priceMin"
                        value={filters.priceMin}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        min="0"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        name="priceMax"
                        value={filters.priceMax}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        min="0"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Minimum Rating</Form.Label>
                  <Form.Select
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </Form.Select>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Hotels List */}
        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading hotels...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : hotels.length === 0 ? (
            <Alert variant="info">
              No hotels found matching your criteria. Try adjusting your filters.
            </Alert>
          ) : (
            <Row>
              {hotels.map(hotel => (
                <Col key={hotel.id} md={6} lg={4} className="mb-4">
                  <HotelCard hotel={hotel} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Hotels;
