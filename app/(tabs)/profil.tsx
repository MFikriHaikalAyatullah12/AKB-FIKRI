import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const userProfile = {
  name: 'Kelompok AKB Fikri, Dirham, Kiky',
  email: 'kelompok.akb@example.com',
  phone: '+62 (812) 345-6789',
  avatar: 'https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
  memberSince: '2023',
  totalOrders: 24,
  totalSpent: 1247.89,
};

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    
    <View style={styles.menuItemRight}>
      {rightComponent}
      {showArrow && !rightComponent && (
        <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
      )}
    </View>
  </TouchableOpacity>
);

export default function ProfilePage() {
  const { logout, user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Use user data from AuthContext if available, otherwise fallback to default
  const displayUser = user || userProfile;
  const userName = user ? `${user.firstName} ${user.lastName}` : userProfile.name;

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality would be implemented here.');
  };

  const handleOrderHistory = () => {
    router.push('/order-history');
  };

  const handleAddresses = () => {
    router.push('/addresses');
  };

  const handlePaymentMethods = () => {
    router.push('/payment-methods');
  };

  const handleWishlist = () => {
    router.push('/wishlist');
  };

  const handleReviews = () => {
    Alert.alert('Reviews', 'Product reviews feature coming soon! Check the Featured section for now.');
  };

  const handleTrending = () => {
    Alert.alert('Trending', 'Trending products feature coming soon! Check the Featured section for popular items.');
  };

  const handleAdvancedSearch = () => {
    Alert.alert('Advanced Search', 'Advanced search feature coming soon! Use the search bar on the Home page for now.');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleHelpSupport = () => {
    router.push('/help-support');
  };

  const handleAbout = () => {
    router.push('/(tabs)/about');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: displayUser.avatar || userProfile.avatar }} style={styles.avatar} />
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{displayUser.email || userProfile.email}</Text>
            <Text style={styles.memberSince}>Member since {userProfile.memberSince}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.totalOrders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${userProfile.totalSpent}</Text>
              <Text style={styles.statLabel}>Spent</Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Shopping</Text>
          
          <MenuItem
            icon="time-outline"
            title="Order History"
            subtitle="View your past orders"
            onPress={handleOrderHistory}
          />
          
          <MenuItem
            icon="location-outline"
            title="Shipping Addresses"
            subtitle="Manage your addresses"
            onPress={handleAddresses}
          />
          
          <MenuItem
            icon="card-outline"
            title="Payment Methods"
            subtitle="Manage your payment options"
            onPress={handlePaymentMethods}
          />
          
          <MenuItem
            icon="heart-outline"
            title="Wishlist"
            subtitle="Your saved items"
            onPress={handleWishlist}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Discover</Text>
          
          <MenuItem
            icon="star-outline"
            title="Reviews"
            subtitle="Read and write product reviews"
            onPress={handleReviews}
          />
          
          <MenuItem
            icon="trending-up-outline"
            title="Trending"
            subtitle="Popular and trending items"
            onPress={handleTrending}
          />
          
          <MenuItem
            icon="search-outline"
            title="Advanced Search"
            subtitle="Find products with detailed filters"
            onPress={handleAdvancedSearch}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <MenuItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Order updates and promotions"
            onPress={handleNotifications}
            showArrow={false}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.primary + '30' }}
                thumbColor={notificationsEnabled ? COLORS.primary : COLORS.textLight}
              />
            }
          />
          
          <MenuItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Enable dark theme"
            onPress={() => {}}
            showArrow={false}
            rightComponent={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: COLORS.border, true: COLORS.primary + '30' }}
                thumbColor={darkModeEnabled ? COLORS.primary : COLORS.textLight}
              />
            }
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="FAQ and customer service"
            onPress={handleHelpSupport}
          />
          
          <MenuItem
            icon="information-circle-outline"
            title="About"
            subtitle="App version and info"
            onPress={handleAbout}
          />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  },
  title: {
    fontSize: SIZES.text3xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  editButton: {
    padding: SIZES.sm,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: COLORS.background,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.xl,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SIZES.lg,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  userName: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  userEmail: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  memberSince: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSm,
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.xl,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.xs,
  },
  statLabel: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
    marginHorizontal: SIZES.lg,
  },
  menuSection: {
    backgroundColor: COLORS.background,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    fontSize: SIZES.textLg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.lg,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: SIZES.textBase,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  menuItemSubtitle: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutSection: {
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.error + '10',
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.error + '20',
  },
  logoutText: {
    fontSize: SIZES.textBase,
    color: COLORS.error,
    fontWeight: '600',
    marginLeft: SIZES.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: SIZES.xl,
  },
  versionText: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
  },
});
