import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Sample product data for each category
const categoryProducts = {
  '1': { // Dresses
    name: 'Dresses',
    color: '#FF6B6B',
    products: [
      {
        id: '1',
        name: 'Summer Floral Dress',
        price: '$89.99',
        originalPrice: '$129.99',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
        rating: 4.5,
        reviews: 128,
      },
      {
        id: '2',
        name: 'Elegant Evening Dress',
        price: '$159.99',
        originalPrice: '$199.99',
        image: 'https://images.unsplash.com/photo-1566479179817-c8b87c6495d4?w=400&h=500&fit=crop',
        rating: 4.8,
        reviews: 89,
      },
      {
        id: '3',
        name: 'Casual Day Dress',
        price: '$69.99',
        originalPrice: '$89.99',
        image: 'https://images.unsplash.com/photo-1572804013427-4d90e024a684?w=400&h=500&fit=crop',
        rating: 4.3,
        reviews: 156,
      },
      {
        id: '4',
        name: 'Maxi Bohemian Dress',
        price: '$119.99',
        originalPrice: '$149.99',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=500&fit=crop',
        rating: 4.6,
        reviews: 203,
      },
    ],
  },
  '2': { // Tops
    name: 'Tops',
    color: '#4ECDC4',
    products: [
      {
        id: '5',
        name: 'Cotton Basic Tee',
        price: '$29.99',
        originalPrice: '$39.99',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        rating: 4.2,
        reviews: 95,
      },
      {
        id: '6',
        name: 'Silk Blouse',
        price: '$79.99',
        originalPrice: '$99.99',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        rating: 4.7,
        reviews: 67,
      },
    ],
  },
  '3': { // Pants
    name: 'Pants',
    color: '#45B7D1',
    products: [
      {
        id: '7',
        name: 'High-Waisted Jeans',
        price: '$89.99',
        originalPrice: '$119.99',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        rating: 4.4,
        reviews: 234,
      },
      {
        id: '8',
        name: 'Formal Trousers',
        price: '$69.99',
        originalPrice: '$89.99',
        image: 'https://images.unsplash.com/photo-1506629905460-c126b5d5a498?w=400&h=500&fit=crop',
        rating: 4.5,
        reviews: 167,
      },
    ],
  },
  '4': { // Shoes
    name: 'Shoes',
    color: '#96CEB4',
    products: [
      {
        id: '9',
        name: 'Running Sneakers',
        price: '$129.99',
        originalPrice: '$159.99',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
        rating: 4.6,
        reviews: 312,
      },
      {
        id: '10',
        name: 'Leather Boots',
        price: '$199.99',
        originalPrice: '$249.99',
        image: 'https://images.unsplash.com/photo-1608256246200-53e8b47b0b5c?w=400&h=500&fit=crop',
        rating: 4.8,
        reviews: 189,
      },
    ],
  },
  '5': { // Accessories
    name: 'Accessories',
    color: '#FFEAA7',
    products: [
      {
        id: '11',
        name: 'Designer Handbag',
        price: '$159.99',
        originalPrice: '$199.99',
        image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=500&fit=crop',
        rating: 4.7,
        reviews: 123,
      },
    ],
  },
  '6': { // Bags
    name: 'Bags',
    color: '#E17055',
    products: [
      {
        id: '12',
        name: 'Travel Backpack',
        price: '$89.99',
        originalPrice: '$119.99',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        rating: 4.5,
        reviews: 267,
      },
    ],
  },
};

export default function CategoryPage() {
  const { id, name } = useLocalSearchParams();
  const categoryData = useMemo(() => 
    categoryProducts[id as keyof typeof categoryProducts] || categoryProducts['1'], 
    [id]
  );

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/user/${productId}`);
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={categoryData.color} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: categoryData.color }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name || categoryData.name}</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => router.push('/(tabs)/cart')}
        >
          <Ionicons name="bag-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Info */}
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{categoryData.name} Collection</Text>
          <Text style={styles.categorySubtitle}>
            {categoryData.products.length} products available
          </Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <View style={styles.productsGrid}>
            {categoryData.products.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.productCard}
                onPress={() => handleProductPress(product.id)}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {renderStars(product.rating)}
                    </View>
                    <Text style={styles.ratingText}>({product.reviews})</Text>
                  </View>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{product.price}</Text>
                    {product.originalPrice && (
                      <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                    )}
                  </View>
                  
                  <TouchableOpacity style={styles.addToCartBtn}>
                    <Ionicons name="add" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  categoryInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 16,
    color: '#666',
  },
  productsContainer: {
    paddingHorizontal: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
    position: 'relative',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    height: 35,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
