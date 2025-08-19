import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  itemCount?: number;
  onPress: () => void;
}

export function CategoryCard({ id, name, image, itemCount, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.name}>{name}</Text>
        {itemCount && (
          <Text style={styles.itemCount}>{itemCount} items</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (width - (SIZES.lg * 3)) / 2,
    height: 120,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: SIZES.md,
  },
  name: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.xs,
  },
  itemCount: {
    fontSize: SIZES.textSm,
    color: COLORS.background,
    opacity: 0.8,
  },
});
