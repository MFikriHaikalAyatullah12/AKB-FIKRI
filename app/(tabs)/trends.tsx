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

// Sample trends data
const trendsData = {
  '#SummerVibes': {
    name: 'Summer Vibes',
    description: 'Embrace the summer spirit with vibrant colors and light fabrics',
    color: '#FF6B6B',
    hashtag: '#SummerVibes',
    posts: '2.3M',
    products: [
      {
        id: '1',
        name: 'Tropical Print Dress',
        price: '$89.99',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
        rating: 4.7,
        reviews: 156,
      },
      {
        id: '2',
        name: 'Beach Cover-up',
        price: '$49.99',
        image: 'https://images.unsplash.com/photo-1572804013427-4d90e024a684?w=400&h=500&fit=crop',
        rating: 4.5,
        reviews: 89,
      },
    ],
  },
  '#CasualWear': {
    name: 'Casual Wear',
    description: 'Comfortable and stylish pieces for everyday wear',
    color: '#4ECDC4',
    hashtag: '#CasualWear',
    posts: '1.8M',
    products: [
      {
        id: '3',
        name: 'Oversized Hoodie',
        price: '$59.99',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        rating: 4.6,
        reviews: 203,
      },
      {
        id: '4',
        name: 'Jogger Pants',
        price: '$39.99',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        rating: 4.4,
        reviews: 167,
      },
    ],
  },
  '#StreetStyle': {
    name: 'Street Style',
    description: 'Urban fashion with an edge - bold and confident',
    color: '#45B7D1',
    hashtag: '#StreetStyle',
    posts: '3.1M',
    products: [
      {
        id: '5',
        name: 'Leather Jacket',
        price: '$199.99',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop',
        rating: 4.8,
        reviews: 312,
      },
      {
        id: '6',
        name: 'Distressed Jeans',
        price: '$79.99',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
        rating: 4.5,
        reviews: 189,
      },
    ],
  },
  '#Minimalist': {
    name: 'Minimalist',
    description: 'Clean lines and simple elegance for the modern wardrobe',
    color: '#96CEB4',
    hashtag: '#Minimalist',
    posts: '1.5M',
    products: [
      {
        id: '7',
        name: 'White Button Shirt',
        price: '$69.99',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
        rating: 4.7,
        reviews: 234,
      },
      {
        id: '8',
        name: 'Black Trousers',
        price: '$89.99',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        rating: 4.6,
        reviews: 156,
      },
    ],
  },
};

const allTrends = [
  { name: '#SummerVibes', posts: '2.3M', color: '#FF6B6B' },
  { name: '#CasualWear', posts: '1.8M', color: '#4ECDC4' },
  { name: '#StreetStyle', posts: '3.1M', color: '#45B7D1' },
  { name: '#Minimalist', posts: '1.5M', color: '#96CEB4' },
  { name: '#Vintage', posts: '987K', color: '#FFEAA7' },
  { name: '#Bohemian', posts: '756K', color: '#E17055' },
];

export default function TrendsPage() {
  const { trend } = useLocalSearchParams();
  const trendData = useMemo(() => {
    if (trend && trendsData[trend as keyof typeof trendsData]) {
      return trendsData[trend as keyof typeof trendsData];
    }
    return null;
  }, [trend]);

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/user/${productId}`);
  };

  const handleTrendPress = (trendName: string) => {
    router.push(`/(tabs)/trends?trend=${encodeURIComponent(trendName)}`);
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

  if (trendData) {
    // Show specific trend details
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={trendData.color} />
        
        {/* Header */}
        <View style={[styles.header, { backgroundColor: trendData.color }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{trendData.hashtag}</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Trend Banner */}
          <View style={[styles.trendBanner, { backgroundColor: trendData.color }]}>
            <Text style={styles.trendTitle}>{trendData.name}</Text>
            <Text style={styles.trendDescription}>{trendData.description}</Text>
            <View style={styles.trendStats}>
              <Text style={styles.trendPosts}>{trendData.posts} posts</Text>
              <Ionicons name="trending-up" size={20} color="#fff" />
            </View>
          </View>

          {/* Products */}
          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>Trending Products</Text>
            <View style={styles.productsGrid}>
              {trendData.products.map((product) => (
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
                    
                    <Text style={styles.productPrice}>{product.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Show all trends
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending Now</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>What's Trending</Text>
          <Text style={styles.bannerSubtitle}>Discover the latest fashion trends</Text>
        </View>

        {/* Trends List */}
        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>Popular Trends</Text>
          {allTrends.map((trendItem, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.trendCard}
              onPress={() => handleTrendPress(trendItem.name)}
            >
              <View style={[styles.trendIcon, { backgroundColor: trendItem.color }]}>
                <Ionicons name="trending-up" size={24} color="#fff" />
              </View>
              <View style={styles.trendInfo}>
                <Text style={styles.trendName}>{trendItem.name}</Text>
                <Text style={styles.trendPostCount}>{trendItem.posts} posts</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#FF6B6B',
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
  shareButton: {
    padding: 5,
  },
  searchButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  trendBanner: {
    padding: 30,
    alignItems: 'center',
  },
  trendTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  trendDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  trendStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trendPosts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  trendsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  trendCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  trendIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trendInfo: {
    flex: 1,
  },
  trendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  trendPostCount: {
    fontSize: 14,
    color: '#666',
  },
  productsSection: {
    padding: 20,
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
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
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
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});
