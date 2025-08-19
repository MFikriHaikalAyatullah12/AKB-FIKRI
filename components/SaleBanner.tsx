import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

interface SaleBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  backgroundImage: string;
  onPress: () => void;
}

export function SaleBanner({ title, subtitle, buttonText, backgroundImage, onPress }: SaleBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground 
        source={{ uri: backgroundImage }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - (SIZES.lg * 2),
    height: 200,
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.md,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    borderRadius: SIZES.radiusLg,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.xl,
  },
  content: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: SIZES.text4xl,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.textLg,
    color: COLORS.background,
    marginBottom: SIZES.lg,
    opacity: 0.9,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.textBase,
    fontWeight: '600',
  },
});
