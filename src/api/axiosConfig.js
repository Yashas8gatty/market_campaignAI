import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

// Mock API responses for development
const mockResponses = {
  '/api/auth/register': () => ({ data: { message: 'Registration successful' } }),
  '/api/auth/login': () => ({ 
    data: { 
      token: 'mock-jwt-token-12345', 
      shopName: 'Demo Shop' 
    } 
  }),
  '/api/campaigns': () => ({ 
    data: [
      { id: 1, name: 'Diwali Sale', scans: 45, redemptions: 12, status: 'active' },
      { id: 2, name: 'Summer Collection', scans: 23, redemptions: 8, status: 'draft' }
    ] 
  }),
  '/api/campaigns/plan': () => ({ 
    data: { 
      suggestions: [
        {
          id: 1,
          channel: 'WhatsApp Marketing',
          description: 'Share offers directly with customers',
          content: 'Special Diwali offer! Get 20% off on all items. Limited time only!',
          type: 'Digital',
          estimatedReach: '500-1000 customers'
        },
        {
          id: 2,
          channel: 'Social Media Posts',
          description: 'Facebook and Instagram posts',
          content: 'Celebrate Diwali with amazing discounts at our store!',
          type: 'Digital',
          estimatedReach: '200-500 customers'
        }
      ]
    } 
  }),
  '/api/campaigns/add-channel': () => ({ 
    data: { 
      message: 'Channel added successfully',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mock-url',
      trackingUrl: 'http://localhost:5173/track/mock-tracker-123'
    } 
  }),
  '/api/redeem': () => ({ data: { message: 'Code redeemed successfully!' } })
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses with mock data if needed
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If using mock mode or connection failed, return mock data
    if (USE_MOCK || error.code === 'ERR_NETWORK') {
      const url = error.config?.url;
      const method = error.config?.method?.toUpperCase();
      
      console.log(`🔧 Mock API: ${method} ${url}`);
      
      if (mockResponses[url]) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return Promise.resolve(mockResponses[url]());
      }
      
      // Handle tracking URLs
      if (url?.startsWith('/track/')) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return Promise.resolve({
          data: {
            shopName: 'Demo Shop',
            campaignName: 'Diwali Special Offer',
            offer: '20% off on all items + Free gift wrapping',
            uniqueCode: 'DIW-2024',
            validUntil: '2024-11-15',
            shopAddress: '123 Main Street, Mumbai, Maharashtra',
            shopPhone: '+91 98765 43210',
            terms: 'Valid on minimum purchase of ₹500. Cannot be combined with other offers.'
          }
        });
      }
    }
    
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('shopName');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;