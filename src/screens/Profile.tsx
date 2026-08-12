import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandMark, MeterBar, Toggle} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {usage, user} from '../data';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const [wifiOnly, setWifiOnly] = useState(true);

  /** Only the param-less destinations are reachable from this list. */
  const rows: {
    label: string;
    right: React.ReactNode;
    to: 'Settings' | 'ExportHistory' | 'Notifications' | 'Pricing';
  }[] = [
    {label: 'Brand kit', right: <Text style={styles.chevron}>›</Text>, to: 'Settings'},
    {
      label: 'Connected accounts',
      right: <Text style={styles.rowValue}>3 ›</Text>,
      to: 'Settings',
    },
    {
      label: 'Export history',
      right: <Text style={styles.chevron}>›</Text>,
      to: 'ExportHistory',
    },
    {
      label: 'Notifications',
      right: (
        <View style={styles.countPill}>
          <Text style={styles.countPillText}>3</Text>
        </View>
      ),
      to: 'Notifications',
    },
    {
      label: 'Default caption style',
      right: <Text style={styles.rowValue}>Hormozi ›</Text>,
      to: 'Settings',
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.identity}>
          <BrandMark size={52} round={radius.pill} alt />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        <Pressable
          style={styles.planCard}
          onPress={() => navigation.navigate('Pricing')}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{user.plan}</Text>
            <Text style={styles.planUsage}>
              {usage.used} / {usage.total} min
            </Text>
          </View>
          <MeterBar
            percent={usage.percent}
            track="rgba(0,0,0,0.4)"
            style={styles.planMeter}
          />
          <Text style={styles.planRenewal}>Renews 17 Aug · $49 / month</Text>
        </Pressable>

        <View style={styles.rows}>
          {rows.map((row, i) => (
            <Pressable
              key={row.label}
              style={[styles.row, i > 0 && styles.rowDivided]}
              onPress={() => navigation.navigate(row.to)}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              {row.right}
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.toggleRow}
          onPress={() => setWifiOnly(v => !v)}>
          <Text style={styles.rowLabel}>Render on Wi-Fi only</Text>
          <Toggle on={wifiOnly} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  scroll: {paddingHorizontal: 16, paddingTop: 14, paddingBottom: 32},
  identity: {flexDirection: 'row', alignItems: 'center', gap: 13},
  name: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: colors.text,
  },
  email: {fontFamily: fonts.regular, fontSize: 11.5, color: colors.muted},

  planCard: {
    marginTop: 16,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentFill,
    padding: 15,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  planName: {fontFamily: fonts.semibold, fontSize: 13, color: colors.text},
  planUsage: {fontFamily: fonts.mono, fontSize: 11, color: colors.lilac},
  planMeter: {marginTop: 10},
  planRenewal: {
    marginTop: 11,
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.soft,
  },

  rows: {
    marginTop: 16,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.fill,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  rowDivided: {borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)'},
  rowLabel: {fontFamily: fonts.regular, fontSize: 13, color: colors.text},
  rowValue: {fontFamily: fonts.regular, fontSize: 11.5, color: colors.dim},
  chevron: {fontFamily: fonts.regular, fontSize: 14, color: colors.dim},
  countPill: {
    borderRadius: radius.pill,
    backgroundColor: 'rgba(124,92,255,0.22)',
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  countPillText: {fontFamily: fonts.mono, fontSize: 10, color: colors.lilac},

  toggleRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.fill,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
});
