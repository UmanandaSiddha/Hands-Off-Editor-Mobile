import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {colors, fonts, hatch, radius} from '../theme';

/**
 * React Native has no CSS gradients and we deliberately ship no gradient
 * dependency, so gradients are approximated with a stack of interpolated
 * strips. At the sizes the design uses — 26px marks, 5px meters, 44px buttons —
 * the banding is not visible.
 *
 * ponytail: strip count 14 is plenty here; swap in a real gradient library if a
 * large gradient surface ever appears.
 */
const STRIPS = 14;

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function Gradient({
  from = colors.accent,
  to = colors.accent2,
  vertical = false,
  style,
  children,
}: {
  from?: string;
  to?: string;
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return (
    <View style={[{overflow: 'hidden'}, style]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {flexDirection: vertical ? 'column' : 'row'},
        ]}>
        {Array.from({length: STRIPS}, (_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: `rgb(${lerp(a[0], b[0], i / (STRIPS - 1))},${lerp(
                a[1],
                b[1],
                i / (STRIPS - 1),
              )},${lerp(a[2], b[2], i / (STRIPS - 1))})`,
            }}
          />
        ))}
      </View>
      {children}
    </View>
  );
}

/** The gradient app mark. */
export function BrandMark({
  size = 26,
  round = 8,
  alt = false,
  style,
}: {
  size?: number;
  round?: number;
  alt?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Gradient
      from={alt ? colors.accent2 : colors.accent}
      to={alt ? colors.accent : colors.accent2}
      style={[{width: size, height: size, borderRadius: round}, style]}
    />
  );
}

/** Standard panel surface. */
export function Card({
  style,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/** Uppercase mono section label. */
export function Eyebrow({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.eyebrow, style]}>{children}</Text>;
}

/**
 * Stand-in for a video frame. The design draws diagonal hatching; a solid tone
 * plus a few offset bars reads the same at these sizes without an image asset.
 */
export function MediaPlaceholder({
  style,
  small,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  small?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={[
        {backgroundColor: small ? hatch.small : hatch.large, overflow: 'hidden'},
        style,
      ]}>
      <View style={StyleSheet.absoluteFill}>
        {Array.from({length: 12}, (_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: i % 2 ? 'rgba(0,0,0,0.22)' : 'transparent',
            }}
          />
        ))}
      </View>
      {children}
    </View>
  );
}

/** Gradient progress meter. */
export function MeterBar({
  percent,
  height = 5,
  track = colors.lineStrong,
  fill,
  style,
}: {
  percent: number;
  height?: number;
  track?: string;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {height, borderRadius: radius.pill, backgroundColor: track, overflow: 'hidden'},
        style,
      ]}>
      {fill ? (
        <View
          style={{width: `${percent}%`, height: '100%', backgroundColor: fill}}
        />
      ) : (
        <Gradient
          style={{width: `${percent}%`, height: '100%', borderRadius: radius.pill}}
        />
      )}
    </View>
  );
}

export type BadgeTone = 'ready' | 'pending' | 'neutral' | 'mint';

const badgeTones: Record<BadgeTone, {bg: string; color: string}> = {
  ready: {bg: 'rgba(45,212,191,0.15)', color: colors.mint},
  mint: {bg: colors.mintFill, color: colors.mint},
  pending: {bg: 'rgba(124,92,255,0.18)', color: colors.lilac},
  neutral: {bg: colors.fillStrong, color: colors.muted},
};

export function Badge({
  tone = 'neutral',
  children,
  style,
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const t = badgeTones[tone];
  return (
    <View style={[styles.badge, {backgroundColor: t.bg}, style]}>
      <Text style={[styles.badgeText, {color: t.color}]}>{children}</Text>
    </View>
  );
}

/** Static switch matching the design's 36×20 pill. */
export function Toggle({on}: {on: boolean}) {
  return (
    <View
      style={[
        styles.toggle,
        {backgroundColor: on ? colors.accent : 'rgba(255,255,255,0.14)'},
      ]}>
      <View
        style={[
          styles.toggleKnob,
          on
            ? {right: 2, backgroundColor: '#fff'}
            : {left: 2, backgroundColor: colors.muted},
        ]}
      />
    </View>
  );
}

/** Vertical audio bars; heights are percentages of the container. */
export function Waveform({
  bars,
  color = 'rgba(255,255,255,0.3)',
  gap = 2,
  style,
}: {
  bars: number[];
  color?: string;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center', gap}, style]}>
      {bars.map((h, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: 2,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
}

/** Tab-bar / list glyph — a rounded square outlined in the current colour. */
export function NavGlyph({size = 19, color}: {size?: number; color: string}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: color,
      }}
    />
  );
}

export const text = StyleSheet.create({
  h1: {
    fontFamily: fonts.semibold,
    fontSize: 21,
    letterSpacing: -0.6,
    color: colors.text,
  },
  h2: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: colors.text,
  },
  body: {fontFamily: fonts.regular, fontSize: 13, color: colors.text},
  muted: {fontFamily: fonts.regular, fontSize: 12, color: colors.muted},
  meta: {fontFamily: fonts.mono, fontSize: 11, color: colors.dim},
});

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.fillSoft,
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.dim,
  },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  badgeText: {fontFamily: fonts.mono, fontSize: 11},
  toggle: {width: 36, height: 20, borderRadius: radius.pill, justifyContent: 'center'},
  toggleKnob: {position: 'absolute', width: 16, height: 16, borderRadius: radius.pill},
});
