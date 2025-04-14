# TripSync

TripSync is a comprehensive travel website that provides a one-stop solution for all your travel needs. Book hotels, cabs, travel guides, and travel packages all in one place.

## Features

- **Hotel Booking**: Search and book hotels based on location, dates, and number of guests
- **Cab Booking**: Book cabs for your travel needs with pickup and dropoff locations
- **Travel Guide Booking**: Find and book experienced travel guides for your destination
- **Travel Package Booking**: Explore and book all-inclusive travel packages
- **User Authentication**: Register and login to manage your bookings

## Tech Stack

### Frontend
- React
- Bootstrap
- React Router
- Axios

### Backend
- Node.js
- Express
- MySQL
- JWT for authentication

## Installation and Setup

### Prerequisites
- Node.js
- MySQL

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yatan
   DB_NAME=tripsync
   JWT_SECRET=tripsync_secret_key
   ```

4. Initialize the database:
   ```
   node config/initDb.js
   ```

5. Add sample data:
   ```
   node config/sampleData.js
   node config/sampleTravelData.js
   ```

6. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `GET /api/hotels/search/:location` - Search hotels by location
- `POST /api/hotels/book` - Book a hotel

### Cabs
- `GET /api/cabs` - Get all cabs
- `GET /api/cabs/:id` - Get cab by ID
- `POST /api/cabs/book` - Book a cab

### Travel Guides
- `GET /api/guides` - Get all travel guides
- `GET /api/guides/:id` - Get travel guide by ID
- `GET /api/guides/search/:location` - Search travel guides by location
- `POST /api/guides/book` - Book a travel guide

### Travel Packages
- `GET /api/packages` - Get all travel packages
- `GET /api/packages/:id` - Get travel package by ID
- `GET /api/packages/search/:destination` - Search travel packages by destination
- `POST /api/packages/book` - Book a travel package

## License
MIT
