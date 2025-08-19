// Global theme colors and styles based on the design
export const COLORS = {
  // Primary Colors
  primary: '#E53E3E', // Red color from the design
  primaryDark: '#C53030',
  primaryLight: '#FC8181',
  
  // Secondary Colors
  secondary: '#4A5568',
  secondaryLight: '#718096',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundLight: '#F7FAFC',
  backgroundGray: '#EDF2F7',
  
  // Text Colors
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  textLight: '#718096',
  textMuted: '#A0ADB8',
  
  // Accent Colors
  accent: '#48BB78', // Green for success
  success: '#48BB78', // Green for success
  warning: '#ED8936', // Orange
  error: '#E53E3E', // Red
  
  // Special Colors
  sale: '#E53E3E', // Sale tag color
  new: '#48BB78', // New tag color
  discount: '#ED8936', // Discount color
  
  // Border Colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const SIZES = {
  // Padding & Margin
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  
  // Font Sizes
  textXs: 10,
  textSm: 12,
  textBase: 14,
  textLg: 16,
  textXl: 18,
  text2xl: 20,
  text3xl: 24,
  text4xl: 28,
  
  // Border Radius
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 20,
  radiusFull: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
