import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'shipping' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: '1',
        name: 'Summer Dress',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop'
      },
      {
        id: '2',
        name: 'Casual Jeans',
        price: 59.98,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop'
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipping',
    total: 45.99,
    items: [
      {
        id: '3',
        name: 'Cozy Sweater',
        price: 45.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop'
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 124.97,
    items: [
      {
        id: '4',
        name: 'Evening Gown',
        price: 124.97,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1566479179817-1ce0a6edfaa5?w=400&h=600&fit=crop'
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return COLORS.accent;
    case 'shipping': return COLORS.warning;
    case 'processing': return COLORS.primary;
    case 'cancelled': return COLORS.error;
    default: return COLORS.textSecondary;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'delivered': return 'Delivered';
    case 'shipping': return 'Shipping';
    case 'processing': return 'Processing';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

export default function OrderHistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredOrders = selectedFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedFilter);

  const OrderCard = ({ order }: { order: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
              {getStatusText(order.status)}
            </Text>
          </View>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {order.items.slice(0, 2).map((item, index) => (
          <View key={item.id} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemInfo}>Qty: {item.quantity} • ${item.price}</Text>
            </View>
          </View>
        ))}
        {order.items.length > 2 && (
          <Text style={styles.moreItems}>+{order.items.length - 2} more items</Text>
        )}
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.reorderButton]}>
          <Text style={[styles.actionButtonText, styles.reorderButtonText]}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ title, value }: { title: string; value: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === value && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(value)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === value && styles.filterButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <FilterButton title="All" value="all" />
        <FilterButton title="Processing" value="processing" />
        <FilterButton title="Shipping" value="shipping" />
        <FilterButton title="Delivered" value="delivered" />
        <FilterButton title="Cancelled" value="cancelled" />
      </ScrollView>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'all' 
                ? "You haven't placed any orders yet"
                : `No ${selectedFilter} orders found`
              }
            </Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
  },
  backButton: {
    padding: SIZES.sm,
  },
  title: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  filterContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
  },
  filterContent: {
    paddingRight: SIZES.lg,
  },
  filterButton: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundLight,
    marginRight: SIZES.sm,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.background,
  },
  ordersContainer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  orderCard: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.lg,
  },
  orderNumber: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  orderDate: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    marginBottom: SIZES.sm,
  },
  statusText: {
    fontSize: SIZES.textSm,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemsContainer: {
    marginBottom: SIZES.lg,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  itemImage: {
    width: 50,
    height: 60,
    borderRadius: SIZES.radiusSm,
    marginRight: SIZES.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  itemInfo: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  moreItems: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginLeft: 64,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSm,
    paddingVertical: SIZES.md,
    alignItems: 'center',
    marginHorizontal: SIZES.xs,
  },
  reorderButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  reorderButtonText: {
    color: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.xl * 2,
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
    marginBottom: SIZES.xl,
    paddingHorizontal: SIZES.lg,
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
