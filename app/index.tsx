import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function WelcomeScreen() {
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to main app
    if (isInitialized && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitialized]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Background with gradient effect */}
      <View style={styles.backgroundGradient}>
        
        {/* Logo and Brand */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
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
            <Ionicons name="flash-outline" size={40} color={COLORS.background} />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="shield-checkmark-outline" size={40} color={COLORS.background} />
            <Text style={styles.featureText}>Secure Shopping</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Test Account Info */}
          <View style={styles.testInfoContainer}>
            <Text style={styles.testInfoTitle}>For Testing:</Text>
            <Text style={styles.testInfoText}>Email: fikri123@gmail.com</Text>
            <Text style={styles.testInfoText}>Password: ayatullah1945</Text>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>
              Browse as Guest
            </Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.backgroundLight} />
          </TouchableOpacity>

          {/* Test Account Info */}
          <View style={styles.testInfoContainer}>
            <Text style={styles.testInfoTitle}>For Testing:</Text>
            <Text style={styles.testInfoText}>Email: fikri123@gmail.com</Text>
            <Text style={styles.testInfoText}>Password: ayatullah1945</Text>
          </View>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
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
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.xl,
    paddingVertical: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.lg,
    tintColor: COLORS.background,
  },
  brandName: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  tagline: {
    fontSize: SIZES.textLg,
    color: COLORS.backgroundLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 40,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: SIZES.textSm,
    color: COLORS.background,
    marginTop: SIZES.sm,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  testInfoContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  testInfoTitle: {
    fontSize: SIZES.textBase,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  testInfoText: {
    fontSize: SIZES.textSm,
    color: COLORS.backgroundLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  loginButton: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.lg,
    ...SHADOWS.large,
  },
  loginButtonText: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderRadius: SIZES.radiusFull,
    borderWidth: 2,
    borderColor: COLORS.background,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  registerButtonText: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
  },
  browseButtonText: {
    fontSize: SIZES.textBase,
    color: COLORS.backgroundLight,
    marginRight: SIZES.sm,
    opacity: 0.9,
  },
  
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.15,
  },
  decorativeCircle3: {
    position: 'absolute',
    top: '40%',
    right: -100,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.1,
  },
});
