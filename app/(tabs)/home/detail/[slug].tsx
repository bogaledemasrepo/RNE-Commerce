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
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string; tab?: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  const [item, setItem] = useState<Product>();

  const handleAddToCart = () => {
    if (item) {
      addItem(item);
      Toast.success('Added to cart!');
      router.back();
    } else {
      Toast.error('Something went wrong!');
    }
  };

  const handleBuyNow = () => {
    router.navigate('/(tabs)/cart/checkout' as any);
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${slug}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
      }
    }
    fetchProduct();
  }, [slug]);

  return (
    <View style={styles.safeArea}>
      {item ? (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Top Floating Action Buttons */}
            <View style={styles.floatingHeader}>
              <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()} hitSlop={8}>
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

            {/* Image Gallery Slider using expo-image */}
            <View style={styles.imageGalleryContainer}>
              <FlatList
                data={[item.imageUrl]}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                onScroll={(e) => {
                  const slide = Math.round(e.nativeEvent.contentOffset.x / width);
                  if (slide !== activeImageIndex) setActiveImageIndex(slide);
                }}
                renderItem={({ item: imageUrl }) => (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.galleryImage}
                    resizeMode="cover" // 2. REPLACED resizeMode WITH contentFit
                    // transition={300}   // 3. SMOOTH FADE-IN ANIMATION
                    // cachePolicy="disk" // 4. CACHES RENDER IMAGES LOCALLY
                  />
                )}
              />

              {/* Pagination Indicators */}
              <View style={styles.paginationDots}>
                {[1].map((_, idx) => (
                  <View
                    key={idx}
                    style={[styles.dot, activeImageIndex === idx && styles.activeDot]}
                  />
                ))}
              </View>
            </View>

            {/* Product Content Information */}
            <View style={styles.contentSection}>
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
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Ionicons name="bag-handle-outline" size={18} color={COLORS.primary || '#4830D3'} />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyNowBtn} onPress={handleBuyNow} activeOpacity={0.85}>
              <Text style={styles.buyNowText}>Buy Now • ${(item.price * quantity).toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <EcommerceLoader message="Fetching product..." />
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
    paddingBottom: 100,
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
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
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
