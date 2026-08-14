import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PaginatedProductResponse } from '@/app/types';
import Carosel from '@/components/carosel';
import { API_BASE_URL } from '@/constants';
import COLORS from '@/constants/color';
import { useAuth } from '@/context/use-auth';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2; // Precise 2-column calculation

export interface Category {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
}

const Home = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeFilter, setActiveFilter] = useState<'forYou' | 'bestSellers'>('forYou');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productData, setProductData] = useState<PaginatedProductResponse>();
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(API_BASE_URL + '/categories');
      const data = await response.json();
      setCategories(data);
      console.log(data);
    }

    async function fetchCollections() {
      const response = await fetch(
        API_BASE_URL + '/products/page?page=0&size=10&sortBy=id&sortDir=asc'
      );
      const data: PaginatedProductResponse = await response.json();
      setProductData(data);
    }
    fetchCategories();
    fetchCollections();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Header Bar */}
        <View style={styles.headerRow}>
          <View style={styles.userGreeting}>
            <Text style={styles.greetingSub}>Welcome back 👋</Text>
            <Text style={styles.greetingName}>{user?.name}</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => router.navigate('/(tabs)/profile/notifications/page' as any)}
            hitSlop={8}
          >
            <Ionicons name="notifications-outline" size={22} color="#1F2937" />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>

        {/* Search & Scan Action Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products, brands..."
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity hitSlop={6}>
              <AntDesign name="scan" size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Bar */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((item) => {
            const isSelected = selectedCategory === item.id.toString();
            return (
              <Pressable
                key={item.id}
                onPress={() => setSelectedCategory(isSelected ? null : item.id.toString())}
                style={styles.categoryItem}
              >
                <View
                  style={[styles.categoryIconCircle, isSelected && styles.categoryIconCircleActive]}
                >
                  <Ionicons
                    name={'accessibility'}
                    size={22}
                    color={isSelected ? '#FFFFFF' : '#374151'}
                  />
                </View>
                <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelActive]}>
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Hero Carousel */}
        <View style={styles.carouselWrapper}>
          <Carosel />
        </View>

        {/* Product Filter Chips & Navigation */}
        <View style={styles.filterRow}>
          <View style={styles.chipGroup}>
            <Pressable
              onPress={() => setActiveFilter('forYou')}
              style={[styles.chip, activeFilter === 'forYou' && styles.chipActive]}
            >
              <Text style={[styles.chipText, activeFilter === 'forYou' && styles.chipTextActive]}>
                For You
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveFilter('bestSellers')}
              style={[styles.chip, activeFilter === 'bestSellers' && styles.chipActive]}
            >
              <AntDesign
                name="star"
                size={14}
                color={activeFilter === 'bestSellers' ? '#FFFFFF' : '#6B7280'}
              />
              <Text
                style={[styles.chipText, activeFilter === 'bestSellers' && styles.chipTextActive]}
              >
                Best Sellers
              </Text>
            </Pressable>
          </View>

          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View all</Text>
            <FontAwesome name="angle-right" size={16} color={COLORS.primary || '#4830D3'} />
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View style={styles.gridContainer}>
          {productData?.content.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <Pressable
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: '/home/detail/[slug]',
                    params: { slug: item.id, tab: 'settings' },
                  })
                }
                style={({ pressed }) => [styles.productCard, pressed && styles.cardPressed]}
              >
                <ImageBackground
                  source={{ uri: item.imageUrl }}
                  style={styles.cardBackground}
                  imageStyle={styles.cardImageStyle}
                >
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

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },
  userGreeting: {
    gap: 2,
  },
  greetingSub: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  greetingName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchSection: {
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#111827',
  },
  sectionHeader: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  categoryList: {
    paddingHorizontal: 12,
    gap: 16,
    paddingBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIconCircleActive: {
    backgroundColor: COLORS.primary || '#4830D3',
    borderColor: COLORS.primary || '#4830D3',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  categoryLabelActive: {
    color: COLORS.primary || '#4830D3',
    fontWeight: '700',
  },
  carouselWrapper: {
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  chipGroup: {
    flexDirection: 'row',
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
    color: COLORS.primary || '#4830D3',
  },
  gridContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
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
