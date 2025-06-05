export const colors = {
  // Primary Colors
  primary: '#4F7CAC', // Brand blue
  secondary: '#91CDA8', // Fresh mint
  accent: '#BDB2E5', // Soft purple
  
  // Status Colors
  success: '#4CAF50', // Green
  warning: '#FFB74D', // Orange
  error: '#FF6B6B', // Red
  
  // Text Colors
  text: '#2D3748', // Dark gray
  textLight: '#718096', // Medium gray
  
  // Background Colors
  background: '#F5F7FA', // Light gray
  backgroundDark: '#E9EEF4', // Darker light gray
  
  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Brand Gradients (as individual colors for React Native)
  gradientStart: '#7799f7',
  gradientEnd: '#e3e9be',
  
  // Overlay Colors
  overlay: 'rgba(79, 124, 172, 0.8)', // Primary with opacity
  overlayLight: 'rgba(79, 124, 172, 0.1)',
};

// Typography Scale
export const typography = {
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  small: 14,
  tiny: 12,
};

// Spacing Scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius Scale
export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Shadows (for iOS)
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
};