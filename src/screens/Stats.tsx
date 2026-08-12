import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MediaPlaceholder} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {topClips, weeklyExports} from '../data';

const metrics = [
  {label: 'Exports', value: '34'},
  {label: 'Time saved', value: '13h'},
  {label: 'Median score', value: '8.9'},
];

/** The design shows the most recent five weeks on the phone. */
const recentWeeks = weeklyExports.slice(-5);
const peak = Math.max(...recentWeeks);

export function StatsScreen() {
  const top = topClips[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Your month</Text>

        <View style={styles.grid}>
          {metrics.map(m => (
            <View key={m.label} style={styles.metric}>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text style={styles.metricValue}>{m.value}</Text>
            </View>
          ))}
          <View style={[styles.metric, styles.metricAccent]}>
            <Text style={[styles.metricLabel, styles.metricLabelAccent]}>
              Minutes left
            </Text>
            <Text style={styles.metricValue}>188</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Exports per week</Text>
          <View style={styles.chart}>
            {recentWeeks.map((v, i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    height: `${Math.round((v / peak) * 100)}%`,
                    backgroundColor:
                      i === recentWeeks.length - 1
                        ? colors.accent
                        : i === recentWeeks.length - 2
                        ? 'rgba(124,92,255,0.5)'
                        : 'rgba(255,255,255,0.12)',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top clip this month</Text>
        <View style={styles.topRow}>
          <MediaPlaceholder small style={styles.topThumb} />
          <View style={styles.topCopy}>
            <Text style={styles.topTitle}>{top.title}</Text>
            <Text style={styles.topMeta}>
              {top.views} views · {top.score}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  scroll: {paddingHorizontal: 16, paddingTop: 10, paddingBottom: 32},
  title: {
    fontFamily: fonts.semibold,
    fontSize: 21,
    letterSpacing: -0.6,
    color: colors.text,
  },

  grid: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  metric: {
    flexGrow: 1,
    flexBasis: '46%',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.fill,
    padding: 14,
  },
  metricAccent: {
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentFill,
  },
  metricLabel: {fontFamily: fonts.regular, fontSize: 11, color: colors.muted},
  metricLabelAccent: {color: colors.lilac},
  metricValue: {
    marginTop: 5,
    fontFamily: fonts.semibold,
    fontSize: 24,
    letterSpacing: -0.7,
    color: colors.text,
  },

  chartCard: {
    marginTop: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.fill,
    padding: 14,
  },
  chartTitle: {fontFamily: fonts.semibold, fontSize: 12.5, color: colors.text},
  chart: {
    marginTop: 14,
    height: 74,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  bar: {flex: 1, borderRadius: 5},

  sectionTitle: {
    marginTop: 14,
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.text,
  },
  topRow: {
    marginTop: 9,
    flexDirection: 'row',
    gap: 11,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: colors.fill,
    padding: 9,
  },
  topThumb: {width: 34, height: 50, borderRadius: radius.sm},
  topCopy: {flex: 1, minWidth: 0},
  topTitle: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.text,
  },
  topMeta: {
    marginTop: 5,
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.mint,
  },
});
