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
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { CategoryCard } from '../../components/CategoryCard';
import { LoadingScreen } from '../../components/LoadingScreen';
import { ProductCard } from '../../components/ProductCard';
import { SaleBanner } from '../../components/SaleBanner';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    return <LoadingScreen message="Loading fashion store..." />;
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/(tabs)/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      Alert.alert('Search', 'Please enter a search term');
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/(tabs)/user/${productId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/(tabs)/categories/${categoryId}`);
  };

  const handleAddToCart = (productId: string) => {
    Alert.alert('Success', 'Item added to cart!');
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
      {...item}
      onPress={() => handleProductPress(item.id)}
      onAddToCart={() => handleAddToCart(item.id)}
      onToggleFavorite={() => handleToggleFavorite(item.id)}
      isFavorite={favorites.includes(item.id)}
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
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="bag-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
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
