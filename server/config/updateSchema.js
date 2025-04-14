const { pool } = require('./db');

const updateSchema = async () => {
  try {
    // Create travel guides table
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

    // Create travel packages table
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

    // Update bookings table to include guide_id and package_id
    // First check if columns exist
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

    console.log('Bookings table updated');

    console.log('Schema update completed successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
  }
};

// Run the function
updateSchema();
