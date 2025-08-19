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
import { authService } from '../../services/authService';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleResetPassword = async () => {
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Use the actual authService
      await authService.forgotPassword(email);
      
      setEmailSent(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      // Use the actual authService
      await authService.forgotPassword(email);
      
      Alert.alert('Success', 'Reset email sent again!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Success Content */}
          <View style={styles.successContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={80} color={COLORS.primary} />
            </View>
            
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successSubtitle}>
              We've sent password reset instructions to:
            </Text>
            <Text style={styles.emailText}>{email}</Text>
            
            <Text style={styles.instructionText}>
              Follow the link in the email to reset your password. If you don't see the email, check your spam folder.
            </Text>

            <TouchableOpacity
              style={[styles.resendButton, isLoading && styles.buttonDisabled]}
              onPress={handleResendEmail}
              disabled={isLoading}
            >
              <Text style={styles.resendButtonText}>
                {isLoading ? 'Sending...' : 'Resend Email'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLoginButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.backToLoginText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
          <Text style={styles.title}>Forgot password</Text>
        </View>

        {/* Form Content */}
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            Please, enter your email address. You will receive a link to create a new password via email.
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Email"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
            {email !== '' && (
              <TouchableOpacity style={styles.checkIcon}>
                <Ionicons name="checkmark" size={20} color={COLORS.success} />
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {/* Send Button */}
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.sendButtonText}>
              {isLoading ? 'SENDING...' : 'SEND'}
            </Text>
          </TouchableOpacity>
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
  subtitle: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 30,
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
  errorText: {
    fontSize: SIZES.textSm,
    color: COLORS.error,
    marginTop: SIZES.xs,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  sendButtonText: {
    fontSize: SIZES.textBase,
    fontWeight: 'bold',
    color: COLORS.background,
    letterSpacing: 1,
  },
  
  // Success Styles (keeping existing ones)
  content: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingBottom: 100,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  successTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  emailText: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.lg,
  },
  instructionText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  resendButton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: SIZES.lg,
  },
  resendButtonText: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.primary,
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
  },
  backToLoginText: {
    fontSize: SIZES.textBase,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: SIZES.sm,
  },
});
