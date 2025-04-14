import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import CabCard from '../components/CabCard';
import { cabService } from '../services/api';

const Cabs = () => {
  const [searchParams] = useSearchParams();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    pickup: searchParams.get('pickup') || '',
    dropoff: searchParams.get('dropoff') || '',
    date: searchParams.get('date') || '',
    time: searchParams.get('time') || '',
    passengers: searchParams.get('passengers') || 1,
    priceMin: '',
    priceMax: '',
    cabType: ''
  });

  useEffect(() => {
    const fetchCabs = async () => {
      setLoading(true);
      try {
        const response = await cabService.getAllCabs();
        setCabs(response.data);
      } catch (error) {
        console.error('Error fetching cabs:', error);
        setError('Failed to load cabs. Please try again later.');
        // Use dummy data for now
        setCabs([
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
          },
          {
            id: 4,
            type: 'Economy',
            capacity: 4,
            price_per_km: 1.5
          },
          {
            id: 5,
            type: 'Premium Sedan',
            capacity: 4,
            price_per_km: 2.0
          },
          {
            id: 6,
            type: 'Luxury SUV',
            capacity: 6,
            price_per_km: 4.0
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

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
    const filteredCabs = cabs.filter(cab => {
      // Filter by price range if set
      if (filters.priceMin && cab.price_per_km < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && cab.price_per_km > parseFloat(filters.priceMax)) {
        return false;
      }
      // Filter by cab type if set
      if (filters.cabType && !cab.type.toLowerCase().includes(filters.cabType.toLowerCase())) {
        return false;
      }
      // Filter by capacity if passengers are set
      if (filters.passengers && cab.capacity < parseInt(filters.passengers)) {
        return false;
      }
      return true;
    });
    
    setCabs(filteredCabs);
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Book Your Cab</h1>
      
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Filters</h5>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Pickup Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickup"
                    value={filters.pickup}
                    onChange={handleFilterChange}
                    placeholder="Enter pickup location"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Dropoff Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="dropoff"
                    value={filters.dropoff}
                    onChange={handleFilterChange}
                    placeholder="Enter dropoff location"
                  />
                </Form.Group>
                
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={filters.time}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Passengers</Form.Label>
                  <Form.Control
                    type="number"
                    name="passengers"
                    value={filters.passengers}
                    onChange={handleFilterChange}
                    min="1"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Cab Type</Form.Label>
                  <Form.Select
                    name="cabType"
                    value={filters.cabType}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Type</option>
                    <option value="economy">Economy</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="minivan">Minivan</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Price Range (per km)</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        name="priceMin"
                        value={filters.priceMin}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        min="0"
                        step="0.5"
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
                        step="0.5"
                      />
                    </Col>
                  </Row>
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
        
        {/* Cabs List */}
        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading cabs...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : cabs.length === 0 ? (
            <Alert variant="info">
              No cabs found matching your criteria. Try adjusting your filters.
            </Alert>
          ) : (
            <Row>
              {cabs.map(cab => (
                <Col key={cab.id} md={6} lg={4} className="mb-4">
                  <CabCard cab={cab} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cabs;
