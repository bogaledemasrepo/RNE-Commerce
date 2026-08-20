import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import COLORS from '@/constants/color';
import { useCart } from '@/context/use-cart';

export default function CartPage() {
  const { items, decrementQuantity, incrementQuantity, removeItem } = useCart();
  // const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Quantity Handler
  const updateQuantity = (id: number, action: 'increase' | 'decrease') => {
    if (action === 'decrease') decrementQuantity(id);
    if (action === 'increase') incrementQuantity(id);
  };

  // Item Removal Confirmation
  const hanleRemoveItem = (id: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removeItem(id);
        },
      },
    ]);
  };

  // Promo Code Handler
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'DISCOUNT10') {
      setDiscount(0.1);
      Alert.alert('Success', '10% discount applied!');
    } else {
      Alert.alert('Invalid Promo', 'Try using code DISCOUNT10 for testing.');
    }
  };

  // Financial Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shippingFee = subtotal > 0 ? 15.0 : 0.0;
  const grandTotal = subtotal - discountAmount + shippingFee;

  // Empty Cart Component
  if (items.length === 0) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBadge}>
            <Ionicons name="bag-handle-outline" size={48} color={COLORS.primary || '#4830D3'} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven&apos;t added anything to your cart yet.
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.replace('/(tabs)/home/page')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      {/* Page Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerCount}>{items.length} items</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cartCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />

            <View style={styles.cardDetails}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Pressable onPress={() => hanleRemoveItem(item.id)} hitSlop={8}>
                  <Feather name="trash-2" size={18} color="#EF4444" />
                </Pressable>
              </View>

              <Text style={styles.productVariant}>{'item.variant'}</Text>

              <View style={styles.cardFooterRow}>
                <Text style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>

                {/* Counter Stepper */}
                <View style={styles.stepperContainer}>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={() => updateQuantity(item.id, 'decrease')}
                    hitSlop={6}
                  >
                    <Feather name="minus" size={14} color="#374151" />
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={() => updateQuantity(item.id, 'increase')}
                    hitSlop={6}
                  >
                    <Feather name="plus" size={14} color="#374151" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footerSection}>
            {/* Promo Input */}
            <View style={styles.promoContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Promo code (e.g. DISCOUNT10)"
                placeholderTextColor="#9CA3AF"
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.promoApplyBtn}
                onPress={handleApplyPromo}
                activeOpacity={0.8}
              >
                <Text style={styles.promoApplyText}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* Order Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              {discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount (10%)</Text>
                  <Text style={styles.discountValue}>-${discountAmount.toFixed(2)}</Text>
                </View>
              )}

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Estimated Shipping</Text>
                <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        }
      />

      {/* Sticky Bottom Action Bar */}
      <View style={styles.checkoutBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.checkoutBarLabel}>Grand Total</Text>
          <Text style={styles.checkoutBarValue}>${grandTotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.navigate('/(tabs)/cart/checkout/page' as any)}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutBtnText}>Checkout</Text>
          <Feather name="arrow-right" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  headerCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110, // Buffer space for sticky checkout bar
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  productImage: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  productVariant: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  stepperBtn: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 12,
  },
  footerSection: {
    marginTop: 12,
  },
  promoContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  promoInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111827',
  },
  promoApplyBtn: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoApplyText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary || '#4830D3',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  totalContainer: {
    gap: 2,
  },
  checkoutBarLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  checkoutBarValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary || '#4830D3',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 12,
    shadowColor: COLORS.primary || '#4830D3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconBadge: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: 'rgba(72, 48, 211, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreBtn: {
    backgroundColor: COLORS.primary || '#4830D3',
    paddingHorizontal: 28,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
