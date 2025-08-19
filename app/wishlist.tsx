import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'Elegant Evening Dress',
    brand: 'Zara',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1566479179817-1ce0a6edfaa5?w=400&h=600&fit=crop',
    inStock: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '2',
    name: 'Casual Summer Shirt',
    brand: 'H&M',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
    inStock: true,
    rating: 4.3,
    reviewCount: 67
  },
  {
    id: '3',
    name: 'Designer Handbag',
    brand: 'Michael Kors',
    price: 199.99,
    originalPrice: 259.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop',
    inStock: false,
    rating: 4.9,
    reviewCount: 89
  },
  {
    id: '4',
    name: 'Cozy Winter Sweater',
    brand: 'Uniqlo',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
    inStock: true,
    rating: 4.6,
    reviewCount: 156
  }
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);

  const removeFromWishlist = (itemId: string) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this item from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setWishlistItems(items => items.filter(item => item.id !== itemId));
          }
        }
      ]
    );
  };

  const addToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      Alert.alert('Out of Stock', 'This item is currently out of stock.');
      return;
    }
    
    Alert.alert(
      'Added to Cart',
      `${item.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        {
          text: 'View Cart',
          onPress: () => router.push('/(tabs)/cart-new')
        }
      ]
    );
  };

  const WishlistItemCard = ({ item }: { item: WishlistItem }) => (
    <View style={styles.itemCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        {!item.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="heart" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={COLORS.warning} />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !item.inStock && styles.addToCartButtonDisabled
          ]}
          onPress={() => addToCart(item)}
          disabled={!item.inStock}
        >
          <Ionicons 
            name={item.inStock ? "cart-outline" : "alert-circle-outline"} 
            size={16} 
            color={item.inStock ? COLORS.background : COLORS.textLight} 
          />
          <Text style={[
            styles.addToCartText,
            !item.inStock && styles.addToCartTextDisabled
          ]}>
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>My Wishlist</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Save items you love by tapping the heart icon
          </Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
      </View>

      {/* Wishlist Items */}
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistItemCard item={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemsContainer}
        columnWrapperStyle={styles.row}
      />

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.addAllButton}
          onPress={() => {
            const inStockItems = wishlistItems.filter(item => item.inStock);
            if (inStockItems.length === 0) {
              Alert.alert('No Items Available', 'No items in your wishlist are currently in stock.');
              return;
            }
            Alert.alert(
              'Add All to Cart',
              `Add all ${inStockItems.length} available items to cart?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Add All',
                  onPress: () => {
                    Alert.alert('Success', `${inStockItems.length} items added to cart!`);
                  }
                }
              ]
            );
          }}
        >
          <Text style={styles.addAllButtonText}>Add All to Cart</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
  },
  backButton: {
    padding: SIZES.sm,
  },
  title: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  itemCount: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  placeholder: {
    width: 40,
  },
  itemsContainer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
  },
  outOfStockText: {
    color: COLORS.background,
    fontSize: SIZES.textBase,
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    top: SIZES.md,
    right: SIZES.md,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusFull,
    padding: SIZES.sm,
    ...SHADOWS.small,
  },
  itemDetails: {
    padding: SIZES.lg,
  },
  itemBrand: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  itemName: {
    fontSize: SIZES.textBase,
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
  rating: {
    fontSize: SIZES.textSm,
    color: COLORS.textPrimary,
    marginLeft: SIZES.xs,
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    marginLeft: SIZES.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  price: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
    marginLeft: SIZES.sm,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusSm,
    paddingVertical: SIZES.sm,
  },
  addToCartButtonDisabled: {
    backgroundColor: COLORS.backgroundLight,
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
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.large,
  },
  addAllButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
  },
  addAllButtonText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
  
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  emptyTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  emptySubtitle: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
  },
  shopButtonText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
});
