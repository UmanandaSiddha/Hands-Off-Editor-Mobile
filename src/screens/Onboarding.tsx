import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts, radius} from '../theme';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const footageTypes = [
  {
    title: 'Podcast / interview',
    body: 'Two or more speakers, long form. Speaker-switch framing, 30–60s clips.',
  },
  {
    title: 'Talking head',
    body: 'Single presenter. Centre-locked crop, bold captions, 20–45s clips.',
  },
  {
    title: 'Webinar / demo',
    body: 'Screen share aware. Splits between slide and speaker automatically.',
  },
  {
    title: 'Vlog / event',
    body: 'Motion-led. Prioritises visual peaks over dialogue density.',
  },
];

const platformNames = ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'LinkedIn'];

export function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  const [footage, setFootage] = useState(0);
  const [platforms, setPlatforms] = useState<string[]>([
    'TikTok',
    'Instagram Reels',
  ]);

  const togglePlatform = (name: string) =>
    setPlatforms(p =>
      p.includes(name) ? p.filter(x => x !== name) : [...p, name],
    );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.steps}>
          <View style={[styles.step, styles.stepDone]} />
          <View style={[styles.step, styles.stepDone]} />
          <View style={styles.step} />
        </View>
        <Text style={styles.stepLabel}>Step 2 of 3</Text>

        <Text style={styles.title}>What kind of footage are you cutting?</Text>
        <Text style={styles.subtitle}>
          This sets your default framing, caption style and clip length. You can
          change it per project later.
        </Text>

        <View style={styles.options}>
          {footageTypes.map((t, i) => {
            const selected = i === footage;
            return (
              <Pressable
                key={t.title}
                onPress={() => setFootage(i)}
                style={[styles.option, selected && styles.optionSelected]}>
                <Text style={styles.optionTitle}>{t.title}</Text>
                <Text
                  style={[
                    styles.optionBody,
                    selected && styles.optionBodySelected,
                  ]}>
                  {t.body}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.platformCard}>
          <Text style={styles.platformHeading}>Where will you post?</Text>
          <View style={styles.platformRow}>
            {platformNames.map(name => {
              const on = platforms.includes(name);
              return (
                <Pressable
                  key={name}
                  onPress={() => togglePlatform(name)}
                  style={[styles.chip, on && styles.chipOn]}>
                  <Text style={[styles.chipLabel, on && styles.chipLabelOn]}>
                    {name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primary}
            onPress={() => navigation.replace('Tabs')}>
            <Text style={styles.primaryLabel}>Continue</Text>
          </Pressable>
          <Pressable onPress={() => navigation.replace('Tabs')}>
            <Text style={styles.skip}>Skip for now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  scroll: {padding: 24, paddingBottom: 48},
  steps: {flexDirection: 'row', gap: 8},
  step: {
    flex: 1,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.lineStrong,
  },
  stepDone: {backgroundColor: colors.accent},
  stepLabel: {
    marginTop: 14,
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.dim,
  },
  title: {
    marginTop: 18,
    fontFamily: fonts.semibold,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.9,
    color: colors.text,
  },
  subtitle: {
    marginTop: 11,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.muted,
  },
  options: {marginTop: 28, gap: 12},
  option: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: colors.fillSoft,
    padding: 20,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: 'rgba(124,92,255,0.10)',
  },
  optionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    letterSpacing: -0.3,
    color: colors.text,
  },
  optionBody: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.muted,
  },
  optionBodySelected: {color: colors.soft},
  platformCard: {
    marginTop: 26,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: 'rgba(255,255,255,0.022)',
    padding: 18,
  },
  platformHeading: {
    fontFamily: fonts.semibold,
    fontSize: 13.5,
    color: colors.text,
  },
  platformRow: {marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  chip: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  chipOn: {
    borderColor: 'rgba(124,92,255,0.42)',
    backgroundColor: 'rgba(124,92,255,0.13)',
  },
  chipLabel: {fontFamily: fonts.regular, fontSize: 13, color: colors.muted},
  chipLabelOn: {color: colors.assistant},
  actions: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  primary: {
    borderRadius: 12,
    backgroundColor: colors.text,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  primaryLabel: {fontFamily: fonts.semibold, fontSize: 14, color: colors.bg},
  skip: {fontFamily: fonts.regular, fontSize: 13.5, color: colors.muted},
});
