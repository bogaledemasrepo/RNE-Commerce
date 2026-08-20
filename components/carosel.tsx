import { Ad } from '@/types';
import { Image } from 'expo-image';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_WIDTH = SCREEN_WIDTH - 24; // Accounts for paddingHorizontal: 12
const CAROUSEL_HEIGHT = 160; // Explicit height to prevent flex collapse

interface CarouselProps {
  data: Ad[];
}

export default function Carosel({ data }: CarouselProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  // Guard against empty array or undefined API state
  if (!data || data.length === 0) {
    return null;
  }

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      index, // Directly pass target index
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={CONTAINER_WIDTH}
        height={CAROUSEL_HEIGHT}
        data={data}
        autoPlay={data.length > 1}
        autoPlayInterval={4000}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} contentFit="cover" />
          </View>
        )}
      />

      {data.length > 1 && (
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          containerStyle={styles.paginationContainer}
          onPress={onPressPagination}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CAROUSEL_HEIGHT + 24, // Explicit height for layout pass
    alignItems: 'center',
  },
  cardContainer: {
    width: CONTAINER_WIDTH,
    height: CAROUSEL_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0', // Placeholder background color while loading image
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    gap: 6,
    marginTop: 8,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  activeDotStyle: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
});
