import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const { id, name, location, description, price_per_night, rating, image_url } = hotel;

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'} 
          alt={name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Badge 
          bg="warning" 
          text="dark" 
          className="position-absolute top-0 end-0 m-2 px-2 py-1"
        >
          {rating} ★
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{name}</Card.Title>
        <div className="mb-2 text-muted small">
          <i className="bi bi-geo-alt me-1"></i> {location}
        </div>
        <Card.Text className="text-muted small mb-3">
          {description?.substring(0, 100)}...
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-primary">${price_per_night} <small className="text-muted fw-normal">/night</small></span>
            <Badge bg="light" text="dark" className="border">4.5/5 (120 reviews)</Badge>
          </div>
          <Link to={`/hotels/${id}`}>
            <Button variant="outline-primary" className="w-100">View Details</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
