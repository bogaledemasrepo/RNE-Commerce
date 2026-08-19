import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native';

import { EcommerceLoader } from '@/components/EcommerceLoader';
import { API_BASE_URL } from '@/constants';
import COLORS from '@/constants/color';
import { useCart } from '@/context/use-cart';
import { Product } from '@/types';

const { width } = Dimensions.get('window');

const MOCK_PRODUCT = {
  id: 'prod_1',
  name: 'Minimalist Leather Sneaker',
  brand: 'Vela Studio',
  price: 180.0,
  originalPrice: 220.0,
  rating: 4.8,
  reviewsCount: 124,
  description:
    'Crafted from full-grain Italian leather, these minimalist sneakers feature a cushioned footbed, reinforced stitching, and a durable rubber outsole designed for all-day comfort.',
  images: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
  ],
  colors: [
    { id: 'c1', name: 'Pure White', hex: '#FFFFFF' },
    { id: 'c2', name: 'Obsidian', hex: '#111827' },
    { id: 'c3', name: 'Sand Beige', hex: '#D4C5B9' },
  ],
  sizes: ['39', '40', '41', '42', '43', '44'],
};

export default function DetailScreen() {
  const { slug, tab } = useLocalSearchParams<{ slug: string; tab?: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(MOCK_PRODUCT.colors[0].id);
  const [selectedSize, setSelectedSize] = useState('42');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  const [item, setItem] = useState<Product>();

  const handleAddToCart = () => {
    if (item) {
      addItem(item);
      Toast.success('Added to cart!');
      router.back();
    } else Toast.error('Something goes wrong!');
  };

  const handleBuyNow = () => {
    router.navigate('/(tabs)/cart/checkout' as any);
  };
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(API_BASE_URL + '/products/' + slug);
      const data = await response.json();
      setItem(data);
    }
    fetchCategories();
  }, []);
  return (
    <View style={styles.safeArea}>
      {item ? (
        <>
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Top Floating Action Buttons */}
              <View style={styles.floatingHeader}>
                <TouchableOpacity
                  style={styles.iconCircle}
                  onPress={() => router.back()}
                  hitSlop={8}
                >
                  <Ionicons name="chevron-back" size={22} color="#111827" />
                </TouchableOpacity>

                <View style={styles.headerRightGroup}>
                  <TouchableOpacity
                    style={styles.iconCircle}
                    onPress={() => setIsFavorite(!isFavorite)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={isFavorite ? 'heart' : 'heart-outline'}
                      size={20}
                      color={isFavorite ? '#EF4444' : '#111827'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconCircle}
                    onPress={() => router.navigate('/(tabs)/cart/page' as any)}
                    hitSlop={8}
                  >
                    <Ionicons name="bag-handle-outline" size={20} color="#111827" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Image Gallery Slider */}
              <View style={styles.imageGalleryContainer}>
                <FlatList
                  data={item.imageUrl}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  onScroll={(e) => {
                    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
                    if (slide !== activeImageIndex) setActiveImageIndex(slide);
                  }}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.galleryImage} resizeMode="cover" />
                  )}
                />

                {/* Pagination Indicators */}
                <View style={styles.paginationDots}>
                  {[1, 2, 3, 4].map((_, idx) => (
                    <View
                      key={idx}
                      style={[styles.dot, activeImageIndex === idx && styles.activeDot]}
                    />
                  ))}
                </View>
              </View>

              {/* Product Header Information */}
              <View style={styles.contentSection}>
                <View style={styles.titleRow}>
                  <View style={styles.titleBlock}>
                    <Text style={styles.brandText}>{MOCK_PRODUCT.brand}</Text>
                    <Text style={styles.productName}>{item.name}</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.ratingText}>{MOCK_PRODUCT.rating}</Text>
                    <Text style={styles.reviewsText}>({MOCK_PRODUCT.reviewsCount})</Text>
                  </View>
                </View>

                {/* Price Row */}
                <View style={styles.priceRow}>
                  <Text style={styles.currentPrice}>${item.price.toFixed(2)}</Text>
                  {MOCK_PRODUCT.originalPrice && (
                    <Text style={styles.originalPrice}>
                      ${MOCK_PRODUCT.originalPrice.toFixed(2)}
                    </Text>
                  )}
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>18% OFF</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Color Selection */}
                <View style={styles.optionGroup}>
                  <Text style={styles.optionLabel}>
                    Color:{' '}
                    <Text style={styles.selectedOptionText}>
                      {MOCK_PRODUCT.colors.find((c) => c.id === selectedColor)?.name}
                    </Text>
                  </Text>
                  <View style={styles.colorRow}>
                    {MOCK_PRODUCT.colors.map((color) => {
                      const isSelected = selectedColor === color.id;
                      return (
                        <TouchableOpacity
                          key={color.id}
                          style={[styles.colorRing, isSelected && styles.colorRingSelected]}
                          onPress={() => setSelectedColor(color.id)}
                        >
                          <View style={[styles.colorDot, { backgroundColor: color.hex }]} />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Size Selection */}
                <View style={styles.optionGroup}>
                  <View style={styles.sizeHeaderRow}>
                    <Text style={styles.optionLabel}>
                      Select Size (EU):{' '}
                      <Text style={styles.selectedOptionText}>{selectedSize}</Text>
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.sizeGuideText}>Size Guide</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.sizeRow}>
                    {MOCK_PRODUCT.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <TouchableOpacity
                          key={size}
                          style={[styles.sizeChip, isSelected && styles.sizeChipSelected]}
                          onPress={() => setSelectedSize(size)}
                        >
                          <Text style={[styles.sizeText, isSelected && styles.sizeTextSelected]}>
                            {size}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Quantity Stepper */}
                <View style={styles.quantityRow}>
                  <Text style={styles.optionLabel}>Quantity</Text>
                  <View style={styles.stepperContainer}>
                    <Pressable
                      style={styles.stepperBtn}
                      onPress={() => setQuantity(Math.max(1, quantity - 1))}
                      hitSlop={6}
                    >
                      <Feather name="minus" size={14} color="#374151" />
                    </Pressable>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <Pressable
                      style={styles.stepperBtn}
                      onPress={() => setQuantity(quantity + 1)}
                      hitSlop={6}
                    >
                      <Feather name="plus" size={14} color="#374151" />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Description Section */}
                <View style={styles.descriptionSection}>
                  <Text style={styles.sectionHeaderTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                </View>
              </View>
            </ScrollView>

            {/* Sticky Purchase Action Bar */}
            <View style={styles.bottomActionBar}>
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={() => handleAddToCart()}
                activeOpacity={0.8}
              >
                <Ionicons name="bag-handle-outline" size={18} color={COLORS.primary || '#4830D3'} />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buyNowBtn}
                onPress={handleBuyNow}
                activeOpacity={0.85}
              >
                <Text style={styles.buyNowText}>
                  Buy Now • ${(item.price * quantity).toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <EcommerceLoader message="Fetching products..." />
      )}
      <ToastManager />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 100, // Buffer space for sticky bar
  },
  floatingHeader: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRightGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageGalleryContainer: {
    position: 'relative',
    width: width,
    height: 380,
    backgroundColor: '#F3F4F6',
  },
  galleryImage: {
    width: width,
    height: 380,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    width: 20,
    backgroundColor: '#FFFFFF',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    marginRight: 12,
  },
  brandText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },
  reviewsText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  optionGroup: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  selectedOptionText: {
    fontWeight: '700',
    color: '#111827',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorRingSelected: {
    borderColor: COLORS.primary || '#4830D3',
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sizeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeGuideText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary || '#4830D3',
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeChip: {
    width: 48,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipSelected: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  sizeTextSelected: {
    color: '#FFFFFF',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  stepperBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 16,
  },
  descriptionSection: {
    gap: 8,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  addToCartBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary || '#4830D3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary || '#4830D3',
  },
  buyNowBtn: {
    flex: 1.4,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary || '#4830D3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary || '#4830D3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buyNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
