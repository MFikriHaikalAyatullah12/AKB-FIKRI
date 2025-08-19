import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Enhanced product data
const products = [
  {
    id: '1',
    name: 'High-Waisted Trousers',
    price: 89.99,
    originalPrice: 129.99,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594633313515-8ad17c4c4da9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594633313885-c4618c17c9c4?w=400&h=500&fit=crop'
    ],
    description: 'Elegant high-waisted trousers perfect for both casual and formal occasions. Made from premium blend fabric with excellent fit and comfort.',
    rating: 4.5,
    reviews: 128,
    category: 'Pants',
    brand: 'Fashion Elite',
    material: '65% Cotton, 30% Polyester, 5% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Charcoal Grey', 'Khaki'],
    features: ['High-waisted design', 'Comfortable fit', 'Wrinkle resistant', 'Machine washable'],
    inStock: true,
    fastShipping: true,
    returnPolicy: '30-day return'
  },
  {
    id: '2',
    name: 'Summer Collection Dress',
    price: 129.99,
    originalPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515372039848-c3b08e2df2b0?w=400&h=500&fit=crop'
    ],
    description: 'Beautiful floral dress from our summer collection. Lightweight and breathable fabric perfect for warm weather.',
    rating: 4.8,
    reviews: 256,
    category: 'Dresses',
    brand: 'Summer Styles',
    material: '100% Cotton',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Print', 'Solid Navy', 'Coral Pink'],
    features: ['Lightweight fabric', 'Floral pattern', 'Midi length', 'Side pockets'],
    inStock: true,
    fastShipping: true,
    returnPolicy: '30-day return'
  },
  {
    id: '3',
    name: 'Casual White Shirt',
    price: 49.99,
    originalPrice: 69.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
    ],
    description: 'Classic white shirt that goes with everything. Premium cotton fabric with a comfortable regular fit.',
    rating: 4.3,
    reviews: 89,
    category: 'Tops',
    brand: 'Classic Collection',
    material: '100% Cotton',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink'],
    features: ['Classic fit', 'Button-down collar', 'Long sleeves', 'Chest pocket'],
    inStock: true,
    fastShipping: false,
    returnPolicy: '30-day return'
  }
];

export default function ProductDetailsPage() {
  const { id } = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = useMemo(() => products.find((product) => product.id === id), [id]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Ionicons name="close-circle-outline" size={64} color="#ccc" />
        <Text style={styles.notFoundText}>Product not found</Text>
        <TouchableOpacity 
          style={styles.backToHomeButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backToHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />);
    }

    return stars;
  };

  const addToCart = () => {
    if (!selectedSize) {
      Alert.alert('Size Required', 'Please select a size before adding to cart');
      return;
    }
    if (!selectedColor) {
      Alert.alert('Color Required', 'Please select a color before adding to cart');
      return;
    }
    
    Alert.alert(
      'Added to Cart!',
      `${product.name} has been added to your cart.\nSize: ${selectedSize}\nColor: ${selectedColor}\nQuantity: ${quantity}`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/cart') }
      ]
    );
  };

  const buyNow = () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert('Selection Required', 'Please select size and color first');
      return;
    }
    
    Alert.alert(
      'Quick Checkout',
      `Proceed to checkout with:\n${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor}\nTotal: $${(product.price * quantity).toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Checkout', onPress: () => Alert.alert('Success', 'Redirecting to payment...') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Product Details</Text>
        
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#FFD700" : "#fff"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[selectedImageIndex] }} 
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
          
          {product.images.length > 1 && (
            <ScrollView 
              horizontal 
              style={styles.thumbnailContainer}
              showsHorizontalScrollIndicator={false}
            >
              {product.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImageIndex(index)}
                  style={[
                    styles.thumbnail,
                    selectedImageIndex === index && styles.selectedThumbnail
                  ]}
                >
                  <Image source={{ uri: image }} style={styles.thumbnailImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brandName}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
          </View>
          
          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>
          
          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
          
          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Features:</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          
          {/* Size Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Size:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionsContainer}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.optionButton,
                      selectedSize === size && styles.selectedOption
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedSize === size && styles.selectedOptionText
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          
          {/* Color Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Color:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionsContainer}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.optionButton,
                      selectedColor === color && styles.selectedOption
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedColor === color && styles.selectedOptionText
                    ]}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          
          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <Text style={styles.selectionTitle}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Product Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Material:</Text>
              <Text style={styles.detailValue}>{product.material}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailValue}>{product.category}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Return Policy:</Text>
              <Text style={styles.detailValue}>{product.returnPolicy}</Text>
            </View>
          </View>
          
          {/* Service Features */}
          <View style={styles.servicesContainer}>
            <View style={styles.serviceItem}>
              <Ionicons name="flash" size={20} color="#4CAF50" />
              <Text style={styles.serviceText}>
                {product.fastShipping ? 'Fast Shipping' : 'Standard Shipping'}
              </Text>
            </View>
            <View style={styles.serviceItem}>
              <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
              <Text style={styles.serviceText}>Secure Payment</Text>
            </View>
            <View style={styles.serviceItem}>
              <Ionicons name="return-up-back" size={20} color="#4CAF50" />
              <Text style={styles.serviceText}>Easy Returns</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={addToCart}
        >
          <Ionicons name="bag-add-outline" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buyNowButton}
          onPress={buyNow}
        >
          <Ionicons name="card-outline" size={20} color="#fff" />
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  notFoundText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },
  backToHomeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backToHomeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: '#fff',
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: height * 0.4,
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  thumbnailContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  thumbnail: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#FF6B6B',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
  },
  productInfo: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  brandName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginRight: 5,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
  },
  selectionContainer: {
    marginBottom: 20,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 5,
  },
  quantityButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 25,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 10,
    fontWeight: '500',
  },
  bottomActions: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    gap: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#4ECDC4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 2,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 2,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
