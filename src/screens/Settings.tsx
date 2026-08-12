import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BrandMark, Eyebrow, Toggle} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {user} from '../data';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const captionStyles = ['HORMOZI', 'Clean', 'Karaoke'];
const highlightColours = ['#7C5CFF', '#2DD4BF', '#FACC15', '#FB7185', '#ECECF1'];

const initialPreferences = [
  {
    label: 'Auto-render top 3 clips',
    hint: 'Start renders as soon as scoring finishes.',
    on: true,
  },
  {
    label: 'Email me when a project is ready',
    hint: 'One digest per project, not per clip.',
    on: true,
  },
  {
    label: 'Use my footage to improve scoring',
    hint: 'Off by default. Never used for other customers.',
    on: false,
  },
];

export function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  const [captionStyle, setCaptionStyle] = useState(0);
  const [highlight, setHighlight] = useState(0);
  const [preferences, setPreferences] = useState(initialPreferences);

  const togglePreference = (index: number) =>
    setPreferences(p =>
      p.map((item, i) => (i === index ? {...item, on: !item.on} : item)),
    );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scroll}>
      <View style={styles.identity}>
        <BrandMark size={56} round={radius.pill} alt />
        <View style={styles.identityCopy}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>
      </View>

      <Text style={styles.fieldLabel}>Full name</Text>
      <TextInput defaultValue={user.name} style={styles.input} />
      <Text style={[styles.fieldLabel, styles.fieldSpaced]}>Email</Text>
      <TextInput
        defaultValue={user.email}
        autoCapitalize="none"
        style={styles.input}
      />

      <Pressable
        style={styles.planCard}
        onPress={() => navigation.navigate('Pricing')}>
        <View style={styles.flex}>
          <Text style={styles.planTitle}>Studio · $49 / month</Text>
          <Text style={styles.planBody}>
            600 source minutes, unlimited exports, 4K renders. Renews 17 Aug
            2026.
          </Text>
        </View>
        <View style={styles.planButton}>
          <Text style={styles.planButtonLabel}>Change</Text>
        </View>
      </Pressable>

      <Eyebrow style={styles.eyebrow}>Brand kit</Eyebrow>
      <Text style={styles.subLabel}>Caption style</Text>
      <View style={styles.styleRow}>
        {captionStyles.map((label, i) => (
          <Pressable
            key={label}
            onPress={() => setCaptionStyle(i)}
            style={[styles.styleChip, i === captionStyle && styles.styleChipOn]}>
            <Text
              style={[
                styles.styleLabel,
                i === 0 && styles.styleLabelBold,
                i === 2 && styles.styleLabelItalic,
              ]}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.subLabel, styles.fieldSpaced]}>Highlight colour</Text>
      <View style={styles.swatchRow}>
        {highlightColours.map((c, i) => (
          <Pressable
            key={c}
            onPress={() => setHighlight(i)}
            style={[
              styles.swatch,
              {backgroundColor: c},
              i === highlight && styles.swatchOn,
            ]}
          />
        ))}
      </View>

      <Eyebrow style={styles.eyebrow}>Preferences</Eyebrow>
      <View style={styles.preferences}>
        {preferences.map((p, i) => (
          <Pressable
            key={p.label}
            style={styles.preference}
            onPress={() => togglePreference(i)}>
            <View style={styles.flex}>
              <Text style={[styles.prefLabel, !p.on && styles.prefLabelOff]}>
                {p.label}
              </Text>
              <Text style={styles.prefHint}>{p.hint}</Text>
            </View>
            <Toggle on={p.on} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  scroll: {paddingHorizontal: 16, paddingBottom: 40},
  flex: {flex: 1},

  identity: {flexDirection: 'row', alignItems: 'center', gap: 16},
  identityCopy: {flex: 1},
  name: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    letterSpacing: -0.3,
    color: colors.text,
  },
  role: {
    marginTop: 3,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
  },

  fieldLabel: {
    marginTop: 22,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.muted,
  },
  fieldSpaced: {marginTop: 16},
  input: {
    marginTop: 7,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.text,
  },

  planCard: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.24)',
    backgroundColor: 'rgba(124,92,255,0.10)',
    padding: 18,
  },
  planTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    letterSpacing: -0.3,
    color: colors.text,
  },
  planBody: {
    marginTop: 5,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.soft,
  },
  planButton: {
    borderRadius: radius.md,
    backgroundColor: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  planButtonLabel: {fontFamily: fonts.semibold, fontSize: 12.5, color: colors.bg},

  eyebrow: {marginTop: 26},
  subLabel: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.muted,
  },
  styleRow: {marginTop: 10, flexDirection: 'row', gap: 7},
  styleChip: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    backgroundColor: colors.fill,
    paddingVertical: 12,
    alignItems: 'center',
  },
  styleChipOn: {
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: 'rgba(124,92,255,0.10)',
  },
  styleLabel: {fontFamily: fonts.medium, fontSize: 12, color: colors.text},
  styleLabelBold: {fontFamily: fonts.bold},
  styleLabelItalic: {fontStyle: 'italic'},

  swatchRow: {marginTop: 10, flexDirection: 'row', gap: 8},
  swatch: {width: 30, height: 30, borderRadius: 9},
  swatchOn: {borderWidth: 2, borderColor: 'rgba(255,255,255,0.85)'},

  preferences: {marginTop: 12, gap: 8},
  preference: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: 'rgba(255,255,255,0.025)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  prefLabel: {fontFamily: fonts.regular, fontSize: 13.5, color: colors.text},
  prefLabelOff: {color: colors.muted},
  prefHint: {
    marginTop: 3,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.muted,
  },
});
