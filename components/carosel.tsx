import { Ad } from '@/types';
import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;

function Carosel({ data }: { data: Ad[] }) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width - 20}
        height={width / 3}
        data={data}
        autoPlay
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#ccccccff',
              borderRadius: 8,
              justifyContent: 'center',
            }}
          >
            <Image
              style={{ borderRadius: 8 }}
              resizeMode="stretch"
              resizeMethod="resize"
              source={{ uri: item.imageUrl }}
              height={200}
              width={400}
            />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default Carosel;
