import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import COLORS from "@/constants/color";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
type TabType = "active" | "completed" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "ord_101",
    orderNumber: "#ORD-98231",
    date: "Aug 4, 2026",
    status: "shipped",
    totalAmount: 315.0,
    items: [
      {
        id: "p1",
        name: "Minimalist Leather Sneaker",
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop",
        price: 180.0,
        quantity: 1,
      },
      {
        id: "p2",
        name: "Classic Heritage Hoodie",
        image:
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500&auto=format&fit=crop",
        price: 135.0,
        quantity: 1,
      },
    ],
  },
  {
    id: "ord_102",
    orderNumber: "#ORD-97412",
    date: "Jul 28, 2026",
    status: "delivered",
    totalAmount: 250.0,
    items: [
      {
        id: "p3",
        name: "Classic Minimalist Watch",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
        price: 250.0,
        quantity: 1,
      },
    ],
  },
  {
    id: "ord_103",
    orderNumber: "#ORD-95120",
    date: "Jul 15, 2026",
    status: "cancelled",
    totalAmount: 145.0,
    items: [
      {
        id: "p4",
        name: "Vintage Denim Jacket",
        image:
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=500&auto=format&fit=crop",
        price: 145.0,
        quantity: 1,
      },
    ],
  },
];

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("active");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === "active") {
      return order.status === "processing" || order.status === "shipped";
    }
    if (activeTab === "completed") {
      return order.status === "delivered";
    }
    if (activeTab === "cancelled") {
      return order.status === "cancelled";
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return {
          label: "Processing",
          bgColor: "#FEF3C7",
          textColor: "#D97706",
          icon: "time-outline" as const,
        };
      case "shipped":
        return {
          label: "In Transit",
          bgColor: "#E0F2FE",
          textColor: "#0284C7",
          icon: "airplane-outline" as const,
        };
      case "delivered":
        return {
          label: "Delivered",
          bgColor: "#D1FAE5",
          textColor: "#059669",
          icon: "checkmark-circle-outline" as const,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          bgColor: "#FEE2E2",
          textColor: "#DC2626",
          icon: "close-circle-outline" as const,
        };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs Filter */}
      <View style={styles.tabContainer}>
        {(["active", "completed", "cancelled"] as TabType[]).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <Pressable
              key={tab}
              style={[styles.tabButton, isSelected && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  isSelected && styles.tabLabelActive,
                ]}
              >
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
            <Ionicons name="receipt-outline" size={44} color={COLORS.primary || "#4830D3"} />
          </View>
          <Text style={styles.emptyTitle}>No {activeTab} orders</Text>
          <Text style={styles.emptySubtitle}>
            When you place an order, it will show up here under the {activeTab} tab.
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => router.replace("/(tabs)/home/page")}
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
          renderItem={({ item }) => {
            const badge = getStatusBadge(item.status);
            const primaryItem = item.items[0];
            const hasMoreItems = item.items.length > 1;

            return (
              <View style={styles.orderCard}>
                {/* Order Top Bar */}
                <View style={styles.cardHeader}>
                  <View style={styles.orderMeta}>
                    <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: badge.bgColor }]}>
                    <Ionicons name={badge.icon} size={14} color={badge.textColor} />
                    <Text style={[styles.statusText, { color: badge.textColor }]}>
                      {badge.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Item Details Block */}
                <View style={styles.cardBody}>
                  <Image source={{ uri: primaryItem.image }} style={styles.productThumbnail} />

                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {primaryItem.name}
                    </Text>
                    <Text style={styles.productQty}>
                      Qty: {primaryItem.quantity} • ${primaryItem.price.toFixed(2)}
                    </Text>

                    {hasMoreItems && (
                      <Text style={styles.moreItemsText}>
                        + {item.items.length - 1} more item(s)
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Card Footer / Action Bar */}
                <View style={styles.cardFooter}>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalPrice}>${item.totalAmount.toFixed(2)}</Text>
                  </View>

                  <View style={styles.actionGroup}>
                    {item.status === "shipped" && (
                      <TouchableOpacity
                        style={styles.primaryActionBtn}
                        onPress={() =>
                          router.navigate(`/(tabs)/orders/track/${item.id}` as any)
                        }
                        activeOpacity={0.8}
                      >
                        <Text style={styles.primaryActionText}>Track Order</Text>
                        <Feather name="truck" size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}

                    {item.status === "delivered" && (
                      <TouchableOpacity
                        style={styles.secondaryActionBtn}
                        onPress={() =>
                          router.navigate(`/(tabs)/orders/detail/${item.id}` as any)
                        }
                        activeOpacity={0.8}
                      >
                        <Text style={styles.secondaryActionText}>Reorder</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.detailsBtn}
                      onPress={() =>
                        router.navigate(`/(tabs)/orders/detail/${item.id}` as any)
                      }
                      activeOpacity={0.8}
                    >
                      <Text style={styles.detailsBtnText}>Details</Text>
                      <Feather name="chevron-right" size={16} color="#4B5563" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || "#F9FAFB",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabButtonActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
  },
  tabLabelActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderMeta: {
    gap: 2,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  orderDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 12,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  productThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  productQty: {
    fontSize: 13,
    color: "#6B7280",
  },
  moreItemsText: {
    fontSize: 12,
    color: COLORS.primary || "#4830D3",
    fontWeight: "500",
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalContainer: {
    gap: 2,
  },
  totalLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  primaryActionBtn: {
    backgroundColor: COLORS.primary || "#4830D3",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  secondaryActionBtn: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingLeft: 4,
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIconBadge: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "rgba(72, 48, 211, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: COLORS.primary || "#4830D3",
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  shopBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});