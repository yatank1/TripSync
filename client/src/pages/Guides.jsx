import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import GuideCard from '../components/GuideCard';
import { guideService } from '../services/api';

const Guides = () => {
  const [searchParams] = useSearchParams();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    expertise: searchParams.get('expertise') || '',
    languages: searchParams.get('languages') || '',
    priceMin: '',
    priceMax: '',
    rating: ''
  });

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      try {
        let response;
        
        if (filters.location) {
          response = await guideService.searchGuides(filters.location);
        } else {
          response = await guideService.getAllGuides();
        }
        
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
        setError('Failed to load travel guides. Please try again later.');
        // Use dummy data for now
        setGuides([
          {
            id: 1,
            name: 'John Smith',
            location: 'Paris, France',
            expertise: 'History & Architecture',
            languages: 'English, French',
            price_per_day: 120.00,
            rating: 4.8,
            image_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
            description: 'Experienced guide with 10+ years of experience showing tourists the hidden gems of Paris. Expert in historical monuments and architectural marvels.'
          },
          {
            id: 2,
            name: 'Maria Garcia',
            location: 'Barcelona, Spain',
            expertise: 'Food & Culture',
            languages: 'English, Spanish, Catalan',
            price_per_day: 100.00,
            rating: 4.9,
            image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
            description: 'Culinary expert and cultural enthusiast. Join Maria for an authentic Spanish experience through food, art, and local traditions.'
          },
          {
            id: 3,
            name: 'Raj Patel',
            location: 'New Delhi, India',
            expertise: 'Spiritual & Historical Sites',
            languages: 'English, Hindi, Punjabi',
            price_per_day: 80.00,
            rating: 4.7,
            image_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop',
            description: 'Discover the spiritual and historical richness of India with Raj. From ancient temples to bustling markets, experience the true essence of Indian culture.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
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
    const filteredGuides = guides.filter(guide => {
      // Filter by expertise if set
      if (filters.expertise && !guide.expertise.toLowerCase().includes(filters.expertise.toLowerCase())) {
        return false;
      }
      // Filter by languages if set
      if (filters.languages && !guide.languages.toLowerCase().includes(filters.languages.toLowerCase())) {
        return false;
      }
      // Filter by price range if set
      if (filters.priceMin && guide.price_per_day < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && guide.price_per_day > parseFloat(filters.priceMax)) {
        return false;
      }
      // Filter by rating if set
      if (filters.rating && guide.rating < parseFloat(filters.rating)) {
        return false;
      }
      return true;
    });
    
    setGuides(filteredGuides);
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Find Your Perfect Travel Guide</h1>
      
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
                
                <Form.Group className="mb-3">
                  <Form.Label>Expertise</Form.Label>
                  <Form.Control
                    type="text"
                    name="expertise"
                    value={filters.expertise}
                    onChange={handleFilterChange}
                    placeholder="e.g. History, Food, Adventure"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Languages</Form.Label>
                  <Form.Control
                    type="text"
                    name="languages"
                    value={filters.languages}
                    onChange={handleFilterChange}
                    placeholder="e.g. English, Spanish"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Price Range (per day)</Form.Label>
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
        
        {/* Guides List */}
        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading travel guides...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : guides.length === 0 ? (
            <Alert variant="info">
              No travel guides found matching your criteria. Try adjusting your filters.
            </Alert>
          ) : (
            <Row>
              {guides.map(guide => (
                <Col key={guide.id} md={6} lg={4} className="mb-4">
                  <GuideCard guide={guide} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Guides;
