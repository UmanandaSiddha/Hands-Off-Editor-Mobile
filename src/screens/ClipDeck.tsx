import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gradient, MediaPlaceholder} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {clips} from '../data';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SCREEN_WIDTH = Dimensions.get('window').width;
/** Drag past this and the card commits to keep/skip instead of springing back. */
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;

export function ClipDeckScreen() {
  const navigation = useNavigation<Nav>();
  const [top, setTop] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  /**
   * Every animation on `pan` must stay on the JS driver. PanResponder feeds the
   * value through Animated.event, which is JS-driven; starting a native-driven
   * animation on the same value throws "Attempting to run JS driven animation
   * on same value as native animated animation".
   */
  const advance = useCallback(
    (direction: 1 | -1) => {
      Animated.timing(pan, {
        toValue: {x: direction * SCREEN_WIDTH * 1.3, y: 0},
        duration: 220,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({x: 0, y: 0});
        setTop(i => (i + 1) % clips.length);
      });
    },
    [pan],
  );

  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 6 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderMove: Animated.event(
          [null, {dx: pan.x, dy: pan.y}],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: (_, g) => {
          if (Math.abs(g.dx) > SWIPE_THRESHOLD) {
            advance(g.dx > 0 ? 1 : -1);
          } else {
            Animated.spring(pan, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
              friction: 6,
            }).start();
          }
        },
      }),
    [pan, advance],
  );

  const clip = clips[top];
  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-14deg', '0deg', '14deg'],
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{clips.length} clips found</Text>
        <Text style={styles.subtitle}>Swipe right to keep · left to skip</Text>
      </View>

      <View style={styles.deck}>
        <View style={[styles.card, styles.cardBack2]} />
        <View style={[styles.card, styles.cardBack1]} />

        <Animated.View
          {...responder.panHandlers}
          style={[
            styles.card,
            styles.cardTop,
            {transform: [{translateX: pan.x}, {translateY: pan.y}, {rotate}]},
          ]}>
          <Pressable
            style={styles.cardPress}
            onPress={() => navigation.navigate('ClipPreview', {index: top})}>
            <MediaPlaceholder style={StyleSheet.absoluteFill} />

            <View style={styles.confidence}>
              <View style={styles.confidenceDot} />
              <Text style={styles.confidenceText}>
                {clip.score} confidence
              </Text>
            </View>

            <View style={styles.captionWrap}>
              <Text style={styles.caption}>{clip.cap}</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text numberOfLines={2} style={styles.cardTitle}>
                {clip.title}
              </Text>
              <Text style={styles.cardMeta}>
                {clip.len} · 41:12 → 41:56
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={() => advance(-1)}>
          <Text style={styles.actionSkip}>×</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Assistant')}>
          <Gradient style={styles.actionPrimary}>
            <Text style={styles.actionPrimaryText}>↑</Text>
          </Gradient>
        </Pressable>
        <Pressable style={styles.action} onPress={() => advance(1)}>
          <Text style={styles.actionKeep}>✓</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  header: {paddingHorizontal: 16, paddingTop: 8},
  title: {
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: -0.6,
    color: colors.text,
  },
  subtitle: {fontFamily: fonts.regular, fontSize: 11.5, color: colors.muted},

  deck: {flex: 1, margin: 16, marginBottom: 8},
  card: {
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
  },
  cardBack2: {
    top: 14,
    left: 16,
    right: 16,
    bottom: 0,
    transform: [{rotate: '-4deg'}],
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  cardBack1: {
    top: 8,
    left: 8,
    right: 8,
    bottom: 6,
    transform: [{rotate: '2.5deg'}],
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  cardTop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 12,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 46,
    shadowOffset: {width: 0, height: 20},
    elevation: 12,
  },
  cardPress: {flex: 1},

  confidence: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  confidenceDot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.mint,
  },
  confidenceText: {fontFamily: fonts.mono, fontSize: 10.5, color: colors.mint},

  captionWrap: {position: 'absolute', left: 14, right: 14, bottom: 74},
  caption: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 17,
    lineHeight: 23,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
  },

  cardFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  cardTitle: {fontFamily: fonts.semibold, fontSize: 12.5, color: '#fff'},
  cardMeta: {
    marginTop: 4,
    fontFamily: fonts.mono,
    fontSize: 10,
    color: 'rgba(255,255,255,0.65)',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingBottom: 16,
  },
  action: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSkip: {fontFamily: fonts.regular, fontSize: 18, color: colors.muted},
  actionKeep: {fontFamily: fonts.regular, fontSize: 16, color: colors.mint},
  actionPrimary: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  actionPrimaryText: {fontFamily: fonts.regular, fontSize: 19, color: '#fff'},
});
