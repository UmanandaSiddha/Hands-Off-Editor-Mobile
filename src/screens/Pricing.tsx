import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, radius} from '../theme';

const plans = [
  {
    name: 'Creator',
    price: '$19',
    sub: '120 source minutes · 1080p exports',
    features: [
      'Unlimited clips per project',
      'Auto captions and titles',
      'TikTok, Reels and Shorts presets',
      '7-day render history',
    ],
    cta: 'Start free trial',
    featured: false,
  },
  {
    name: 'Studio',
    price: '$49',
    sub: '600 source minutes · 4K exports',
    features: [
      'Everything in Creator',
      'AI assistant with unlimited edits',
      'Brand kit: fonts, colours, logo bug',
      'Scheduling to connected accounts',
      '90-day render history',
    ],
    cta: 'Current plan',
    featured: true,
  },
  {
    name: 'Agency',
    price: '$149',
    sub: '2,400 source minutes · 5 workspaces',
    features: [
      'Everything in Studio',
      'Client review links with comments',
      'Shared brand kits per client',
      'Priority render queue',
      'SSO and audit log',
    ],
    cta: 'Talk to sales',
    featured: false,
  },
];

export function PricingScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Pay for output, not seats.</Text>
      <Text style={styles.subtitle}>
        Every plan includes the full editor, the assistant, and exports to all
        three platforms. You&apos;re only buying source minutes.
      </Text>

      {plans.map(plan => (
        <View
          key={plan.name}
          style={[styles.card, plan.featured && styles.cardFeatured]}>
          {plan.featured && (
            <View style={styles.tag}>
              <Text style={styles.tagLabel}>Most popular</Text>
            </View>
          )}
          <Text style={styles.planName}>{plan.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.per}>/ month</Text>
          </View>
          <Text style={[styles.sub, plan.featured && styles.subFeatured]}>
            {plan.sub}
          </Text>

          <View style={styles.features}>
            {plan.features.map(f => (
              <Text
                key={f}
                style={[
                  styles.feature,
                  plan.featured && styles.featureFeatured,
                ]}>
                {f}
              </Text>
            ))}
          </View>

          <Pressable
            style={[styles.cta, plan.featured && styles.ctaFeatured]}>
            <Text
              style={[
                styles.ctaLabel,
                plan.featured && styles.ctaLabelFeatured,
              ]}>
              {plan.cta}
            </Text>
          </Pressable>
        </View>
      ))}

      <Text style={styles.footnote}>
        All plans include unused-minute rollover for one cycle. Cancel or switch
        at any time.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  scroll: {paddingHorizontal: 16, paddingBottom: 40, gap: 16},
  title: {
    fontFamily: fonts.semibold,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -1,
    color: colors.text,
  },
  subtitle: {
    marginTop: -4,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
  },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.fillSoft,
    padding: 22,
  },
  cardFeatured: {
    borderColor: 'rgba(124,92,255,0.42)',
    backgroundColor: 'rgba(124,92,255,0.10)',
  },
  tag: {
    position: 'absolute',
    top: -11,
    left: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  tagLabel: {fontFamily: fonts.semibold, fontSize: 11, color: '#fff'},
  planName: {fontFamily: fonts.semibold, fontSize: 15, color: colors.text},
  priceRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    fontFamily: fonts.semibold,
    fontSize: 40,
    letterSpacing: -1.5,
    color: colors.text,
  },
  per: {fontFamily: fonts.regular, fontSize: 13.5, color: colors.muted},
  sub: {marginTop: 8, fontFamily: fonts.regular, fontSize: 13.5, color: colors.muted},
  subFeatured: {color: colors.soft},

  features: {marginTop: 22, gap: 11},
  feature: {fontFamily: fonts.regular, fontSize: 13.5, color: colors.soft},
  featureFeatured: {color: colors.assistant},

  cta: {
    marginTop: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaFeatured: {backgroundColor: colors.text, borderColor: colors.text},
  ctaLabel: {fontFamily: fonts.semibold, fontSize: 13.5, color: colors.text},
  ctaLabelFeatured: {color: colors.bg},

  footnote: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.dim,
  },
});
