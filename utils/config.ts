// API Configuration
export const API_CONFIG = {
  // Ganti dengan URL backend Anda
  BASE_URL: 'https://your-backend-api.com/api',
  
  // Untuk development/testing dengan local backend
  // BASE_URL: 'http://localhost:3000/api',
  
  // Untuk testing dengan mock API
  // BASE_URL: 'https://jsonplaceholder.typicode.com',
  
  TIMEOUT: 30000, // 30 seconds
  
  ENDPOINTS: {
    // Authentication
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout',
    
    // Products
    PRODUCTS: '/products',
    PRODUCT_BY_ID: '/products',
    PRODUCT_SEARCH: '/products/search',
    CATEGORIES: '/categories',
    FEATURED_PRODUCTS: '/products/featured',
    
    // Cart
    CART: '/cart',
    ADD_TO_CART: '/cart/add',
    UPDATE_CART: '/cart/update',
    REMOVE_FROM_CART: '/cart/remove',
    CLEAR_CART: '/cart/clear',
    
    // Orders
    ORDERS: '/orders',
    CREATE_ORDER: '/orders/create',
    ORDER_HISTORY: '/orders/history',
    
    // User
    USER_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    WISHLIST: '/user/wishlist',
    
    // Reviews
    REVIEWS: '/reviews',
    ADD_REVIEW: '/reviews/add',
    
    // Promo codes
    VALIDATE_PROMO: '/promo/validate',
  }
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  WISHLIST_DATA: 'wishlist_data',
};
