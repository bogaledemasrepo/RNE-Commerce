import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2; // 2-column grid layout preview

type EcommerceLoaderProps = {
  message?: string;
};

export function EcommerceLoader({ message = 'Loading catalog...' }: EcommerceLoaderProps) {
  // Reanimated 3 Shared Values
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);
  const shimmer = useSharedValue(0.3);

  useEffect(() => {
    // Continuous rotation for outer spinner ring
    rotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1,
      false
    );

    // Subtle scale breathing for center badge
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 800, easing: Easing.ease }),
        withTiming(1.0, { duration: 800, easing: Easing.ease })
      ),
      -1,
      true
    );

    // Skeleton shimmer wave effect
    shimmer.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 700, easing: Easing.ease }),
        withTiming(0.3, { duration: 700, easing: Easing.ease })
      ),
      -1,
      true
    );
  }, [rotation, pulse, shimmer]);

  // Animated Styles
  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmer.value,
  }));

  return (
    <View style={styles.container}>
      {/* --- Floating Active Loader Card --- */}
      <Animated.View entering={FadeIn.duration(400)} style={styles.loaderCard}>
        <View style={styles.iconContainer}>
          {/* Outer Glowing Blue Ring */}
          <Animated.View style={[styles.spinnerRing, spinnerStyle]} />

          {/* Inner Bag / Shopping Icon Indicator */}
          <Animated.View style={[styles.centerBadge, pulseStyle]}>
            <View style={styles.bagHandles} />
            <View style={styles.bagBody} />
          </Animated.View>
        </View>

        <Text style={styles.statusText}>{message}</Text>

        {/* Dynamic Blue Progress Bar */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, shimmerStyle]} />
        </View>
      </Animated.View>

      {/* --- Background E-Commerce Skeleton Grid --- */}
      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((key) => (
          <View key={key} style={styles.skeletonCard}>
            {/* Image Placeholder */}
            <Animated.View style={[styles.skeletonImage, shimmerStyle]} />

            {/* Title & Price Placeholders */}
            <View style={styles.skeletonContent}>
              <Animated.View style={[styles.skeletonLineShort, shimmerStyle]} />
              <Animated.View style={[styles.skeletonLineLong, shimmerStyle]} />
              <View style={styles.skeletonRow}>
                <Animated.View style={[styles.skeletonPrice, shimmerStyle]} />
                <Animated.View style={[styles.skeletonButton, shimmerStyle]} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const PRIMARY_BLUE = '#2563EB'; // Vibrant E-Commerce Blue
const SOFT_BLUE = '#EFF6FF';
const BORDER_BLUE = '#BFDBFE';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loaderCard: {
    zIndex: 10,
    width: 220,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  spinnerRing: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: SOFT_BLUE,
    borderTopColor: PRIMARY_BLUE,
    borderRightColor: PRIMARY_BLUE,
  },
  centerBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: SOFT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bagHandles: {
    width: 12,
    height: 6,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bagBody: {
    width: 18,
    height: 14,
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 3,
    marginTop: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  progressTrack: {
    width: 60,
    height: 4,
    backgroundColor: SOFT_BLUE,
    borderRadius: 2,
    marginTop: 14,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 2,
  },

  /* --- Skeleton Placeholder Grid Styles --- */
  skeletonGrid: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    opacity: 0.6,
  },
  skeletonCard: {
    width: CARD_WIDTH - 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  skeletonImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 10,
  },
  skeletonContent: {
    gap: 6,
  },
  skeletonLineShort: {
    width: '50%',
    height: 10,
    backgroundColor: '#CBD5E1',
    borderRadius: 4,
  },
  skeletonLineLong: {
    width: '85%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  skeletonPrice: {
    width: '40%',
    height: 14,
    backgroundColor: BORDER_BLUE,
    borderRadius: 4,
  },
  skeletonButton: {
    width: 28,
    height: 28,
    backgroundColor: SOFT_BLUE,
    borderRadius: 14,
  },
});
