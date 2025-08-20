import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { LoadingScreen } from '../components/LoadingScreen';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function WelcomeScreen() {
  const { isAuthenticated, isInitialized, error } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to initialize
    if (isInitialized) {
      setIsLoading(false);
      
      // Auto-redirect if authenticated
      if (isAuthenticated) {
        const timer = setTimeout(() => {
          router.replace('/(tabs)');
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, isInitialized]);

  // Show error if any
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingScreen message="Initializing AKB Fashion..." />;
  }

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.redirectContainer}>
          <Text style={styles.redirectText}>Welcome back!</Text>
          <Text style={styles.redirectSubtext}>Redirecting to your dashboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Background with gradient effect */}
      <View style={styles.backgroundGradient}>
        
        {/* Logo and Brand */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Ionicons name="storefront" size={60} color={COLORS.background} />
          </View>
          <Text style={styles.brandName}>AKB Fashion</Text>
          <Text style={styles.tagline}>Your Style, Your Choice</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons name="shirt-outline" size={40} color={COLORS.background} />
            <Text style={styles.featureText}>Latest Fashion</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="star-outline" size={40} color={COLORS.background} />
            <Text style={styles.featureText}>Premium Quality</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="flash-outline" size={40} color={COLORS.background} />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/auth/register')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.guestButton}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.xl * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SIZES.xl,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  brandName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: COLORS.background,
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SIZES.xl,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: COLORS.background,
    fontSize: 12,
    marginTop: SIZES.sm,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: SIZES.md,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  primaryButton: {
    backgroundColor: COLORS.background,
  },
  primaryButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  secondaryButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: '600',
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: SIZES.md,
  },
  guestButtonText: {
    color: COLORS.background,
    fontSize: 16,
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  footerText: {
    color: COLORS.background,
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 18,
  },
  redirectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.sm,
  },
  redirectSubtext: {
    fontSize: 16,
    color: COLORS.background,
    opacity: 0.8,
  },
});
