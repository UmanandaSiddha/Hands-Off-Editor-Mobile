import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandMark, MediaPlaceholder, MeterBar} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {recentProjects, stageFor} from '../data';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/** The spinning ring the design puts on the live processing card. */
function Spinner({size = 26}: {size?: number}) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size,
          height: size,
          transform: [
            {
              rotate: spin.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    />
  );
}

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [progress, setProgress] = useState(62);

  useEffect(() => {
    const id = setInterval(
      () => setProgress(p => (p >= 97 ? 41 : p + 1)),
      1100,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Forge</Text>
            <Text style={styles.subtitle}>14 clips awaiting review</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <BrandMark size={30} round={radius.pill} alt />
          </Pressable>
        </View>

        <View style={styles.dropzone}>
          <View style={styles.dropzoneIcon}>
            <View style={styles.dropzoneGlyph} />
          </View>
          <Text style={styles.dropzoneTitle}>Upload or paste a link</Text>
          <Text style={styles.dropzoneHint}>Camera roll · Files · YouTube</Text>
        </View>

        <View style={styles.processing}>
          <View style={styles.processingRow}>
            <Spinner />
            <View style={styles.processingCopy}>
              <Text numberOfLines={1} style={styles.processingTitle}>
                Founder Pod — Ep. 42
              </Text>
              <Text style={styles.processingStage}>
                {stageFor(progress)} · {progress}%
              </Text>
            </View>
          </View>
          <MeterBar
            percent={progress}
            height={4}
            track="rgba(0,0,0,0.4)"
            style={styles.processingMeter}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <Pressable onPress={() => navigation.navigate('Projects')}>
            <Text style={styles.sectionAction}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.recentList}>
          {recentProjects.map(p => (
            <Pressable
              key={p.title}
              style={styles.recentRow}
              onPress={() => navigation.navigate('Projects')}>
              <MediaPlaceholder small style={styles.recentThumb} />
              <View style={styles.recentCopy}>
                <Text numberOfLines={1} style={styles.recentTitle}>
                  {p.title}
                </Text>
                <Text style={styles.recentMeta}>
                  {p.clips} clips · {p.when}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  scroll: {paddingHorizontal: 16, paddingTop: 10, paddingBottom: 32},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 21,
    letterSpacing: -0.6,
    color: colors.text,
  },
  subtitle: {fontFamily: fonts.regular, fontSize: 12, color: colors.muted},

  dropzone: {
    marginTop: 16,
    borderRadius: radius.card,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(124,92,255,0.42)',
    backgroundColor: 'rgba(124,92,255,0.09)',
    padding: 22,
    alignItems: 'center',
  },
  dropzoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.34)',
    backgroundColor: 'rgba(124,92,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropzoneGlyph: {
    width: 13,
    height: 13,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  dropzoneTitle: {
    marginTop: 12,
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.text,
  },
  dropzoneHint: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.muted,
  },

  processing: {
    marginTop: 14,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.28)',
    backgroundColor: 'rgba(124,92,255,0.10)',
    padding: 14,
  },
  processingRow: {flexDirection: 'row', alignItems: 'center', gap: 11},
  spinner: {
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(124,92,255,0.35)',
    borderTopColor: colors.accent,
  },
  processingCopy: {flex: 1, minWidth: 0},
  processingTitle: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: colors.text,
  },
  processingStage: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.soft,
  },
  processingMeter: {marginTop: 11},

  sectionHeader: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {fontFamily: fonts.semibold, fontSize: 13, color: colors.text},
  sectionAction: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.muted,
  },

  recentList: {marginTop: 10, gap: 8},
  recentRow: {
    flexDirection: 'row',
    gap: 11,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: colors.fill,
    padding: 9,
    alignItems: 'center',
  },
  recentThumb: {width: 44, height: 30, borderRadius: radius.sm},
  recentCopy: {flex: 1, minWidth: 0},
  recentTitle: {fontFamily: fonts.medium, fontSize: 12.5, color: colors.text},
  recentMeta: {fontFamily: fonts.regular, fontSize: 11, color: colors.dim},
});
