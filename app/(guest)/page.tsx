import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
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
import COLORS from '@/constants/color';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; // Precise 2-column layout width with padding

// Mock product data for clean rendering
const MOCK_PRODUCTS = [
  { id: '1', name: 'Minimalist Hoodie', price: '$120.00', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500&auto=format&fit=crop' },
  { id: '2', name: 'Leather Sneaker', price: '$180.00', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop' },
  { id: '3', name: 'Classic Watch', price: '$250.00', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop' },
  { id: '4', name: 'Denim Jacket', price: '$145.00', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=500&auto=format&fit=crop' },
  { id: '5', name: 'Minimalist Hoodie', price: '$120.00', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500&auto=format&fit=crop' },
  { id: '6', name: 'Leather Sneaker', price: '$180.00', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop' },
  { id: '7', name: 'Classic Watch', price: '$250.00', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop' },
  { id: '8', name: 'Denim Jacket', price: '$145.00', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=500&auto=format&fit=crop' },
  { id: '9', name: 'Minimalist Hoodie', price: '$120.00', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500&auto=format&fit=crop' },
  { id: '10', name: 'Leather Sneaker', price: '$180.00', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop' },
];

const GuestCollections = () => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'bestSellers'>('forYou');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

          <Pressable
            style={styles.viewAllBtn}
            onPress={() => router.navigate('/(tabs)/home/detail')}
          >
            <Text style={styles.viewAllText}>View all</Text>
            <FontAwesome name="angle-right" size={16} color="#4830D3" />
          </Pressable>
        </View>

        {/* Product Grid */}
        <View style={styles.gridContainer}>
          {MOCK_PRODUCTS.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <Pressable
                key={item.id}
                onPress={() => router.navigate('/(tabs)/home/detail')}
                style={({ pressed }) => [
                  styles.productCard,
                  pressed && styles.cardPressed,
                ]}
              >
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.cardBackground}
                  imageStyle={styles.cardImageStyle}
                >
                  {/* Top Header: Wishlist Button */}
                  <View style={styles.cardHeader}>
                    <Pressable
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(item.id)}
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