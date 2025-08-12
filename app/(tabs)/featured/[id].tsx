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

// Sample featured collections data
const featuredData = {
  '1': { // Summer Collection
    title: 'Summer Collection',
    subtitle: 'Hot deals this season',
    color: '#FF6B6B',
    description: 'Discover our hottest summer picks with amazing discounts. Perfect for beach days, summer parties, and casual outings.',
    products: [
      {
        id: '1',
        name: 'Beach Summer Dress',
        price: '$79.99',
        originalPrice: '$119.99',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
        discount: '33% OFF',
        rating: 4.8,
        reviews: 156,
      },
      {
        id: '2',
        name: 'Linen Shorts',
        price: '$39.99',
        originalPrice: '$59.99',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop',
        discount: '33% OFF',
        rating: 4.5,
        reviews: 89,
      },
      {
        id: '3',
        name: 'Summer Sandals',
        price: '$69.99',
        originalPrice: '$99.99',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop',
        discount: '30% OFF',
        rating: 4.6,
        reviews: 203,
      },
      {
        id: '4',
        name: 'Straw Hat',
        price: '$29.99',
        originalPrice: '$49.99',
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=500&fit=crop',
        discount: '40% OFF',
        rating: 4.3,
        reviews: 67,
      },
    ],
  },
  '2': { // New Arrivals
    title: 'New Arrivals',
    subtitle: 'Latest fashion trends',
    color: '#4ECDC4',
    description: 'Be the first to discover our newest fashion pieces. Stay ahead of the trends with our latest arrivals.',
    products: [
      {
        id: '5',
        name: 'Trendy Blazer',
        price: '$149.99',
        originalPrice: '$199.99',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        discount: '25% OFF',
        rating: 4.7,
        reviews: 124,
        isNew: true,
      },
      {
        id: '6',
        name: 'Designer Jeans',
        price: '$119.99',
        originalPrice: '$159.99',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
        discount: '25% OFF',
        rating: 4.6,
        reviews: 98,
        isNew: true,
      },
      {
        id: '7',
        name: 'Statement Earrings',
        price: '$49.99',
        originalPrice: '$79.99',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop',
        discount: '38% OFF',
        rating: 4.8,
        reviews: 45,
        isNew: true,
      },
    ],
  },
};

export default function FeaturedPage() {
  const { id, title } = useLocalSearchParams();
  const featured = useMemo(() => 
    featuredData[id as keyof typeof featuredData] || featuredData['1'], 
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
      <StatusBar barStyle="light-content" backgroundColor={featured.color} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: featured.color }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title || featured.title}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons 
            name={featured.title === 'Summer Collection' ? 'sunny' : 'sparkles'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Banner */}
        <View style={[styles.banner, { backgroundColor: featured.color }]}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{featured.title}</Text>
            <Text style={styles.bannerSubtitle}>{featured.subtitle}</Text>
            <Text style={styles.bannerDescription}>{featured.description}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{featured.products.length}</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>Up to 40%</Text>
                <Text style={styles.statLabel}>Off</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Products */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.productsGrid}>
            {featured.products.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.productCard}
                onPress={() => handleProductPress(product.id)}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  {product.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{product.discount}</Text>
                    </View>
                  )}
                  {'isNew' in product && product.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newText}>NEW</Text>
                    </View>
                  )}
                </View>
                
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
                  
                  <TouchableOpacity style={[styles.addToCartBtn, { backgroundColor: featured.color }]}>
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
  favoriteButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  banner: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12,
    textAlign: 'center',
  },
  bannerDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 2,
  },
  productsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
