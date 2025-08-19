import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true
  },
  {
    id: '2',
    type: 'work',
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    address: '456 Business Ave, Suite 200',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false
  }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);

  const setDefaultAddress = (addressId: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    Alert.alert('Success', 'Default address updated successfully.');
  };

  const deleteAddress = (addressId: string) => {
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    
    if (addressToDelete?.isDefault && addresses.length > 1) {
      Alert.alert(
        'Cannot Delete',
        'You cannot delete your default address. Please set another address as default first.'
      );
      return;
    }

    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses(addresses.filter(addr => addr.id !== addressId));
          }
        }
      ]
    );
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return 'home-outline';
      case 'work': return 'business-outline';
      default: return 'location-outline';
    }
  };

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case 'home': return COLORS.accent;
      case 'work': return COLORS.primary;
      default: return COLORS.warning;
    }
  };

  const AddressCard = ({ address }: { address: Address }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTypeContainer}>
          <View style={[
            styles.typeIcon,
            { backgroundColor: getAddressTypeColor(address.type) + '20' }
          ]}>
            <Ionicons 
              name={getAddressTypeIcon(address.type) as any} 
              size={20} 
              color={getAddressTypeColor(address.type)} 
            />
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressType}>
              {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
            </Text>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.addressActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Edit Address', 'Edit address functionality would be implemented here.')}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => deleteAddress(address.id)}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressDetails}>
        <Text style={styles.recipientName}>{address.name}</Text>
        <Text style={styles.recipientPhone}>{address.phone}</Text>
        <Text style={styles.addressText}>
          {address.address}{'\n'}
          {address.city}, {address.state} {address.zipCode}
        </Text>
      </View>

      {!address.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => setDefaultAddress(address.id)}
        >
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
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
        <Text style={styles.title}>My Addresses</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Add Address', 'Add new address functionality would be implemented here.')}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Addresses List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AddressCard address={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.addressesContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={80} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No Addresses</Text>
            <Text style={styles.emptySubtitle}>
              Add your delivery addresses for faster checkout
            </Text>
            <TouchableOpacity 
              style={styles.addAddressButton}
              onPress={() => Alert.alert('Add Address', 'Add new address functionality would be implemented here.')}
            >
              <Text style={styles.addAddressButtonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Add New Address Button */}
      {addresses.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.addNewButton}
            onPress={() => Alert.alert('Add Address', 'Add new address functionality would be implemented here.')}
          >
            <Ionicons name="add" size={20} color={COLORS.background} />
            <Text style={styles.addNewButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}
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
  addButton: {
    padding: SIZES.sm,
  },
  addressesContainer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 100,
  },
  addressCard: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.lg,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  addressInfo: {
    flex: 1,
  },
  addressType: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  defaultBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: SIZES.radiusSm,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  defaultText: {
    fontSize: SIZES.textXs,
    color: COLORS.background,
    fontWeight: '600',
  },
  addressActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: SIZES.sm,
    marginLeft: SIZES.sm,
  },
  addressDetails: {
    marginBottom: SIZES.lg,
  },
  recipientName: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  recipientPhone: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.sm,
  },
  addressText: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  setDefaultButton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSm,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
  },
  setDefaultText: {
    fontSize: SIZES.textBase,
    color: COLORS.primary,
    fontWeight: '600',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.large,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingVertical: SIZES.lg,
  },
  addNewButtonText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    marginLeft: SIZES.sm,
  },
  
  // Empty State
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
    lineHeight: 24,
    marginBottom: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  addAddressButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
  },
  addAddressButtonText: {
    color: COLORS.background,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
});
