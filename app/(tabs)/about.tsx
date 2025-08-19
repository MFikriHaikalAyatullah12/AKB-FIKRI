import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { CategoryCard } from '../../components/CategoryCard';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

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
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    itemCount: 234,
  },
  {
    id: '5',
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    itemCount: 203,
  },
  {
    id: '6',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=300&fit=crop',
    itemCount: 67,
  },
];

const filterOptions = [
  { id: 'all', name: 'VIEW ALL ITEMS', active: true },
  { id: 'women', name: 'Women', active: false },
  { id: 'men', name: 'Men', active: false },
  { id: 'kids', name: 'Kids', active: false },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/(tabs)/categories/${categoryId}`);
  };

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(filterId);
    if (filterId === 'all') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(cat => 
        cat.name.toLowerCase().includes(filterId.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const renderCategoryCard = ({ item }: { item: typeof categories[0] }) => (
    <CategoryCard
      {...item}
      onPress={() => handleCategoryPress(item.id)}
    />
  );

  const renderFilterButton = (filter: typeof filterOptions[0]) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        filter.id === activeFilter && styles.filterButtonActive
      ]}
      onPress={() => handleFilterPress(filter.id)}
    >
      <Text style={[
        styles.filterButtonText,
        filter.id === activeFilter && styles.filterButtonTextActive
      ]}>
        {filter.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Categories</Text>
          
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
              placeholder="Search categories..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summer Sales Banner */}
        <View style={styles.saleBanner}>
          <Text style={styles.saleBannerTitle}>SUMMER SALES</Text>
          <Text style={styles.saleBannerSubtitle}>Up to 50% off</Text>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContainer}
          >
            {filterOptions.map(renderFilterButton)}
          </ScrollView>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={filteredCategories}
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
  backButton: {
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
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.md,
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
  },
  saleBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.lg,
    marginBottom: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.xxl,
    paddingHorizontal: SIZES.xl,
    alignItems: 'center',
  },
  saleBannerTitle: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.xs,
  },
  saleBannerSubtitle: {
    fontSize: SIZES.textLg,
    color: COLORS.background,
    opacity: 0.9,
  },
  filterContainer: {
    marginBottom: SIZES.xl,
  },
  filterScrollContainer: {
    paddingHorizontal: SIZES.lg,
  },
  filterButton: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
    marginRight: SIZES.md,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: SIZES.textSm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterButtonTextActive: {
    color: COLORS.background,
  },
  categoriesContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xxl,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
});
