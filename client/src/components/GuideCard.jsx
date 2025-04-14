import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GuideCard = ({ guide }) => {
  const { id, name, location, expertise, languages, price_per_day, rating, image_url, description } = guide;

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image_url || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop'} 
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
        <div className="mb-2">
          <Badge bg="info" className="me-2">{expertise}</Badge>
          <Badge bg="secondary">{languages}</Badge>
        </div>
        <Card.Text className="text-muted small mb-3">
          {description?.substring(0, 100)}...
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-primary">${price_per_day} <small className="text-muted fw-normal">/day</small></span>
            <Badge bg="light" text="dark" className="border">4.8/5 (45 reviews)</Badge>
          </div>
          <Link to={`/guides/${id}`}>
            <Button variant="outline-primary" className="w-100">View Profile</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GuideCard;
