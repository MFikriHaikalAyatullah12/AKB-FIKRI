import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const featuredProducts = [
  {
    id: '1',
    name: 'High-Waisted Trousers',
    price: '$89.99',
    originalPrice: '$129.99',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 128,
    badge: 'NEW',
    discount: '31%',
    inStock: true,
    category: 'Pants'
  },
  {
    id: '2',
    name: 'Summer Collection Dress',
    price: '$129.99',
    originalPrice: '$199.99',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 256,
    badge: 'SALE',
    discount: '35%',
    inStock: true,
    category: 'Dresses'
  },
  {
    id: '3',
    name: 'Casual White Shirt',
    price: '$49.99',
    originalPrice: '$69.99',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
    rating: 4.3,
    reviews: 89,
    discount: '29%',
    inStock: true,
    category: 'Tops'
  },
  {
    id: '4',
    name: 'Elegant Black Dress',
    price: '$159.99',
    originalPrice: '$229.99',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 342,
    badge: 'HOT',
    discount: '30%',
    inStock: true,
    category: 'Dresses'
  },
  {
    id: '5',
    name: 'Sports Sneakers',
    price: '$79.99',
    originalPrice: '$119.99',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 145,
    badge: 'TRENDING',
    discount: '33%',
    inStock: true,
    category: 'Shoes'
  },
  {
    id: '6',
    name: 'Designer Handbag',
    price: '$199.99',
    originalPrice: '$299.99',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
    rating: 4.9,
    reviews: 78,
    badge: 'LUXURY',
    discount: '33%',
    inStock: false,
    category: 'Accessories'
  }
];

const categories = [
  { id: '1', name: 'Dresses', icon: 'woman-outline', color: '#FF6B6B', count: '120+' },
  { id: '2', name: 'Tops', icon: 'shirt-outline', color: '#4ECDC4', count: '89+' },
  { id: '3', name: 'Pants', icon: 'fitness-outline', color: '#45B7D1', count: '156+' },
  { id: '4', name: 'Shoes', icon: 'footsteps-outline', color: '#96CEB4', count: '203+' },
  { id: '5', name: 'Accessories', icon: 'watch-outline', color: '#FFEAA7', count: '75+' },
  { id: '6', name: 'Bags', icon: 'bag-outline', color: '#FF7675', count: '45+' },
];

const bannerData = [
  {
    id: '1',
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
    buttonText: 'Shop Now',
    color: '#FF6B6B',
    icon: 'sunny-outline'
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Fresh Styles Weekly',
    buttonText: 'Explore',
    color: '#4ECDC4',
    icon: 'sparkles-outline'
  },
  {
    id: '3',
    title: 'Free Shipping',
    subtitle: 'On orders over $100',
    buttonText: 'Learn More',
    color: '#45B7D1',
    icon: 'car-outline'
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      Alert.alert('Search', 'Please enter a search term');
    }
  };

  const addToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    Alert.alert('Success', 'Item added to cart!');
  };

  const isInCart = (productId: string) => cartItems.includes(productId);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'NEW': return '#4ECDC4';
      case 'SALE': return '#FF6B6B';
      case 'HOT': return '#FFA726';
      case 'TRENDING': return '#9C27B0';
      case 'LUXURY': return '#FFD700';
      default: return '#4ECDC4';
    }
  };
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Welcome back!</Text>
          <Text style={styles.headerTitle}>Fashion Store</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/cart')}
          >
            <Ionicons name="bag-outline" size={24} color="#fff" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search for clothing, shoes, accessories..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => router.push('/search')}
        >
          <Ionicons name="options-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* Enhanced Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <TouchableOpacity onPress={() => router.push('/about')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Ionicons name={category.icon as any} size={28} color="#fff" />
              <Text style={styles.categoryText}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Enhanced Banner with rotation */}
      <View style={styles.bannerContainer}>
        <View style={[styles.banner, { backgroundColor: bannerData[currentBanner].color }]}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{bannerData[currentBanner].title}</Text>
            <Text style={styles.bannerSubtitle}>{bannerData[currentBanner].subtitle}</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>{bannerData[currentBanner].buttonText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImageContainer}>
            <Ionicons name={bannerData[currentBanner].icon as any} size={60} color="#fff" />
          </View>
        </View>
        
        {/* Banner indicators */}
        <View style={styles.bannerIndicators}>
          {bannerData.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: currentBanner === index ? '#FF6B6B' : '#E0E0E0' }
              ]}
              onPress={() => setCurrentBanner(index)}
            />
          ))}
        </View>
      </View>

      {/* Enhanced Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => router.push('/featured')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/user/${product.id}`)}
            >
              {product.badge && (
                <View style={[styles.badge, { backgroundColor: getBadgeColor(product.badge) }]}>
                  <Text style={styles.badgeText}>{product.badge}</Text>
                </View>
              )}
              
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{product.discount}</Text>
                </View>
              )}
              
              <Image source={{ uri: product.image }} style={styles.productImage} />
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <Text style={styles.reviewsText}>({product.reviews})</Text>
                </View>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                  )}
                </View>
                
                <View style={styles.productActions}>
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => Alert.alert('Wishlist', 'Added to wishlist!')}
                  >
                    <Ionicons name="heart-outline" size={16} color="#FF6B6B" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.addToCartButton,
                      { backgroundColor: isInCart(product.id) ? '#4ECDC4' : '#FF6B6B' }
                    ]}
                    onPress={() => addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    <Ionicons 
                      name={isInCart(product.id) ? "checkmark" : "add"} 
                      size={16} 
                      color="#fff" 
                    />
                  </TouchableOpacity>
                </View>
                
                {!product.inStock && (
                  <Text style={styles.outOfStockText}>Out of Stock</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Collection Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Collection</Text>
        <View style={styles.collectionBanner}>
          <Text style={styles.collectionTitle}>Summer 2024</Text>
          <Text style={styles.collectionSubtitle}>Discover our latest trends</Text>
          <TouchableOpacity style={styles.collectionButton}>
            <Text style={styles.collectionButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGreeting: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFA726',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4ECDC4',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 5,
  },
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 90,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  categoryCount: {
    color: '#fff',
    fontSize: 11,
    opacity: 0.8,
    marginTop: 2,
  },
  bannerContainer: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  banner: {
    borderRadius: 20,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginVertical: 8,
  },
  bannerButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 10,
    elevation: 2,
  },
  bannerButtonText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bannerImageContainer: {
    marginLeft: 20,
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    width: (width - 45) / 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: 15,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 1,
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  reviewsText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  addToCartButton: {
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  collectionBanner: {
    backgroundColor: '#4ECDC4',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  collectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  collectionSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginVertical: 12,
    textAlign: 'center',
  },
  collectionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    elevation: 2,
  },
  collectionButtonText: {
    color: '#4ECDC4',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
