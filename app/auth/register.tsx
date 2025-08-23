import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { registerOnly, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const userData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      await registerOnly(userData);
      
      // Direct redirect to login without alert
      router.replace('/auth/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed', 
        error.message || 'Please check your information and try again',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // TODO: Implement social login
    Alert.alert(
      'Social Login',
      `${provider} registration will be implemented here`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign up</Text>
        </View>

        {/* Register Form */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Name"
              placeholderTextColor={COLORS.textLight}
              value={formData.name}
              onChangeText={(text) => {
                setFormData({...formData, name: text});
                if (errors.name) {
                  setErrors({...errors, name: ''});
                }
              }}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {formData.name !== '' && (
              <TouchableOpacity style={styles.checkIcon}>
                <Ionicons name="checkmark" size={20} color={COLORS.success} />
              </TouchableOpacity>
            )}
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              placeholderTextColor={COLORS.textLight}
              value={formData.email}
              onChangeText={(text) => {
                setFormData({...formData, email: text});
                if (errors.email) {
                  setErrors({...errors, email: ''});
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {formData.email !== '' && (
              <TouchableOpacity style={styles.checkIcon}>
                <Ionicons name="checkmark" size={20} color={COLORS.success} />
              </TouchableOpacity>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor={COLORS.textLight}
              value={formData.password}
              onChangeText={(text) => {
                setFormData({...formData, password: text});
                if (errors.password) {
                  setErrors({...errors, password: ''});
                }
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>

          {/* Already have account text */}
          <TouchableOpacity 
            style={styles.alreadyHaveAccount}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <Text style={styles.dividerText}>Or sign up with social account</Text>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('google')}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('facebook')}
            >
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: SIZES.sm,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.lg,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: SIZES.lg,
    position: 'relative',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    paddingVertical: SIZES.md,
    paddingRight: 40,
  },
  inputError: {
    borderBottomColor: COLORS.error,
  },
  checkIcon: {
    position: 'absolute',
    right: 0,
    top: SIZES.md,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: SIZES.md,
  },
  alreadyHaveAccount: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  alreadyHaveAccountText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  registerButtonText: {
    fontSize: SIZES.textBase,
    fontWeight: 'bold',
    color: COLORS.background,
    letterSpacing: 1,
  },
  divider: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 92,
    height: 64,
    backgroundColor: COLORS.background,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  loginText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: SIZES.textBase,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
