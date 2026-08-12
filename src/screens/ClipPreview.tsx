import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gradient, MediaPlaceholder, Waveform} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {clips, miniWaveform} from '../data';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type PreviewRoute = RouteProp<RootStackParamList, 'ClipPreview'>;

export function ClipPreviewScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<PreviewRoute>();
  const index = route.params?.index ?? 0;
  const clip = clips[index];
  const [playing, setPlaying] = useState(true);

  /**
   * The design highlights the emphasised word — the one the caption writer
   * shouted. Every caption in the set has exactly one all-caps word, so match
   * that rather than assuming it is the last word.
   */
  const words = clip.cap.split(' ');
  const shoutIndex = words.findIndex(w => /^[A-Z]{2,}$/.test(w));
  const highlight = shoutIndex === -1 ? words.length - 1 : shoutIndex;

  return (
    <View style={styles.screen}>
      <MediaPlaceholder style={StyleSheet.absoluteFill}>
        <View style={[StyleSheet.absoluteFill, styles.centerLabel]}>
          <Text style={styles.centerLabelText}>full-screen preview</Text>
        </View>
      </MediaPlaceholder>

      <SafeAreaView style={styles.chromeTop} edges={['top']}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.chromeGlyph}>‹</Text>
        </Pressable>
        <Text style={styles.chromeMeta}>
          clip {index + 1} of {clips.length} · {clip.score}
        </Text>
        <Text style={styles.chromeGlyphSmall}>⋯</Text>
      </SafeAreaView>

      <View style={styles.captionWrap}>
        <Text style={styles.caption}>
          {words.map((w, i) => (
            <Text key={i} style={i === highlight ? styles.captionHighlight : undefined}>
              {i > 0 ? ' ' : ''}
              {w}
            </Text>
          ))}
        </Text>
      </View>

      <View style={styles.rail}>
        <Pressable style={styles.railButton}>
          <Text style={styles.railLabel}>Aa</Text>
        </Pressable>
        <Pressable style={styles.railButton}>
          <Text style={styles.railLabel}>✂</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Assistant')}>
          <Gradient style={styles.railButtonAccent}>
            <Text style={styles.railLabelAccent}>AI</Text>
          </Gradient>
        </Pressable>
      </View>

      <SafeAreaView style={styles.chromeBottom} edges={['bottom']}>
        <Waveform bars={miniWaveform} style={styles.waveform} />
        <View style={styles.transport}>
          <Pressable
            style={styles.playButton}
            onPress={() => setPlaying(p => !p)}>
            <Text style={styles.playGlyph}>{playing ? '❚❚' : '▶'}</Text>
          </Pressable>
          <Text style={styles.timecode}>0:18 / {clip.len}</Text>
          <Pressable style={styles.export}>
            <Text style={styles.exportLabel}>Export</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  centerLabel: {alignItems: 'center', justifyContent: 'center'},
  centerLabelText: {fontFamily: fonts.mono, fontSize: 11, color: colors.dim},

  chromeTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  chromeGlyph: {fontFamily: fonts.regular, fontSize: 22, color: '#fff'},
  chromeGlyphSmall: {fontFamily: fonts.regular, fontSize: 16, color: '#fff'},
  chromeMeta: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: 'rgba(255,255,255,0.75)',
  },

  captionWrap: {position: 'absolute', left: 18, right: 18, bottom: 190},
  caption: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.4,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    overflow: 'hidden',
  },
  captionHighlight: {color: colors.mint},

  rail: {position: 'absolute', right: 14, bottom: 250, gap: 12},
  railButton: {
    width: 46,
    height: 46,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  railButtonAccent: {
    width: 46,
    height: 46,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  railLabel: {fontFamily: fonts.regular, fontSize: 13, color: '#fff'},
  railLabelAccent: {fontFamily: fonts.bold, fontSize: 12, color: '#fff'},

  chromeBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  waveform: {height: 38},
  transport: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playGlyph: {fontFamily: fonts.bold, fontSize: 11, color: colors.bg},
  timecode: {fontFamily: fonts.mono, fontSize: 11, color: '#fff'},
  export: {
    marginLeft: 'auto',
    borderRadius: radius.md,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  exportLabel: {fontFamily: fonts.semibold, fontSize: 12, color: colors.bg},
});
