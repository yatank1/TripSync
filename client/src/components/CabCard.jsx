import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CabCard = ({ cab }) => {
  const { id, type, capacity, price_per_km, image_url } = cab;

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <Card.Img 
        variant="top" 
        src={image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'} 
        alt={type}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{type}</Card.Title>
        <div className="mb-2">
          <Badge bg="info" className="me-2">
            <i className="bi bi-person me-1"></i> {capacity} Seats
          </Badge>
          <Badge bg="light" text="dark" className="border">
            <i className="bi bi-star me-1"></i> 4.8/5
          </Badge>
        </div>
        <Card.Text className="text-muted small mb-3">
          Comfortable and reliable {type.toLowerCase()} for your journey. Includes AC, music system, and professional driver.
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-primary">${price_per_km} <small className="text-muted fw-normal">/km</small></span>
            <span className="text-success small">
              <i className="bi bi-clock me-1"></i> Available Now
            </span>
          </div>
          <Link to={`/cabs/${id}`}>
            <Button variant="outline-primary" className="w-100">Book Now</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CabCard;
