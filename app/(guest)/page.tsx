import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Carosel from '@/components/carosel';
import { API_BASE_URL } from '@/constants';
import COLORS from '@/constants/color';
import { PaginatedProductResponse } from '../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; // Precise 2-column layout width with padding

const GuestCollections = () => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'bestSellers'>('forYou');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [productData, setProductData] = useState<PaginatedProductResponse>();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    async function fetchCollections() {
      const response = await fetch(
        API_BASE_URL + '/products/page?page=0&size=10&sortBy=id&sortDir=asc'
      );
      const data: PaginatedProductResponse = await response.json();
      setProductData(data);
      console.log(data);
    }
    fetchCollections();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          <Carosel />
        </View>

        {/* Filter Tabs & Header */}
        <View style={styles.headerRow}>
          <View style={styles.tabGroup}>
            <Pressable
              onPress={() => setActiveTab('forYou')}
              style={[styles.chip, activeTab === 'forYou' && styles.chipActive]}
            >
              <Text style={[styles.chipText, activeTab === 'forYou' && styles.chipTextActive]}>
                Guest Collections
              </Text>
            </Pressable>
          </View>

          {/* <Pressable
            style={styles.viewAllBtn}
            onPress={() => router.navigate('/(tabs)/home/detail')}
          >
            <Text style={styles.viewAllText}>View all</Text>
            <FontAwesome name="angle-right" size={16} color="#4830D3" />
          </Pressable> */}
        </View>

        {/* Product Grid */}
        <View style={styles.gridContainer}>
          {productData?.content.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.productCard, pressed && styles.cardPressed]}
              >
                <ImageBackground
                  source={{ uri: item.imageUrl }}
                  style={styles.cardBackground}
                  imageStyle={styles.cardImageStyle}
                >
                  {/* Top Header: Wishlist Button */}
                  <View style={styles.cardHeader}>
                    <Pressable
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(item.imageUrl)}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={18}
                        color={isFav ? '#EF4444' : '#1F2937'}
                      />
                    </Pressable>
                  </View>

                  {/* Bottom Overlay Info */}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.85)']}
                    style={styles.gradientOverlay}
                  >
                    <View style={styles.cardFooter}>
                      <Text numberOfLines={1} style={styles.productName}>
                        {item.name}
                      </Text>
                      <Text style={styles.productPrice}>{item.price}</Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuestCollections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  carouselContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4830D3',
  },
  gridContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 4,
  },
  productCard: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    // Elevation & Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  cardHeader: {
    alignItems: 'flex-end',
    padding: 8,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardFooter: {
    gap: 2,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  productPrice: {
    color: '#F3F4F6',
    fontSize: 13,
    fontWeight: '700',
  },
});
