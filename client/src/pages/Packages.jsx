import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import { packageService } from '../services/api';

const Packages = () => {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    destination: searchParams.get('destination') || '',
    duration: searchParams.get('duration') || '',
    priceMin: '',
    priceMax: '',
    rating: ''
  });

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        let response;
        
        if (filters.destination) {
          response = await packageService.searchPackages(filters.destination);
        } else {
          response = await packageService.getAllPackages();
        }
        
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError('Failed to load travel packages. Please try again later.');
        // Use dummy data for now
        setPackages([
          {
            id: 1,
            name: 'European Highlights',
            destination: 'Multiple Cities, Europe',
            duration: 14,
            price: 2999.99,
            description: 'Experience the best of Europe in this comprehensive 14-day tour covering Paris, Rome, Barcelona, and Amsterdam. Includes guided tours, premium accommodations, and selected meals.',
            image_url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop',
            rating: 4.7
          },
          {
            id: 2,
            name: 'Tropical Paradise',
            destination: 'Bali, Indonesia',
            duration: 7,
            price: 1499.99,
            description: 'Escape to the tropical paradise of Bali for a week of relaxation, adventure, and cultural experiences. Stay in luxury villas, explore ancient temples, and enjoy pristine beaches.',
            image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
            rating: 4.9
          },
          {
            id: 3,
            name: 'Japanese Discovery',
            destination: 'Tokyo, Kyoto, Osaka, Japan',
            duration: 10,
            price: 2799.99,
            description: 'Immerse yourself in Japanese culture and history with this 10-day journey through Tokyo, Kyoto, and Osaka. Experience ancient traditions alongside futuristic technology.',
            image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
            rating: 4.8
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [filters.destination]);

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
    const filteredPackages = packages.filter(pkg => {
      // Filter by duration if set
      if (filters.duration && pkg.duration > parseInt(filters.duration)) {
        return false;
      }
      // Filter by price range if set
      if (filters.priceMin && pkg.price < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && pkg.price > parseFloat(filters.priceMax)) {
        return false;
      }
      // Filter by rating if set
      if (filters.rating && pkg.rating < parseFloat(filters.rating)) {
        return false;
      }
      return true;
    });
    
    setPackages(filteredPackages);
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Explore Travel Packages</h1>
      
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Filters</h5>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={filters.destination}
                    onChange={handleFilterChange}
                    placeholder="Where do you want to go?"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Maximum Duration (days)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={filters.duration}
                    onChange={handleFilterChange}
                    placeholder="e.g. 7, 14, 21"
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
        
        {/* Packages List */}
        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading travel packages...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : packages.length === 0 ? (
            <Alert variant="info">
              No travel packages found matching your criteria. Try adjusting your filters.
            </Alert>
          ) : (
            <Row>
              {packages.map(pkg => (
                <Col key={pkg.id} md={6} lg={4} className="mb-4">
                  <PackageCard travelPackage={pkg} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Packages;
