import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - (SIZES.lg * 3)) / 2;

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: 'SALE' | 'NEW' | string;
  discount?: string;
  inStock?: boolean;
  onPress: () => void;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  badge,
  discount,
  inStock = true,
  onPress,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const getBadgeColor = (badgeType: string) => {
    switch (badgeType.toUpperCase()) {
      case 'SALE':
        return COLORS.primary;
      case 'NEW':
        return COLORS.accent;
      default:
        return COLORS.warning;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={12} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={12} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#FFD700" />);
    }

    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Badge */}
        {badge && (
          <View style={[styles.badge, { backgroundColor: getBadgeColor(badge) }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        {/* Discount */}
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}</Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={onToggleFavorite}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={isFavorite ? COLORS.primary : COLORS.textLight} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        
        {/* Rating */}
        {rating && (
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(rating)}
            </View>
            <Text style={styles.ratingText}>({reviews || 0})</Text>
          </View>
        )}

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
          )}
        </View>

        {/* Stock Status */}
        {!inStock && <Text style={styles.outOfStock}>Out of Stock</Text>}

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            !inStock && styles.addToCartButtonDisabled
          ]} 
          onPress={onAddToCart}
          disabled={!inStock}
        >
          <Ionicons 
            name="bag-add-outline" 
            size={16} 
            color={inStock ? COLORS.background : COLORS.textLight} 
          />
          <Text style={[
            styles.addToCartText,
            !inStock && styles.addToCartTextDisabled
          ]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  imageContainer: {
    position: 'relative',
    height: cardWidth * 1.2,
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: SIZES.md,
    left: SIZES.md,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
  },
  badgeText: {
    color: COLORS.background,
    fontSize: SIZES.textXs,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: SIZES.md,
    right: SIZES.md,
    backgroundColor: COLORS.warning,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
  },
  discountText: {
    color: COLORS.background,
    fontSize: SIZES.textXs,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: SIZES.md,
    right: SIZES.md,
    backgroundColor: COLORS.background,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  content: {
    padding: SIZES.md,
  },
  name: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: SIZES.xs,
  },
  ratingText: {
    fontSize: SIZES.textXs,
    color: COLORS.textLight,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  price: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SIZES.sm,
  },
  originalPrice: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  outOfStock: {
    fontSize: SIZES.textXs,
    color: COLORS.error,
    fontWeight: '600',
    marginBottom: SIZES.sm,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusSm,
  },
  addToCartButtonDisabled: {
    backgroundColor: COLORS.backgroundGray,
  },
  addToCartText: {
    color: COLORS.background,
    fontSize: SIZES.textSm,
    fontWeight: '600',
    marginLeft: SIZES.xs,
  },
  addToCartTextDisabled: {
    color: COLORS.textLight,
  },
});
