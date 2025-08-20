import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CategoryCard } from '../../components/CategoryCard';
import { LoadingScreen } from '../../components/LoadingScreen';
import { ProductCard } from '../../components/ProductCard';
import { ProductSizeModal } from '../../components/ProductSizeModal';
import { SaleBanner } from '../../components/SaleBanner';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { loadAdditionalFonts } from '../../utils/fontLoader';

const { width } = Dimensions.get('window');

// Sample data matching the design
const featuredProducts = [
  {
    id: '1',
    name: 'Evening Dress',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 128,
    badge: 'SALE',
    discount: '31%',
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Sport Dress',
    price: 129.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 256,
    badge: 'NEW',
    discount: '35%',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Summer T-Shirt',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
    rating: 4.2,
    reviews: 89,
    badge: 'SALE',
    discount: '29%',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '4',
    name: 'Casual Jeans',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 167,
    badge: 'NEW',
    discount: '20%',
    inStock: true,
    sizes: ['28', '30', '32', '34', '36']
  },
];

const categories = [
  {
    id: '1',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
    itemCount: 120,
  },
  {
    id: '2',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    itemCount: 89,
  },
  {
    id: '3',
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=300&fit=crop',
    itemCount: 56,
  },
  {
    id: '4',
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    itemCount: 203,
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load additional fonts in the background without waiting
        loadAdditionalFonts().catch(console.warn);
        
        // Remove artificial delay - load immediately
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingScreen minimal={true} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning-outline" size={60} color={COLORS.primary} />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
          }}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/user/${productId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/(tabs)/categories/${categoryId}`);
  };

  const handleAddToCart = (productId: string, size: string) => {
    Alert.alert('Success', `Item (Size: ${size}) added to cart!`);
  };

  const openSizeModal = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderProductCard = ({ item }: { item: typeof featuredProducts[0] }) => (
    <ProductCard
      product={{
        ...item,
        isFavorite: favorites.includes(item.id)
      }}
      onPress={() => handleProductPress(item.id)}
      onAddToCart={(product) => openSizeModal(product)}
      onToggleFavorite={() => handleToggleFavorite(item.id)}
    />
  );

  const renderCategoryCard = ({ item }: { item: typeof categories[0] }) => (
    <CategoryCard
      {...item}
      onPress={() => handleCategoryPress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Fashion</Text>
          
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push('/(tabs)/cart-new')}
          >
            <Ionicons name="bag-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.searchBar}
            onPress={() => router.push('/(tabs)/search')}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color={COLORS.textLight} />
            <Text style={styles.searchPlaceholder}>Search for products...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Access Section */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.quickAccessTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => Alert.alert('Search', 'Use the search bar above to find products!')}
            >
              <Ionicons name="search" size={24} color={COLORS.primary} />
              <Text style={styles.quickAccessText}>Search</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => Alert.alert('Trending', 'Check Featured section for trending products!')}
            >
              <Ionicons name="trending-up" size={24} color={COLORS.primary} />
              <Text style={styles.quickAccessText}>Trending</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => Alert.alert('Reviews', 'Product reviews feature coming soon!')}
            >
              <Ionicons name="star" size={24} color={COLORS.primary} />
              <Text style={styles.quickAccessText}>Reviews</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => router.push('/(tabs)/about')}
            >
              <Ionicons name="grid" size={24} color={COLORS.primary} />
              <Text style={styles.quickAccessText}>Categories</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sale Banner */}
        <SaleBanner
          title="Fashion"
          subtitle="sale"
          buttonText="Shop"
          backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
          onPress={() => router.push('/(tabs)/featured')}
        />

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/featured')}>
            <Text style={styles.seeAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/about')}>
            <Text style={styles.seeAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.categoryRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Product Size Modal */}
      <ProductSizeModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    ...SHADOWS.small,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  menuButton: {
    padding: SIZES.sm,
  },
  headerTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  cartButton: {
    padding: SIZES.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
    marginRight: SIZES.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.md,
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: SIZES.md,
    fontSize: SIZES.textBase,
    color: COLORS.textLight,
  },
  filterButton: {
    backgroundColor: COLORS.backgroundLight,
    padding: SIZES.md,
    borderRadius: SIZES.radiusFull,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    marginTop: SIZES.xl,
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: SIZES.textBase,
    color: COLORS.primary,
    fontWeight: '600',
  },
  productsContainer: {
    paddingHorizontal: SIZES.lg,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  categoriesContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xxl,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  quickAccessContainer: {
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.md,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
  },
  quickAccessTitle: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quickAccessButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    minWidth: 70,
    ...SHADOWS.small,
  },
  quickAccessText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: SIZES.xs,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.xl,
  },
  errorTitle: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SIZES.xl,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: SIZES.textLg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xxl,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.xxl,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.radiusFull,
    ...SHADOWS.medium,
  },
  retryButtonText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
});
