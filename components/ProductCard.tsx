import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import { ProductSizeModal } from './ProductSizeModal';

const { width } = Dimensions.get('window');
const cardWidth = (width - SIZES.lg * 3) / 2;

interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  isFavorite?: boolean;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  onPress_backup?: () => void;
}

export function ProductCard({ 
  product, 
  onPress, 
  onAddToCart, 
  onToggleFavorite,
  onPress_backup
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [modalVisible, setModalVisible] = useState(false);

  // Default sizes if not provided
  const productWithSizes = {
    ...product,
    sizes: product.sizes || ['S', 'M', 'L', 'XL']
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product.id);
  };

  const handleAddToCartPress = () => {
    setModalVisible(true);
  };

  const handleModalAddToCart = (productId: string, size: string) => {
    console.log(`Added product ${productId} with size ${size} to cart`);
    Alert.alert('Success', `${product.name} (Size: ${size}) added to cart!`);
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
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={onPress || onPress_backup}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#FF6B6B" : COLORS.textLight} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          {product.brand && (
            <Text style={styles.brandName}>{product.brand}</Text>
          )}
          <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
          
          {product.rating && (
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(product.rating)}
              </View>
              <Text style={styles.ratingText}>({product.reviews || 0})</Text>
            </View>
          )}
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddToCartPress}
      >
        <Ionicons name="add" size={20} color={COLORS.background} />
      </TouchableOpacity>

      <ProductSizeModal
        visible={modalVisible}
        product={productWithSizes}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleModalAddToCart}
      />
    </View>
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
  card: {
    flex: 1,
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
  contentContainer: {
    padding: SIZES.md,
    paddingBottom: SIZES.lg,
  },
  brandName: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: SIZES.textSm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: SIZES.xs,
  },
  ratingText: {
    fontSize: SIZES.textXs,
    color: COLORS.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  originalPrice: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  addButton: {
    position: 'absolute',
    bottom: SIZES.md,
    right: SIZES.md,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
});
