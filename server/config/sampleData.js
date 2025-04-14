const { pool } = require('./db');

const sampleHotels = [
  {
    name: 'Luxury Resort & Spa',
    location: 'Maldives',
    description: 'Experience luxury like never before with our beachfront resort offering stunning views and world-class amenities.',
    price_per_night: 299.99,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Mountain View Lodge',
    location: 'Switzerland',
    description: 'Nestled in the heart of the Alps, our lodge offers breathtaking mountain views and cozy accommodations.',
    price_per_night: 199.99,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Urban Boutique Hotel',
    location: 'New York',
    description: 'Located in the heart of Manhattan, our boutique hotel offers modern amenities with easy access to major attractions.',
    price_per_night: 249.99,
    rating: 4.5,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Beachfront Paradise',
    location: 'Bali',
    description: 'Enjoy the pristine beaches and crystal-clear waters from our beachfront paradise in Bali.',
    price_per_night: 179.99,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Historic City Hotel',
    location: 'Rome',
    description: 'Stay in the heart of Rome in our historic hotel, walking distance from major attractions and authentic Italian cuisine.',
    price_per_night: 219.99,
    rating: 4.4,
    image_url: 'https://images.unsplash.com/photo-1549638441-b787d2e11f14?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Tropical Island Resort',
    location: 'Hawaii',
    description: 'Experience the beauty of Hawaii with our all-inclusive resort offering stunning ocean views and tropical gardens.',
    price_per_night: 329.99,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=2070&auto=format&fit=crop'
  }
];

const sampleCabs = [
  {
    type: 'Luxury Sedan',
    capacity: 4,
    price_per_km: 2.5,
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    type: 'SUV',
    capacity: 6,
    price_per_km: 3.0,
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop'
  },
  {
    type: 'Minivan',
    capacity: 8,
    price_per_km: 3.5,
    image_url: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=2065&auto=format&fit=crop'
  },
  {
    type: 'Economy',
    capacity: 4,
    price_per_km: 1.5,
    image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    type: 'Premium Sedan',
    capacity: 4,
    price_per_km: 2.0,
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    type: 'Luxury SUV',
    capacity: 6,
    price_per_km: 4.0,
    image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2036&auto=format&fit=crop'
  }
];

const insertSampleData = async () => {
  try {
    // Check if hotels table is empty
    const [hotels] = await pool.query('SELECT COUNT(*) as count FROM hotels');
    if (hotels[0].count === 0) {
      console.log('Inserting sample hotels...');
      for (const hotel of sampleHotels) {
        await pool.query(
          'INSERT INTO hotels (name, location, description, price_per_night, rating, image_url) VALUES (?, ?, ?, ?, ?, ?)',
          [hotel.name, hotel.location, hotel.description, hotel.price_per_night, hotel.rating, hotel.image_url]
        );
      }
      console.log('Sample hotels inserted successfully');
    } else {
      console.log('Hotels table already has data, skipping insertion');
    }

    // Check if cabs table is empty
    const [cabs] = await pool.query('SELECT COUNT(*) as count FROM cabs');
    if (cabs[0].count === 0) {
      console.log('Inserting sample cabs...');
      for (const cab of sampleCabs) {
        await pool.query(
          'INSERT INTO cabs (type, capacity, price_per_km, image_url) VALUES (?, ?, ?, ?)',
          [cab.type, cab.capacity, cab.price_per_km, cab.image_url]
        );
      }
      console.log('Sample cabs inserted successfully');
    } else {
      console.log('Cabs table already has data, skipping insertion');
    }

    console.log('Sample data insertion completed');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

// Run the function
insertSampleData();
