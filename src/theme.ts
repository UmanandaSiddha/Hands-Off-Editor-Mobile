/**
 * Design tokens for Hands Off Editor, lifted from the same design mock the web
 * app is built from. Keep these in sync with client/src/app/globals.css.
 */

export const colors = {
  bg: '#08080A',
  panel: '#0E0E12',
  sidebar: '#0A0A0D',
  card: '#0B0B0F',

  accent: '#7C5CFF',
  accent2: '#2DD4BF',

  text: '#ECECF1',
  soft: '#B4B4BF',
  muted: '#8B8B96',
  dim: '#5A5A66',
  lilac: '#C4BAFF',
  mint: '#5EEAD4',
  assistant: '#DCD6FF',
  chrome: '#3A3A44',

  line: 'rgba(255,255,255,0.07)',
  lineStrong: 'rgba(255,255,255,0.10)',

  /** Surface fills used by cards and rows. */
  fill: 'rgba(255,255,255,0.03)',
  fillSoft: 'rgba(255,255,255,0.028)',
  fillStrong: 'rgba(255,255,255,0.07)',

  accentFill: 'rgba(124,92,255,0.11)',
  accentBorder: 'rgba(124,92,255,0.26)',
  mintFill: 'rgba(45,212,191,0.16)',
} as const;

/**
 * Font family names match the bundled TTF filenames, which is how both Android
 * and iOS resolve these faces.
 */
export const fonts = {
  regular: 'InstrumentSans-Regular',
  medium: 'InstrumentSans-Medium',
  semibold: 'InstrumentSans-SemiBold',
  bold: 'InstrumentSans-Bold',
  mono: 'JetBrainsMono-Regular',
  monoMedium: 'JetBrainsMono-Medium',
} as const;

export const radius = {
  sm: 7,
  md: 11,
  lg: 14,
  xl: 15,
  card: 16,
  pill: 999,
} as const;

/** The two hatch tones the mock uses in place of real video frames. */
export const hatch = {
  large: '#141419',
  small: '#16161C',
} as const;
