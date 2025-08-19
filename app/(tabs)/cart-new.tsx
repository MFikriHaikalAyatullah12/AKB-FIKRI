import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Short dress',
    brand: 'H&M',
    price: 19.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    size: 'M',
    color: 'Black',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Casual Sweater',
    brand: 'Zara',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
    size: 'S',
    color: 'Beige',
    quantity: 2,
  },
  {
    id: '3',
    name: 'High Waist Jeans',
    brand: 'Levi\'s',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop',
    size: '28',
    color: 'Blue',
    quantity: 1,
  },
];

const promoCode = {
  code: 'SAVE20',
  discount: 20, // percentage
  description: '20% off your order'
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(items => items.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!promoApplied) return 0;
    return (calculateSubtotal() * promoCode.discount) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    return subtotal - discount + shipping;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items to continue.');
      return;
    }
    
    // TODO: Create checkout page or use existing cart flow
    Alert.alert(
      'Checkout', 
      'Checkout functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemBrand}>{item.brand}</Text>
            <Text style={styles.itemVariant}>
              Size: {item.size} • Color: {item.color}
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.itemFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>${item.originalPrice}</Text>
            )}
          </View>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={16} color={COLORS.textPrimary} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        
        <View style={styles.header}>
          <Text style={styles.title}>My Cart</Text>
        </View>
        
        <View style={styles.emptyCart}>
          <Ionicons name="bag-outline" size={80} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet
          </Text>
          
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View style={styles.cartItems}>
          {cartItems.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <View style={styles.promoHeader}>
            <Ionicons name="pricetag-outline" size={20} color={COLORS.primary} />
            <Text style={styles.promoTitle}>Promo Code</Text>
          </View>
          
          {!promoApplied ? (
            <TouchableOpacity
              style={styles.promoButton}
              onPress={() => setPromoApplied(true)}
            >
              <Text style={styles.promoButtonText}>Apply {promoCode.code}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.promoApplied}>
              <View style={styles.promoAppliedInfo}>
                <Text style={styles.promoCode}>{promoCode.code}</Text>
                <Text style={styles.promoDescription}>{promoCode.description}</Text>
              </View>
              <TouchableOpacity onPress={() => setPromoApplied(false)}>
                <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
          </View>
          
          {calculateSavings() > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>You saved</Text>
              <Text style={styles.savingsValue}>-${calculateSavings().toFixed(2)}</Text>
            </View>
          )}
          
          {promoApplied && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Promo discount</Text>
              <Text style={styles.discountValue}>-${calculateDiscount().toFixed(2)}</Text>
            </View>
          )}
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {calculateSubtotal() > 50 ? 'Free' : '$5.99'}
            </Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
          
          {calculateSubtotal() < 50 && (
            <Text style={styles.freeShippingNote}>
              Add ${(50 - calculateSubtotal()).toFixed(2)} more for free shipping
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>
            Proceed to Checkout • ${calculateTotal().toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
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
  itemCount: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  content: {
    flex: 1,
  },
  cartItems: {
    paddingHorizontal: SIZES.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: SIZES.radiusSm,
    marginRight: SIZES.lg,
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  itemBrand: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  itemVariant: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
  },
  removeButton: {
    padding: SIZES.sm,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SIZES.sm,
  },
  originalPrice: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.sm,
  },
  quantityButton: {
    padding: SIZES.sm,
  },
  quantity: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginHorizontal: SIZES.md,
    minWidth: 20,
    textAlign: 'center',
  },
  promoSection: {
    backgroundColor: COLORS.background,
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  promoTitle: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SIZES.sm,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.lg,
  },
  promoButtonText: {
    fontSize: SIZES.textBase,
    color: COLORS.primary,
    fontWeight: '500',
  },
  promoApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.accent + '10',
    borderRadius: SIZES.radiusSm,
    padding: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
  },
  promoAppliedInfo: {
    flex: 1,
  },
  promoCode: {
    fontSize: SIZES.textBase,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  promoDescription: {
    fontSize: SIZES.textSm,
    color: COLORS.accent,
    marginTop: SIZES.xs,
  },
  orderSummary: {
    backgroundColor: COLORS.background,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  summaryTitle: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  summaryLabel: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  savingsValue: {
    fontSize: SIZES.textBase,
    color: COLORS.accent,
    fontWeight: '500',
  },
  discountValue: {
    fontSize: SIZES.textBase,
    color: COLORS.accent,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.md,
  },
  totalLabel: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  freeShippingNote: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SIZES.md,
  },
  checkoutContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.large,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
  
  // Empty Cart Styles
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  emptyTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  emptySubtitle: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
  },
  shopButtonText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
});
