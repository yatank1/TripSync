import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PackageCard = ({ travelPackage }) => {
  const { id, name, destination, duration, price, description, image_url, rating } = travelPackage;

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image_url || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'} 
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
        <Badge 
          bg="primary" 
          className="position-absolute top-0 start-0 m-2 px-2 py-1"
        >
          {duration} Days
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{name}</Card.Title>
        <div className="mb-2 text-muted small">
          <i className="bi bi-geo-alt me-1"></i> {destination}
        </div>
        <Card.Text className="text-muted small mb-3">
          {description?.substring(0, 100)}...
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-primary">${price} <small className="text-muted fw-normal">/person</small></span>
            <Badge bg="success" className="px-2 py-1">All Inclusive</Badge>
          </div>
          <Link to={`/packages/${id}`}>
            <Button variant="outline-primary" className="w-100">View Details</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;
