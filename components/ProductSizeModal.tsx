import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string[];
  rating?: number;
  reviews?: number;
}

interface ProductSizeModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (productId: string, size: string) => void;
}

export function ProductSizeModal({ 
  visible, 
  product, 
  onClose, 
  onAddToCart 
}: ProductSizeModalProps) {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !product) {
      Alert.alert('Size Required', 'Please select a size before adding to cart');
      return;
    }
    
    onAddToCart(product.id, selectedSize);
    setSelectedSize('');
    onClose();
  };

  const handleViewProduct = () => {
    if (product) {
      onClose();
      router.push(`/(tabs)/user/${product.id}`);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={14} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={14} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#FFD700" />);
    }

    return stars;
  };

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{product.name}</Text>
            <TouchableOpacity onPress={handleViewProduct}>
              <Ionicons name="eye-outline" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Product Image and Info */}
          <View style={styles.modalProductSection}>
            <TouchableOpacity onPress={handleViewProduct}>
              <Image 
                source={{ uri: product.image }}
                style={styles.modalProductImage}
              />
            </TouchableOpacity>
            <View style={styles.modalProductInfo}>
              {product.brand && (
                <Text style={styles.modalBrandName}>{product.brand}</Text>
              )}
              {product.rating && (
                <View style={styles.modalRatingContainer}>
                  <View style={styles.starsContainer}>
                    {renderStars(product.rating)}
                  </View>
                  <Text style={styles.ratingText}>({product.reviews || 0})</Text>
                </View>
              )}
              <View style={styles.priceContainer}>
                <Text style={styles.modalPrice}>${product.price.toFixed(2)}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeSelectionSection}>
            <Text style={styles.selectSizeTitle}>Select size</Text>
            <View style={styles.modalSizeContainer}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.modalSizeButton,
                    selectedSize === size && styles.modalSizeButtonSelected
                  ]}
                  onPress={() => handleSizeSelect(size)}
                >
                  <Text style={[
                    styles.modalSizeText,
                    selectedSize === size && styles.modalSizeTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Size Info */}
            <TouchableOpacity style={styles.sizeInfoButton}>
              <Text style={styles.sizeInfoText}>Size info</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Modal Add to Cart Button */}
          <View style={styles.modalBottomActions}>
            <TouchableOpacity 
              style={[
                styles.modalAddToCartButton,
                !selectedSize && styles.modalAddToCartButtonDisabled
              ]}
              onPress={handleAddToCart}
              disabled={!selectedSize}
            >
              <Text style={styles.modalAddToCartText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SIZES.lg,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  modalTitle: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SIZES.md,
  },
  modalProductSection: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  modalProductImage: {
    width: 80,
    height: 100,
    borderRadius: SIZES.radiusSm,
    marginRight: SIZES.lg,
  },
  modalProductInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  modalBrandName: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  modalRatingContainer: {
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
  },
  modalPrice: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: SIZES.sm,
  },
  originalPrice: {
    fontSize: SIZES.textBase,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  sizeSelectionSection: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
  },
  selectSizeTitle: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.lg,
  },
  modalSizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.lg,
  },
  modalSizeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
    marginBottom: SIZES.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modalSizeButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  modalSizeText: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  modalSizeTextSelected: {
    color: COLORS.background,
  },
  sizeInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundLight,
  },
  sizeInfoText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  modalBottomActions: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  modalAddToCartButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAddToCartButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  modalAddToCartText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
});
