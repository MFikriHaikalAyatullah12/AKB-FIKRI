import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const categories = [
  { 
    id: '1', 
    name: 'Dresses', 
    icon: 'woman-outline', 
    color: '#FF6B6B',
    count: '120 items',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop'
  },
  { 
    id: '2', 
    name: 'Tops', 
    icon: 'shirt-outline', 
    color: '#4ECDC4',
    count: '89 items',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
  },
  { 
    id: '3', 
    name: 'Pants', 
    icon: 'fitness-outline', 
    color: '#45B7D1',
    count: '156 items',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop'
  },
  { 
    id: '4', 
    name: 'Shoes', 
    icon: 'footsteps-outline', 
    color: '#96CEB4',
    count: '203 items',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop'
  },
  { 
    id: '5', 
    name: 'Accessories', 
    icon: 'diamond-outline', 
    color: '#FFEAA7',
    count: '67 items',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop'
  },
  { 
    id: '6', 
    name: 'Bags', 
    icon: 'bag-handle-outline', 
    color: '#E17055',
    count: '94 items',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
  }
];

const featuredCategories = [
  {
    id: '1',
    title: 'Summer Collection',
    subtitle: 'Hot deals this season',
    color: '#FF6B6B',
    icon: 'sunny-outline'
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Latest fashion trends',
    color: '#4ECDC4',
    icon: 'sparkles-outline'
  }
];

export default function CategoriesPage() {
  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/(tabs)/categories/[id]',
      params: { id: categoryId, name: categoryName }
    });
  };

  const handleFeaturedPress = (featuredId: string, title: string) => {
    router.push({
      pathname: '/(tabs)/featured/[id]',
      params: { id: featuredId, title: title }
    });
  };

  const handleSearchPress = () => {
    router.push('/(tabs)/search');
  };

  const handleTrendPress = (trend: string) => {
    router.push({
      pathname: '/(tabs)/trends',
      params: { trend: trend }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Featured Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <View style={styles.featuredContainer}>
          {featuredCategories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.featuredCard, { backgroundColor: item.color }]}
              onPress={() => handleFeaturedPress(item.id, item.title)}
            >
              <View style={styles.featuredContent}>
                <Ionicons name={item.icon as any} size={32} color="#fff" />
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* All Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.id, category.name)}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon as any} size={24} color="#fff" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Popular Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Trends</Text>
        <View style={styles.trendsContainer}>
          <TouchableOpacity 
            style={styles.trendCard}
            onPress={() => handleTrendPress('#SummerVibes')}
          >
            <Text style={styles.trendText}>#SummerVibes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.trendCard}
            onPress={() => handleTrendPress('#CasualWear')}
          >
            <Text style={styles.trendText}>#CasualWear</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.trendCard}
            onPress={() => handleTrendPress('#StreetStyle')}
          >
            <Text style={styles.trendText}>#StreetStyle</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.trendCard}
            onPress={() => handleTrendPress('#Minimalist')}
          >
            <Text style={styles.trendText}>#Minimalist</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchButton: {
    padding: 5,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuredContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredCard: {
    width: (width - 45) / 2,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  featuredContent: {
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  featuredSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 45) / 2,
    height: 150,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  trendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trendCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  trendText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
});
