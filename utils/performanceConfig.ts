/**
 * Performance Configuration for AKB-FIKRI App
 * Ultra-fast loading optimizations
 */

// Immediate app startup - no waiting for resources
export const APP_CONFIG = {
  // Loading delays (in milliseconds)
  SPLASH_MIN_DURATION: 0, // No minimum splash duration
  FONT_LOADING_TIMEOUT: 1000, // Quick font timeout
  AUTH_INIT_TIMEOUT: 500, // Very fast auth timeout
  IMAGE_LOADING_TIMEOUT: 2000,
  
  // Performance settings
  ENABLE_HERMES: true,
  ENABLE_INLINE_REQUIRES: true,
  ENABLE_LAZY_LOADING: true,
  
  // Bundle optimization
  MAX_BUNDLE_SIZE: 10 * 1024 * 1024, // 10MB max
  ENABLE_CODE_SPLITTING: true,
  
  // Memory management
  ENABLE_MEMORY_OPTIMIZATION: true,
  CLEAR_CACHE_ON_STARTUP: false, // Don't clear cache for faster startup
  
  // Network optimization
  REQUEST_TIMEOUT: 3000,
  RETRY_ATTEMPTS: 1, // Fewer retries for faster loading
  
  // Development settings
  ENABLE_PERFORMANCE_MONITORING: true,
  LOG_PERFORMANCE_METRICS: true,
};

// Essential fonts that must load first
export const ESSENTIAL_FONTS = [
  'PoppinsSemiBold',
  'OpenSansVariable', 
  'RobotoVariable'
];

// Non-critical fonts that can load later
export const LAZY_FONTS = [
  'MontserratItalic',
  'OpenSansItalic', 
  'RalewayItalic',
  'Lobster',
  'SpaceMonoBoldItalic',
  'UbuntuBold',
  'IndieFlower'
];

// Performance monitoring
export const startPerformanceTimer = (label: string) => {
  if (APP_CONFIG.LOG_PERFORMANCE_METRICS) {
    console.time(`[PERF] ${label}`);
  }
};

export const endPerformanceTimer = (label: string) => {
  if (APP_CONFIG.LOG_PERFORMANCE_METRICS) {
    console.timeEnd(`[PERF] ${label}`);
  }
};
