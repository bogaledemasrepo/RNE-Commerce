import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import COLORS from '@/constants/color';

type NotificationType = 'order' | 'promo' | 'account' | 'system';
type FilterTab = 'all' | 'unread' | 'orders' | 'promos';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  targetRoute?: string;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'order',
    title: 'Order #ORD-98231 Shipped! 🚚',
    message: 'Your package is on its way and scheduled to arrive by Friday, Aug 7.',
    timestamp: '2m ago',
    isRead: false,
    targetRoute: '/(tabs)/orders/track/ord_101',
  },
  {
    id: 'notif_2',
    type: 'promo',
    title: 'Flash Sale Alert! ⚡ 20% OFF',
    message: 'Use promo code FLASH20 at checkout for 20% off all minimalist footwear.',
    timestamp: '1h ago',
    isRead: false,
    targetRoute: '/(tabs)/home',
  },
  {
    id: 'notif_3',
    type: 'order',
    title: 'Payment Successful',
    message: "Thank you for your purchase! We've received your payment of $315.00.",
    timestamp: '3h ago',
    isRead: true,
    targetRoute: '/(tabs)/orders/detail/ord_101',
  },
  {
    id: 'notif_4',
    type: 'account',
    title: 'Security Alert 🛡️',
    message: 'Your account password was successfully updated.',
    timestamp: '1d ago',
    isRead: true,
  },
  {
    id: 'notif_5',
    type: 'system',
    title: 'Welcome to FC-Commerce!',
    message: 'Explore our curated collections and enjoy 10% off your first order.',
    timestamp: '3d ago',
    isRead: true,
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  // Toggle single item read status on tap
  const handleItemPress = (item: NotificationItem) => {
    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n)));

    if (item.targetRoute) {
      router.navigate(item.targetRoute as any);
    }
  };

  // Delete notification
  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter logic
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'unread') return !item.isRead;
    if (activeTab === 'orders') return item.type === 'order';
    if (activeTab === 'promos') return item.type === 'promo';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return {
          icon: 'cube-outline' as const,
          bgColor: '#E0F2FE',
          iconColor: '#0284C7',
        };
      case 'promo':
        return {
          icon: 'pricetag-outline' as const,
          bgColor: '#FEF3C7',
          iconColor: '#D97706',
        };
      case 'account':
        return {
          icon: 'shield-checkmark-outline' as const,
          bgColor: '#D1FAE5',
          iconColor: '#059669',
        };
      default:
        return {
          icon: 'notifications-outline' as const,
          bgColor: 'rgba(72, 48, 211, 0.1)',
          iconColor: COLORS.primary || '#4830D3',
        };
    }
  };

  return (
    <View style={styles.safeArea}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>

        {unreadCount > 0 ? (
          <TouchableOpacity onPress={handleMarkAllAsRead} hitSlop={8}>
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </View>

      {/* Segmented Filter Pills */}
      <View style={styles.filterContainer}>
        {(['all', 'unread', 'orders', 'promos'] as FilterTab[]).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <Pressable
              key={tab}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBadge}>
            <Ionicons
              name="notifications-off-outline"
              size={44}
              color={COLORS.primary || '#4830D3'}
            />
          </View>
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptySubtitle}>
            You`&apos;`re all caught up! Check back later for order updates and promo deals.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const config = getNotificationIcon(item.type);
            return (
              <TouchableOpacity
                style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.8}
              >
                {/* Type Icon Badge */}
                <View style={[styles.iconBadge, { backgroundColor: config.bgColor }]}>
                  <Ionicons name={config.icon} size={20} color={config.iconColor} />
                </View>

                {/* Content */}
                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text
                      style={[styles.notifTitle, !item.isRead && styles.unreadTitleText]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.timeText}>{item.timestamp}</Text>
                  </View>

                  <Text style={styles.notifMessage} numberOfLines={2}>
                    {item.message}
                  </Text>
                </View>

                {/* Right Indicator / Actions */}
                <View style={styles.cardRight}>
                  {!item.isRead && <View style={styles.unreadDot} />}
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    hitSlop={8}
                    style={styles.deleteBtn}
                  >
                    <Feather name="x" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary || '#4830D3',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadCard: {
    backgroundColor: 'rgba(72, 48, 211, 0.02)',
    borderColor: 'rgba(72, 48, 211, 0.2)',
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    marginRight: 8,
  },
  unreadTitleText: {
    fontWeight: '700',
    color: '#111827',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notifMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    gap: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary || '#4830D3',
  },
  deleteBtn: {
    padding: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIconBadge: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: 'rgba(72, 48, 211, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
