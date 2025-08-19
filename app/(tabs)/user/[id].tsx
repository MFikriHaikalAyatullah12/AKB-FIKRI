import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');

const productData = {
  id: '1',
  name: 'Short dress',
  brand: 'H&M',
  price: 19.99,
  originalPrice: 29.99,
  description: 'Short dress in soft woven fabric with decorative buttons down the front and a tie belt.',
  images: [
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#001f3f' },
  ],
  rating: 4.5,
  reviews: 128,
  inStock: true,
};

export default function ProductDetailsPage() {
  const { id } = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const product = productData; // In real app, fetch by id

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setShowSizeModal(false);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeModal(true);
      return;
    }
    
    Alert.alert(
      'Added to Cart!',
      `${product.name} has been added to your cart.\nSize: ${selectedSize}\nColor: ${selectedColor || 'Default'}\nQuantity: ${quantity}`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') }
      ]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />);
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[selectedImageIndex] }} 
            style={styles.productImage}
          />
          
          {/* Favorite Button */}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? COLORS.primary : COLORS.textPrimary} 
            />
          </TouchableOpacity>
        </View>

        {/* Image Thumbnails */}
        <View style={styles.thumbnailContainer}>
          {product.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                selectedImageIndex === index && styles.thumbnailSelected
              ]}
              onPress={() => setSelectedImageIndex(index)}
            >
              <Image source={{ uri: image }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brandName}>{product.brand}</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>({product.reviews})</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Size Selector */}
          <View style={styles.selectorContainer}>
            <Text style={styles.selectorTitle}>Select size</Text>
            <TouchableOpacity 
              style={styles.sizeSelectionButton}
              onPress={() => setShowSizeModal(true)}
            >
              <Text style={[
                styles.sizeSelectionButtonText,
                selectedSize && { color: COLORS.textPrimary }
              ]}>
                {selectedSize || 'Choose size'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Color Selector */}
          {product.colors && (
            <View style={styles.selectorContainer}>
              <Text style={styles.selectorTitle}>Size info</Text>
              <View style={styles.colorContainer}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color.name}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color.hex },
                      selectedColor === color.name && styles.colorButtonSelected
                    ]}
                    onPress={() => handleColorSelect(color.name)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>

      {/* Size Selection Modal */}
      <Modal
        visible={showSizeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSizeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowSizeModal(false)}>
                <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{product.name}</Text>
              <TouchableOpacity>
                <Ionicons name="share-outline" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Product Image and Info */}
            <View style={styles.modalProductSection}>
              <Image 
                source={{ uri: product.images[selectedImageIndex] }}
                style={styles.modalProductImage}
              />
              <View style={styles.modalProductInfo}>
                <Text style={styles.modalBrandName}>{product.brand}</Text>
                <View style={styles.modalRatingContainer}>
                  <View style={styles.starsContainer}>
                    {renderStars(product.rating)}
                  </View>
                  <Text style={styles.ratingText}>({product.reviews})</Text>
                </View>
                <Text style={styles.modalPrice}>${product.price}</Text>
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
                onPress={() => {
                  if (selectedSize) {
                    setShowSizeModal(false);
                    handleAddToCart();
                  }
                }}
                disabled={!selectedSize}
              >
                <Text style={styles.modalAddToCartText}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.background,
  },
  backButton: {
    padding: SIZES.sm,
  },
  shareButton: {
    padding: SIZES.sm,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.5,
    backgroundColor: COLORS.backgroundLight,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: SIZES.xl,
    right: SIZES.xl,
    backgroundColor: COLORS.background,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
  },
  thumbnail: {
    width: 60,
    height: 80,
    borderRadius: SIZES.radiusSm,
    marginRight: SIZES.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: COLORS.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    padding: SIZES.lg,
  },
  productName: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  brandName: {
    fontSize: SIZES.textLg,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: SIZES.sm,
  },
  ratingText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  price: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SIZES.md,
  },
  originalPrice: {
    fontSize: SIZES.textLg,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  selectorContainer: {
    marginBottom: SIZES.xl,
  },
  selectorTitle: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  sizeSelectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sizeSelectionButtonText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  sizeContainer: {
    flexDirection: 'row',
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sizeText: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sizeTextSelected: {
    color: COLORS.background,
  },
  colorContainer: {
    flexDirection: 'row',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.md,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: COLORS.primary,
  },
  bottomActions: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.large,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
  
  // Modal Styles
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
  modalPrice: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
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
