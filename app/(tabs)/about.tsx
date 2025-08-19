import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

const categories = [
  {
    id: '1',
    name: 'New',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop',
    backgroundColor: '#F8F9FA',
  },
  {
    id: '2',
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    backgroundColor: '#F8F9FA',
  },
  {
    id: '3',
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
    backgroundColor: '#F8F9FA',
  },
  {
    id: '4',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=200&fit=crop',
    backgroundColor: '#F8F9FA',
  },
  {
    id: '5',
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
    backgroundColor: '#F8F9FA',
  },
  {
    id: '6',
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1566479179817-c8b87c6495d4?w=300&h=200&fit=crop',
    backgroundColor: '#F8F9FA',
  },
];

// Detailed category list like in the image
const detailedCategories = [
  { id: '7', name: 'Tops' },
  { id: '8', name: 'Shirts & Blouses' },
  { id: '9', name: 'Cardigans & Sweaters' },
  { id: '10', name: 'Knitwear' },
  { id: '11', name: 'Blazers' },
  { id: '12', name: 'Outerwear' },
  { id: '13', name: 'Pants' },
  { id: '14', name: 'Jeans' },
  { id: '15', name: 'Shorts' },
  { id: '16', name: 'Skirts' },
  { id: '17', name: 'Dresses' },
];

const tabs = ['Women', 'Men', 'Kids'];

export default function CategoriesPage() {
  const [selectedTab, setSelectedTab] = useState('Women');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/(tabs)/categories/${categoryId}`);
  };

  const handleDetailedCategoryPress = (categoryId: string) => {
    router.push(`/(tabs)/categories/${categoryId}`);
  };

  const handleViewAllItems = () => {
    router.push('/(tabs)/featured');
  };

  const handleSummerSalePress = () => {
    router.push('/(tabs)/featured');
  };

  const handleSearchPress = () => {
    setShowSearch(!showSearch);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDetailedCategories = detailedCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearchPress}
        >
          <Ionicons name="search" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        {showSearch && (
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search categories..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={showSearch}
              />
              {searchQuery !== '' && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summer Sales Banner */}
        <TouchableOpacity 
          style={styles.summerSaleBanner}
          onPress={handleSummerSalePress}
        >
          <Text style={styles.summerSaleTitle}>SUMMER SALES</Text>
          <Text style={styles.summerSaleSubtitle}>Up to 50% off</Text>
        </TouchableOpacity>

        {/* View All Items Button */}
        <View style={styles.viewAllContainer}>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={handleViewAllItems}
          >
            <Text style={styles.viewAllButtonText}>VIEW ALL ITEMS</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category.id)}
            >
              <View style={styles.categoryContent}>
                <View style={styles.categoryTextContainer}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <View style={styles.categoryImageContainer}>
                  <Image 
                    source={{ uri: category.image }}
                    style={styles.categoryImage}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Detailed Categories Section */}
        <View style={styles.detailedCategoriesSection}>
          <Text style={styles.chooseCategoryTitle}>Choose category</Text>
          <View style={styles.detailedCategoriesList}>
            {filteredDetailedCategories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.detailedCategoryItem,
                  index === filteredDetailedCategories.length - 1 && styles.lastDetailedCategoryItem
                ]}
                onPress={() => handleDetailedCategoryPress(category.id)}
              >
                <Text style={styles.detailedCategoryName}>{category.name}</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
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
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: SIZES.sm,
  },
  searchContainer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  searchBar: {
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    backgroundColor: COLORS.background,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SIZES.md,
    marginHorizontal: SIZES.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  summerSaleBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.md,
    paddingVertical: SIZES.xl,
    paddingHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.medium,
  },
  summerSaleTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.background,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  summerSaleSubtitle: {
    fontSize: SIZES.textBase,
    color: COLORS.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  categoriesContainer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  categoryItem: {
    backgroundColor: COLORS.backgroundLight,
    marginBottom: SIZES.md,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.lg,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  categoryImageContainer: {
    width: 80,
    height: 60,
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewAllContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  viewAllButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.radiusFull,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  viewAllButtonText: {
    fontSize: SIZES.textBase,
    fontWeight: 'bold',
    color: COLORS.background,
    letterSpacing: 1,
  },
  detailedCategoriesSection: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  chooseCategoryTitle: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailedCategoriesList: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  detailedCategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  detailedCategoryName: {
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  lastDetailedCategoryItem: {
    borderBottomWidth: 0,
  },
});
