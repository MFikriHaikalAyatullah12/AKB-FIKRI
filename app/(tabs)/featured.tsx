import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ProductSizeModal } from '../../components/ProductSizeModal';

const { width } = Dimensions.get('window');

const featuredCollections = [
  {
    id: 'new-collection',
    title: 'New collection',
    subtitle: 'Fresh styles arriving daily',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
    type: 'large'
  },
  {
    id: 'summer-sale',
    title: 'Summer sale',
    subtitle: 'Up to 50% off',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=250&fit=crop',
    type: 'small',
    color: '#FF6B6B'
  },
  {
    id: 'mens-hoodies',
    title: "Men's hoodies",
    subtitle: 'Comfort meets style',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=250&fit=crop',
    type: 'medium'
  },
  {
    id: 'black-collection',
    title: 'Black',
    subtitle: 'Timeless elegance',
    image: 'https://images.unsplash.com/photo-1494955464529-790512c65305?w=200&h=400&fit=crop',
    type: 'tall'
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Silk Dress',
    price: 299.99,
    originalPrice: 450.00,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
    rating: 4.9,
    reviews: 342,
    badge: 'FEATURED',
    discount: '33%',
    category: 'Dresses',
    isFavorite: false,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Designer Leather Jacket',
    price: 189.99,
    originalPrice: 280.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 256,
    badge: 'LUXURY',
    discount: '32%',
    category: 'Outerwear',
    isFavorite: true,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '3',
    name: 'Athletic Performance Set',
    price: 79.99,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1506629905587-4b9d14f5e142?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 189,
    badge: 'BESTSELLER',
    discount: '33%',
    category: 'Activewear',
    isFavorite: false,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '4',
    name: 'Vintage Denim Collection',
    price: 129.99,
    originalPrice: 200.00,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 145,
    badge: 'TRENDING',
    discount: '35%',
    category: 'Pants',
    isFavorite: false,
    inStock: true,
    sizes: ['26', '28', '30', '32', '34']
  },
  {
    id: '5',
    name: 'Limited Edition Sneakers',
    price: 159.99,
    originalPrice: 240.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
    rating: 4.9,
    reviews: 423,
    badge: 'LIMITED',
    discount: '33%',
    category: 'Shoes',
    isFavorite: true,
    inStock: true,
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: '6',
    name: 'Handcrafted Jewelry Set',
    price: 89.99,
    originalPrice: 140.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 98,
    badge: 'ARTISAN',
    discount: '36%',
    category: 'Accessories',
    isFavorite: false,
    inStock: true,
    sizes: ['One Size']
  }
];

export default function FeaturedPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['2', '5']);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string, size: string) => {
    console.log(`Added product ${productId} with size ${size} to cart`);
  };

  const openSizeModal = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'FEATURED': return '#FF6B6B';
      case 'LUXURY': return '#FFD700';
      case 'BESTSELLER': return '#4ECDC4';
      case 'TRENDING': return '#9C27B0';
      case 'LIMITED': return '#FF5722';
      case 'ARTISAN': return '#795548';
      default: return '#4ECDC4';
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
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Discover Amazing</Text>
          <Text style={styles.headerTitle}>Featured Items</Text>
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => router.push('/search')}
        >
          <Ionicons name="filter-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Featured Collections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Collections</Text>
        <View style={styles.collectionsContainer}>
          {/* New Collection - Large Card */}
          <TouchableOpacity
            style={styles.largeCollectionCard}
            onPress={() => router.push('/featured/new-collection')}
          >
            <Image 
              source={{ uri: featuredCollections[0].image }} 
              style={styles.largeCollectionImage}
            />
            <View style={styles.largeCollectionOverlay}>
              <Text style={styles.largeCollectionTitle}>{featuredCollections[0].title}</Text>
            </View>
          </TouchableOpacity>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Summer Sale */}
              <TouchableOpacity
                style={[styles.smallCollectionCard, { backgroundColor: featuredCollections[1].color }]}
                onPress={() => router.push('/featured/summer-sale')}
              >
                <Text style={styles.smallCollectionTitle}>{featuredCollections[1].title}</Text>
              </TouchableOpacity>

              {/* Men's Hoodies */}
              <TouchableOpacity
                style={styles.mediumCollectionCard}
                onPress={() => router.push('/featured/mens-hoodies')}
              >
                <Image 
                  source={{ uri: featuredCollections[2].image }} 
                  style={styles.mediumCollectionImage}
                />
                <View style={styles.mediumCollectionOverlay}>
                  <Text style={styles.mediumCollectionTitle}>{featuredCollections[2].title}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Right Column - Black Collection */}
            <TouchableOpacity
              style={styles.tallCollectionCard}
              onPress={() => router.push('/featured/black-collection')}
            >
              <Image 
                source={{ uri: featuredCollections[3].image }} 
                style={styles.tallCollectionImage}
              />
              <View style={styles.tallCollectionOverlay}>
                <Text style={styles.tallCollectionTitle}>{featuredCollections[3].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/user/${product.id}`)}
            >
              {/* Product Badges */}
              <View style={[styles.badge, { backgroundColor: getBadgeColor(product.badge) }]}>
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>
              
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{product.discount}</Text>
              </View>
              
              {/* Favorite Button */}
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(product.id)}
              >
                <Ionicons 
                  name={favorites.includes(product.id) ? "heart" : "heart-outline"} 
                  size={20} 
                  color={favorites.includes(product.id) ? "#FF6B6B" : "#999"} 
                />
              </TouchableOpacity>
              
              <Image source={{ uri: product.image }} style={styles.productImage} />
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                
                {/* Rating */}
                <View style={styles.ratingContainer}>
                  <View style={styles.starsContainer}>
                    {renderStars(product.rating)}
                  </View>
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <Text style={styles.reviewsText}>({product.reviews})</Text>
                </View>
                
                {/* Price */}
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                  <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                </View>
                
                {/* Add to Cart Button */}
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={() => openSizeModal(product)}
                >
                  <Ionicons name="bag-add-outline" size={18} color="#fff" />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <View style={styles.offersContainer}>
          <View style={styles.offerCard}>
            <Ionicons name="flash" size={40} color="#FFA726" />
            <Text style={styles.offerTitle}>Flash Sale</Text>
            <Text style={styles.offerSubtitle}>24 hours only</Text>
            <Text style={styles.offerDiscount}>Up to 50% OFF</Text>
          </View>
          
          <View style={styles.offerCard}>
            <Ionicons name="gift" size={40} color="#4ECDC4" />
            <Text style={styles.offerTitle}>Free Gift</Text>
            <Text style={styles.offerSubtitle}>With every purchase</Text>
            <Text style={styles.offerDiscount}>Over $100</Text>
          </View>
        </View>
      </View>

      {/* Product Size Modal */}
      <ProductSizeModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleAddToCart}
      />
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
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  filterButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 20,
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
  collectionsContainer: {
    marginBottom: 15,
  },
  largeCollectionCard: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  largeCollectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  largeCollectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  largeCollectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  smallCollectionCard: {
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  smallCollectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  mediumCollectionCard: {
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  mediumCollectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mediumCollectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
  },
  mediumCollectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tallCollectionCard: {
    width: (width - 45) / 2,
    height: 260,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  tallCollectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tallCollectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
  },
  tallCollectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 45,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 12,
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
  starsContainer: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#999',
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
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 15,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  offersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: (width - 45) / 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  offerDiscount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 8,
  },
});
