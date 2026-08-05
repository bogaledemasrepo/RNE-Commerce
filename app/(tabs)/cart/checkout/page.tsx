import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import COLORS from "@/constants/color";
import { SafeAreaView } from "react-native-safe-area-context";

interface Address {
  id: string;
  label: string;
  street: string;
  cityStateZip: string;
  isDefault?: boolean;
}

interface PaymentMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const ADDRESSES: Address[] = [
  {
    id: "1",
    label: "Home",
    street: "123 Innovation Way, Suite 400",
    cityStateZip: "San Francisco, CA 94107",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    street: "500 Market Street, Floor 12",
    cityStateZip: "San Francisco, CA 94105",
  },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    title: "Credit / Debit Card",
    subtitle: "•••• •••• •••• 4242",
    icon: "card-outline",
  },
  {
    id: "apple_pay",
    title: "Apple Pay",
    subtitle: "Fast and secure checkout",
    icon: "logo-apple",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    subtitle: "Pay when your package arrives",
    icon: "cash-outline",
  },
];

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<string>("1");
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial Breakdown Values
  const subtotal = 420.0;
  const shipping = 15.0;
  const discount = 42.0; // 10% promo applied
  const grandTotal = subtotal + shipping - discount;

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call for payment processing & order creation
      await new Promise((resolve) => setTimeout(resolve, 1800));

      Alert.alert(
        "Order Confirmed! 🎉",
        "Your payment was processed successfully. You can track your package in the Orders tab.",
        [
          {
            text: "View Orders",
            onPress: () => router.replace("/(tabs)/orders/page" as any),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Payment Failed", "Something went wrong while placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <View style={[styles.stepBadge, styles.stepActive]}>
            <Text style={styles.stepNumberActive}>1</Text>
          </View>
          <Text style={styles.stepLabelActive}>Shipping</Text>
          <View style={styles.stepLine} />
          <View style={[styles.stepBadge, styles.stepActive]}>
            <Text style={styles.stepNumberActive}>2</Text>
          </View>
          <Text style={styles.stepLabelActive}>Payment</Text>
          <View style={styles.stepLine} />
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Review</Text>
        </View>

        {/* SECTION 1: Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <TouchableOpacity onPress={() => Alert.alert("Add Address", "Open add address modal")}>
              <Text style={styles.addNewText}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          {ADDRESSES.map((item) => {
            const isSelected = selectedAddress === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.selectableCard, isSelected && styles.cardSelected]}
                onPress={() => setSelectedAddress(item.id)}
              >
                <View style={styles.cardLeft}>
                  <Ionicons
                    name={isSelected ? "radio-button-on" : "radio-button-off"}
                    size={20}
                    color={isSelected ? COLORS.primary || "#4830D3" : "#9CA3AF"}
                  />
                  <View style={styles.cardInfo}>
                    <View style={styles.labelRow}>
                      <Text style={styles.cardTitle}>{item.label}</Text>
                      {item.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
                    </View>
                    <Text style={styles.cardSub}>{item.street}</Text>
                    <Text style={styles.cardSub}>{item.cityStateZip}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* SECTION 2: Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {PAYMENT_METHODS.map((item) => {
            const isSelected = selectedPayment === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.selectableCard, isSelected && styles.cardSelected]}
                onPress={() => setSelectedPayment(item.id)}
              >
                <View style={styles.cardLeft}>
                  <Ionicons
                    name={isSelected ? "radio-button-on" : "radio-button-off"}
                    size={20}
                    color={isSelected ? COLORS.primary || "#4830D3" : "#9CA3AF"}
                  />
                  <View style={styles.paymentIconBadge}>
                    <Ionicons name={item.icon} size={20} color="#374151" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSub}>{item.subtitle}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* SECTION 3: Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Promo Discount (10%)</Text>
              <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer Bar */}
      <View style={styles.footerBar}>
        <View style={styles.totalBlock}>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>${grandTotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.placeOrderBtn, isSubmitting && styles.btnDisabled]}
          onPress={handlePlaceOrder}
          disabled={isSubmitting}
          activeOpacity={0.85}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.placeOrderText}>Place Order</Text>
              <Feather name="check-circle" size={18} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  stepActive: {
    backgroundColor: COLORS.primary || "#4830D3",
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  stepNumberActive: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  stepLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
    fontWeight: "500",
  },
  stepLabelActive: {
    fontSize: 12,
    color: "#111827",
    marginLeft: 6,
    fontWeight: "600",
  },
  stepLine: {
    width: 20,
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  addNewText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary || "#4830D3",
  },
  selectableCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  cardSelected: {
    borderColor: COLORS.primary || "#4830D3",
    backgroundColor: "rgba(72, 48, 211, 0.02)",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  paymentIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  defaultBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.primary || "#4830D3",
    backgroundColor: "rgba(72, 48, 211, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardSub: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  discountValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary || "#4830D3",
  },
  footerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  totalBlock: {
    gap: 2,
  },
  footerLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  footerTotal: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primary || "#4830D3",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 12,
    shadowColor: COLORS.primary || "#4830D3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});