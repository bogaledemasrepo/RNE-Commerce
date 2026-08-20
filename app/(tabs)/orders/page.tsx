import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { OrderItemCard } from '@/components/order-item-card';
import { API_BASE_URL } from '@/constants';
import COLORS from '@/constants/color';
import { Order, TabType } from '@/types';

const TABS: TabType[] = ['active', 'completed', 'cancelled', 'all'];

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [orders, setOrders] = useState<Order[]>([]);

  // 2. Memoized Filtering Execution
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'active') {
        return order.status === 'PENDING' || order.status === 'SHIPPED';
      }
      if (activeTab === 'completed') {
        return order.status === 'DELIVERED';
      }
      if (activeTab === 'cancelled') {
        return order.status === 'CANCELLED';
      }
      return true;
    });
  }, [orders, activeTab]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = (await AsyncStorage.getItem('token')) || '';
        const response = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const renderOrderItem = useCallback(
    ({ item }: { item: Order }) => <OrderItemCard item={item} />,
    []
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs Filter */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <Pressable
              key={tab}
              style={[styles.tabButton, isSelected && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabLabel, isSelected && styles.tabLabelActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBadge}>
            <Ionicons name="receipt-outline" size={44} color={COLORS.primary || '#4830D3'} />
          </View>
          <Text style={styles.emptyTitle}>No {activeTab} orders</Text>
          <Text style={styles.emptySubtitle}>
            When you place an order, it will show up here under the {activeTab} tab.
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => router.replace('/(tabs)/home/page')}
            activeOpacity={0.8}
          >
            <Text style={styles.shopBtnText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={renderOrderItem}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={5}
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabButtonActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
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
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: COLORS.primary || '#4830D3',
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
