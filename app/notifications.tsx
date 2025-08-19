import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promotion' | 'system' | 'review';
  read: boolean;
}

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newProducts: boolean;
  priceDrops: boolean;
  reviews: boolean;
  security: boolean;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and is on the way!',
      time: '2 hours ago',
      type: 'order',
      read: false,
    },
    {
      id: '2',
      title: 'Flash Sale Alert',
      message: 'Up to 70% off on selected items. Limited time offer!',
      time: '4 hours ago',
      type: 'promotion',
      read: false,
    },
    {
      id: '3',
      title: 'Price Drop Alert',
      message: 'Evening Dress you liked is now 30% off!',
      time: '1 day ago',
      type: 'promotion',
      read: true,
    },
    {
      id: '4',
      title: 'Review Request',
      message: 'How was your recent purchase? Leave a review and get 10% off your next order.',
      time: '2 days ago',
      type: 'review',
      read: true,
    },
    {
      id: '5',
      title: 'Security Alert',
      message: 'New device login detected. If this wasn\'t you, please secure your account.',
      time: '3 days ago',
      type: 'system',
      read: true,
    },
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    priceDrops: true,
    reviews: true,
    security: true,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return 'bag-outline';
      case 'promotion':
        return 'pricetag-outline';
      case 'system':
        return 'shield-outline';
      case 'review':
        return 'star-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return COLORS.success;
      case 'promotion':
        return COLORS.warning;
      case 'system':
        return COLORS.error;
      case 'review':
        return COLORS.primary;
      default:
        return COLORS.textLight;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    Alert.alert('Success', 'All notifications marked as read');
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to delete all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            setNotifications([]);
            Alert.alert('Success', 'All notifications cleared');
          }
        }
      ]
    );
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotification = (item: NotificationItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
      onPress={() => handleMarkAsRead(item.id)}
      onLongPress={() => handleDeleteNotification(item.id)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons 
          name={getNotificationIcon(item.type)} 
          size={24} 
          color={getNotificationColor(item.type)} 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[
            styles.notificationTitle,
            !item.read && styles.unreadTitle
          ]}>
            {item.title}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        
        <Text style={styles.notificationMessage}>{item.message}</Text>
        
        {!item.read && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>General</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="phone-portrait-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={settings.pushNotifications}
            onValueChange={(value) => updateSetting('pushNotifications', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Email Notifications</Text>
          </View>
          <Switch
            value={settings.emailNotifications}
            onValueChange={(value) => updateSetting('emailNotifications', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Order Updates</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="bag-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Order Status Updates</Text>
          </View>
          <Switch
            value={settings.orderUpdates}
            onValueChange={(value) => updateSetting('orderUpdates', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Marketing</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="pricetag-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Promotions & Offers</Text>
          </View>
          <Switch
            value={settings.promotions}
            onValueChange={(value) => updateSetting('promotions', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="sparkles-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>New Products</Text>
          </View>
          <Switch
            value={settings.newProducts}
            onValueChange={(value) => updateSetting('newProducts', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="trending-down-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Price Drops</Text>
          </View>
          <Switch
            value={settings.priceDrops}
            onValueChange={(value) => updateSetting('priceDrops', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Community</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="star-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Review Requests</Text>
          </View>
          <Switch
            value={settings.reviews}
            onValueChange={(value) => updateSetting('reviews', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="shield-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.settingLabel}>Security Alerts</Text>
          </View>
          <Switch
            value={settings.security}
            onValueChange={(value) => updateSetting('security', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            disabled
          />
        </View>
        <Text style={styles.settingNote}>
          Security alerts cannot be disabled for your account safety
        </Text>
      </View>
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
        <Text style={styles.headerTitle}>Notifications</Text>
        {activeTab === 'notifications' && unreadCount > 0 && (
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
        {activeTab === 'notifications' && notifications.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'notifications' && styles.activeTab
          ]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'notifications' && styles.activeTabText
          ]}>
            Notifications
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'settings' && styles.activeTab
          ]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'settings' && styles.activeTabText
          ]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'notifications' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-outline" size={80} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No Notifications</Text>
              <Text style={styles.emptyMessage}>
                You're all caught up! We'll notify you when something new happens.
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {notifications.map(renderNotification)}
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderSettings()}
        </ScrollView>
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
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.xl,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundLight,
  },
  headerTitle: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  markAllButton: {
    padding: SIZES.sm,
  },
  markAllText: {
    color: COLORS.primary,
    fontSize: SIZES.textSm,
    fontWeight: '600',
  },
  clearButton: {
    padding: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundLight,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    margin: SIZES.lg,
    borderRadius: SIZES.radiusFull,
    padding: SIZES.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
    gap: SIZES.sm,
  },
  activeTab: {
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
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
  badge: {
    backgroundColor: COLORS.error,
    borderRadius: SIZES.radiusFull,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xs,
  },
  badgeText: {
    color: 'white',
    fontSize: SIZES.textXs,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxl * 2,
    paddingHorizontal: SIZES.xl,
  },
  emptyTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SIZES.xl,
    marginBottom: SIZES.md,
  },
  emptyMessage: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  notificationsList: {
    padding: SIZES.lg,
    gap: SIZES.sm,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.small,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: COLORS.backgroundLight,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.xs,
  },
  notificationTitle: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    marginLeft: SIZES.sm,
  },
  notificationMessage: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  settingsContainer: {
    padding: SIZES.lg,
  },
  settingsSection: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.sm,
    ...SHADOWS.small,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    marginLeft: SIZES.md,
    fontWeight: '500',
  },
  settingNote: {
    fontSize: SIZES.textSm,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginTop: SIZES.xs,
    paddingHorizontal: SIZES.md,
  },
});
