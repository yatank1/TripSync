const { pool } = require('./db');

const sampleTravelGuides = [
  {
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
    name: 'Raj Patel',
    location: 'New Delhi, India',
    expertise: 'Spiritual & Historical Sites',
    languages: 'English, Hindi, Punjabi',
    price_per_day: 80.00,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop',
    description: 'Discover the spiritual and historical richness of India with Raj. From ancient temples to bustling markets, experience the true essence of Indian culture.'
  },
  {
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    expertise: 'Modern & Traditional Japan',
    languages: 'English, Japanese',
    price_per_day: 130.00,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1999&auto=format&fit=crop',
    description: 'Bridge between traditional and modern Japan. Yuki will guide you through ancient temples, modern skyscrapers, and everything in between.'
  },
  {
    name: 'Carlos Rodriguez',
    location: 'Rio de Janeiro, Brazil',
    expertise: 'Adventure & Nature',
    languages: 'English, Portuguese, Spanish',
    price_per_day: 90.00,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1618886614638-80e3c103d465?q=80&w=1970&auto=format&fit=crop',
    description: 'Adventure enthusiast specializing in outdoor activities. From hiking in the rainforest to exploring hidden beaches, Carlos will make your trip unforgettable.'
  },
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    expertise: 'Urban Exploration & Arts',
    languages: 'English',
    price_per_day: 110.00,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    description: 'New York native with a passion for arts and urban culture. Discover the city\'s hidden art galleries, best food spots, and iconic landmarks with a local perspective.'
  }
];

const sampleTravelPackages = [
  {
    name: 'European Highlights',
    destination: 'Multiple Cities, Europe',
    duration: 14,
    price: 2999.99,
    description: 'Experience the best of Europe in this comprehensive 14-day tour covering Paris, Rome, Barcelona, and Amsterdam. Includes guided tours, premium accommodations, and selected meals.',
    includes: 'Flights, 4-star accommodations, breakfast daily, guided tours, airport transfers',
    excludes: 'Lunch and dinner (except where specified), travel insurance, optional activities',
    image_url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7
  },
  {
    name: 'Tropical Paradise',
    destination: 'Bali, Indonesia',
    duration: 7,
    price: 1499.99,
    description: 'Escape to the tropical paradise of Bali for a week of relaxation, adventure, and cultural experiences. Stay in luxury villas, explore ancient temples, and enjoy pristine beaches.',
    includes: 'Flights, 5-star villa accommodation, daily breakfast, 3 dinners, airport transfers, 2 guided excursions',
    excludes: 'Travel insurance, additional activities, most lunches and some dinners',
    image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
    rating: 4.9
  },
  {
    name: 'Japanese Discovery',
    destination: 'Tokyo, Kyoto, Osaka, Japan',
    duration: 10,
    price: 2799.99,
    description: 'Immerse yourself in Japanese culture and history with this 10-day journey through Tokyo, Kyoto, and Osaka. Experience ancient traditions alongside futuristic technology.',
    includes: 'Flights, 4-star accommodations, daily breakfast, bullet train passes, guided city tours, tea ceremony experience',
    excludes: 'Most meals, travel insurance, optional activities',
    image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8
  },
  {
    name: 'African Safari Adventure',
    destination: 'Kenya & Tanzania',
    duration: 8,
    price: 3499.99,
    description: 'Experience the ultimate wildlife adventure with this 8-day safari through Kenya and Tanzania. Witness the Big Five in their natural habitat and enjoy luxury camping under the stars.',
    includes: 'Flights, luxury tented accommodations, all meals, game drives, park fees, expert guides',
    excludes: 'Visa fees, travel insurance, gratuities, alcoholic beverages',
    image_url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop',
    rating: 4.9
  },
  {
    name: 'South American Explorer',
    destination: 'Peru, Bolivia, Chile',
    duration: 12,
    price: 2599.99,
    description: 'Discover the wonders of South America in this 12-day adventure through Peru, Bolivia, and Chile. From Machu Picchu to the Atacama Desert, experience breathtaking landscapes and ancient civilizations.',
    includes: 'Flights, 3-4 star accommodations, daily breakfast, guided tours, train to Machu Picchu, some meals',
    excludes: 'Most lunches and dinners, travel insurance, optional activities',
    image_url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7
  },
  {
    name: 'Island Hopping in Greece',
    destination: 'Athens, Mykonos, Santorini, Greece',
    duration: 9,
    price: 1999.99,
    description: 'Experience the beauty of the Greek islands with this 9-day tour of Athens, Mykonos, and Santorini. Enjoy crystal-clear waters, white-washed buildings, and delicious Mediterranean cuisine.',
    includes: 'Flights, 4-star accommodations, daily breakfast, ferry transfers between islands, guided tour of Athens',
    excludes: 'Most meals, travel insurance, optional activities',
    image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2062&auto=format&fit=crop',
    rating: 4.8
  }
];

const insertTravelData = async () => {
  try {
    // First, create the tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS travel_guides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        expertise VARCHAR(100) NOT NULL,
        languages VARCHAR(255) NOT NULL,
        price_per_day DECIMAL(10, 2) NOT NULL,
        rating DECIMAL(3, 2),
        image_url VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Travel guides table created or already exists');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS travel_packages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        destination VARCHAR(100) NOT NULL,
        duration INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        includes TEXT,
        excludes TEXT,
        image_url VARCHAR(255),
        rating DECIMAL(3, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Travel packages table created or already exists');

    // Check if bookings table needs to be updated
    const [columns] = await pool.query('SHOW COLUMNS FROM bookings');
    const columnNames = columns.map(col => col.Field);
    
    // Add guide_id if it doesn't exist
    if (!columnNames.includes('guide_id')) {
      await pool.query('ALTER TABLE bookings ADD COLUMN guide_id INT');
      await pool.query('ALTER TABLE bookings ADD FOREIGN KEY (guide_id) REFERENCES travel_guides(id)');
      console.log('Added guide_id column to bookings table');
    }
    
    // Add package_id if it doesn't exist
    if (!columnNames.includes('package_id')) {
      await pool.query('ALTER TABLE bookings ADD COLUMN package_id INT');
      await pool.query('ALTER TABLE bookings ADD FOREIGN KEY (package_id) REFERENCES travel_packages(id)');
      console.log('Added package_id column to bookings table');
    }

    // Check if travel guides table is empty
    const [guides] = await pool.query('SELECT COUNT(*) as count FROM travel_guides');
    if (guides[0].count === 0) {
      console.log('Inserting sample travel guides...');
      for (const guide of sampleTravelGuides) {
        await pool.query(
          'INSERT INTO travel_guides (name, location, expertise, languages, price_per_day, rating, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [guide.name, guide.location, guide.expertise, guide.languages, guide.price_per_day, guide.rating, guide.image_url, guide.description]
        );
      }
      console.log('Sample travel guides inserted successfully');
    } else {
      console.log('Travel guides table already has data, skipping insertion');
    }

    // Check if travel packages table is empty
    const [packages] = await pool.query('SELECT COUNT(*) as count FROM travel_packages');
    if (packages[0].count === 0) {
      console.log('Inserting sample travel packages...');
      for (const pkg of sampleTravelPackages) {
        await pool.query(
          'INSERT INTO travel_packages (name, destination, duration, price, description, includes, excludes, image_url, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [pkg.name, pkg.destination, pkg.duration, pkg.price, pkg.description, pkg.includes, pkg.excludes, pkg.image_url, pkg.rating]
        );
      }
      console.log('Sample travel packages inserted successfully');
    } else {
      console.log('Travel packages table already has data, skipping insertion');
    }

    console.log('Sample travel data insertion completed');
  } catch (error) {
    console.error('Error inserting sample travel data:', error);
  }
};

// Run the function
insertTravelData();
