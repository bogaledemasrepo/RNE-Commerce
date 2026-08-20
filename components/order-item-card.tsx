import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import COLORS from '@/constants/color';
import { Order, OrderStatus } from '@/types';

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'PENDING':
      return {
        label: 'Processing',
        bgColor: '#FEF3C7',
        textColor: '#D97706',
        icon: 'time-outline' as const,
      };
    case 'SHIPPED':
      return {
        label: 'In Transit',
        bgColor: '#E0F2FE',
        textColor: '#0284C7',
        icon: 'airplane-outline' as const,
      };
    case 'DELIVERED':
      return {
        label: 'Delivered',
        bgColor: '#D1FAE5',
        textColor: '#059669',
        icon: 'checkmark-circle-outline' as const,
      };
    case 'CANCELLED':
      return {
        label: 'Cancelled',
        bgColor: '#FEE2E2',
        textColor: '#DC2626',
        icon: 'close-circle-outline' as const,
      };
    default:
      return {
        label: 'Processing',
        bgColor: '#FEF3C7',
        textColor: '#D97706',
        icon: 'time-outline' as const,
      };
  }
};

// 1. Extracted Card Component for FlatList Optimization
const OrderItemCardComponent = ({ item }: { item: Order }) => {
  const badge = getStatusBadge(item.status);
  const primaryItem = item.items?.[0];
  const hasMoreItems = item.items?.length > 1;

  return (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.9}
      onPress={() => router.navigate(`/(tabs)/orders/detail/${item.id}` as any)}
    >
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.orderMeta}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: badge.bgColor }]}>
          <Ionicons name={badge.icon} size={14} color={badge.textColor} />
          <Text style={[styles.statusText, { color: badge.textColor }]}>{badge.label}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Card Body */}
      {primaryItem && (
        <View style={styles.cardBody}>
          <Image
            source={{ uri: primaryItem.image?.trim() }}
            style={styles.productThumbnail}
            contentFit="cover"
            transition={200}
          />

          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={1}>
              {primaryItem.name}
            </Text>
            <Text style={styles.productQty}>
              Qty: {primaryItem.quantity} • ${primaryItem.price?.toFixed(2)}
            </Text>

            {hasMoreItems && (
              <Text style={styles.moreItemsText}>+ {item.items.length - 1} more item(s)</Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.divider} />

      {/* Card Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>${item.totalAmount?.toFixed(2)}</Text>
        </View>

        <View style={styles.actionGroup}>
          {item.status === 'SHIPPED' && (
            <TouchableOpacity
              style={styles.primaryActionBtn}
              onPress={() => router.navigate(`/(tabs)/orders/track/${item.id}` as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryActionText}>Track Order</Text>
              <Feather name="truck" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {item.status === 'DELIVERED' && (
            <TouchableOpacity
              style={styles.secondaryActionBtn}
              onPress={() => router.navigate(`/(tabs)/orders/detail/${item.id}` as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryActionText}>Reorder</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const OrderItemCard = React.memo(OrderItemCardComponent);

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderMeta: {
    gap: 2,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  orderDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  productQty: {
    fontSize: 13,
    color: '#6B7280',
  },
  moreItemsText: {
    fontSize: 12,
    color: COLORS.primary || '#4830D3',
    fontWeight: '500',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalContainer: {
    gap: 2,
  },
  totalLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryActionBtn: {
    backgroundColor: COLORS.primary || '#4830D3',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryActionBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
});
