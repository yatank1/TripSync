import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Hotel services
export const hotelService = {
  getAllHotels: () => api.get('/hotels'),
  getHotelById: (id) => api.get(`/hotels/${id}`),
  searchHotels: (location) => api.get(`/hotels/search/${location}`),
  bookHotel: (bookingData) => api.post('/hotels/book', bookingData),
};

// Cab services
export const cabService = {
  getAllCabs: () => api.get('/cabs'),
  getCabById: (id) => api.get(`/cabs/${id}`),
  bookCab: (bookingData) => api.post('/cabs/book', bookingData),
};

// Travel Guide services
export const guideService = {
  getAllGuides: () => api.get('/guides'),
  getGuideById: (id) => api.get(`/guides/${id}`),
  searchGuides: (location) => api.get(`/guides/search/${location}`),
  bookGuide: (bookingData) => api.post('/guides/book', bookingData),
};

// Travel Package services
export const packageService = {
  getAllPackages: () => api.get('/packages'),
  getPackageById: (id) => api.get(`/packages/${id}`),
  searchPackages: (destination) => api.get(`/packages/search/${destination}`),
  bookPackage: (bookingData) => api.post('/packages/book', bookingData),
};

export default api;
