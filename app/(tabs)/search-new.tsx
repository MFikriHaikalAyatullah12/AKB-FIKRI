import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import { COLORS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

const mockProducts = [
  {
    id: '1',
    name: 'Floral Dress',
    brand: 'H&M',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    rating: 4.5,
    reviews: 89,
    category: 'Dresses',
    size: ['S', 'M', 'L'],
    color: 'Floral',
  },
  {
    id: '2',
    name: 'Casual Sweater',
    brand: 'Zara',
    price: 35.00,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
    rating: 4.2,
    reviews: 56,
    category: 'Tops',
    size: ['XS', 'S', 'M'],
    color: 'Beige',
  },
  {
    id: '3',
    name: 'High Waist Jeans',
    brand: 'Levi\'s',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop',
    rating: 4.7,
    reviews: 134,
    category: 'Bottoms',
    size: ['26', '28', '30', '32'],
    color: 'Blue',
  },
  {
    id: '4',
    name: 'Summer Blouse',
    brand: 'Mango',
    price: 25.50,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=600&fit=crop',
    rating: 4.3,
    reviews: 78,
    category: 'Tops',
    size: ['S', 'M', 'L', 'XL'],
    color: 'White',
  },
];

const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];
const sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Rating'];
const priceRanges = ['All', '$0 - $25', '$25 - $50', '$50 - $100', '$100+'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['All', 'Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Yellow'];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedSort, selectedPrice, selectedSizes, selectedColors]);

  const filterProducts = () => {
    let filtered = mockProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    if (selectedPrice !== 'All') {
      const [min, max] = selectedPrice === '$100+' 
        ? [100, Infinity] 
        : selectedPrice.replace('$', '').split(' - ').map(Number);
      
      filtered = filtered.filter(product => 
        product.price >= min && (max === Infinity || product.price <= max)
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        selectedSizes.some(size => product.size.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0 && !selectedColors.includes('All')) {
      filtered = filtered.filter(product =>
        selectedColors.some(color => 
          product.color.toLowerCase().includes(color.toLowerCase())
        )
      );
    }

    // Sort
    switch (selectedSort) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for Popular
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    if (color === 'All') {
      setSelectedColors(['All']);
    } else {
      setSelectedColors(prev => {
        const newColors = prev.filter(c => c !== 'All');
        return newColors.includes(color)
          ? newColors.filter(c => c !== color)
          : [...newColors, color];
      });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSort('Popular');
    setSelectedPrice('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchQuery('');
  };

  const renderProductItem = ({ item }: { item: any }) => (
    <ProductCard product={item} />
  );

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.filterModal}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.filterContent}>
          {/* Sort */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Sort by</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => setSelectedSort(option)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedSort === option && styles.filterOptionSelected
                ]}>
                  {option}
                </Text>
                {selectedSort === option && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range</Text>
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range}
                style={styles.filterOption}
                onPress={() => setSelectedPrice(range)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedPrice === range && styles.filterOptionSelected
                ]}>
                  {range}
                </Text>
                {selectedPrice === range && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Sizes */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Sizes</Text>
            <View style={styles.sizeGrid}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSizes.includes(size) && styles.sizeButtonSelected
                  ]}
                  onPress={() => toggleSize(size)}
                >
                  <Text style={[
                    styles.sizeButtonText,
                    selectedSizes.includes(size) && styles.sizeButtonTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Colors */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Colors</Text>
            <View style={styles.colorGrid}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    selectedColors.includes(color) && styles.colorButtonSelected
                  ]}
                  onPress={() => toggleColor(color)}
                >
                  <Text style={[
                    styles.colorButtonText,
                    selectedColors.includes(color) && styles.colorButtonTextSelected
                  ]}>
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.filterActions}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textLight}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextSelected
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredProducts.length} results found
        </Text>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Text style={styles.sortText}>Sort: {selectedSort}</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.productRow}
      />

      <FilterModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    marginRight: SIZES.md,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    marginLeft: SIZES.sm,
  },
  filterButton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusFull,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  categoriesContainer: {
    marginBottom: SIZES.lg,
  },
  categoriesContent: {
    paddingHorizontal: SIZES.lg,
  },
  categoryButton: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    marginRight: SIZES.sm,
  },
  categoryButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: COLORS.background,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  resultsCount: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  sortText: {
    fontSize: SIZES.textSm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  productsGrid: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  
  // Filter Modal Styles
  filterModal: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  filterSection: {
    marginTop: SIZES.xl,
  },
  filterSectionTitle: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterOptionText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  filterOptionSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  sizeButton: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sizeButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sizeButtonText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  sizeButtonTextSelected: {
    color: COLORS.background,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  colorButton: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  colorButtonText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  colorButtonTextSelected: {
    color: COLORS.background,
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SIZES.md,
  },
  clearButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: SIZES.textBase,
    color: COLORS.background,
    fontWeight: '600',
  },
});
