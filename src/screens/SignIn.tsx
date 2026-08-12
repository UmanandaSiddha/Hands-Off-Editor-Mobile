import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandMark, Gradient} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SignInScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <BrandMark size={34} round={11} />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to keep forging. Your projects are where you left them.
          </Text>

          <View style={styles.oauthGroup}>
            <Pressable style={styles.oauthButton}>
              <Gradient
                from="#ECECF1"
                to="#8B8B96"
                style={styles.oauthDotRound}
              />
              <Text style={styles.oauthLabel}>Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.oauthButton}>
              <View style={styles.oauthDotSquare} />
              <Text style={styles.oauthLabel}>Continue with Apple</Text>
            </Pressable>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <Text style={styles.label}>Work email</Text>
          <TextInput
            placeholder="you@studio.com"
            placeholderTextColor={colors.dim}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={[styles.label, styles.labelSpaced]}>Password</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={colors.dim}
            secureTextEntry
            style={styles.input}
          />

          <Pressable
            style={styles.primary}
            onPress={() => navigation.navigate('Onboarding')}>
            <Text style={styles.primaryLabel}>Sign in</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Onboarding')}>
            <Text style={styles.footer}>
              New here? <Text style={styles.link}>Create an account</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  flex: {flex: 1},
  scroll: {padding: 24, paddingTop: 40, paddingBottom: 40},
  title: {
    marginTop: 26,
    fontFamily: fonts.semibold,
    fontSize: 30,
    letterSpacing: -0.9,
    color: colors.text,
  },
  subtitle: {
    marginTop: 9,
    fontFamily: fonts.regular,
    fontSize: 14.5,
    lineHeight: 21,
    color: colors.muted,
  },
  oauthGroup: {marginTop: 28, gap: 9},
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 13,
  },
  oauthDotRound: {width: 15, height: 15, borderRadius: radius.pill},
  oauthDotSquare: {
    width: 15,
    height: 15,
    borderRadius: 4,
    backgroundColor: colors.text,
  },
  oauthLabel: {fontFamily: fonts.medium, fontSize: 14, color: colors.text},
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 22,
  },
  divider: {flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)'},
  dividerText: {fontFamily: fonts.regular, fontSize: 12, color: colors.dim},
  label: {fontFamily: fonts.regular, fontSize: 12.5, color: colors.muted},
  labelSpaced: {marginTop: 14},
  input: {
    marginTop: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
  primary: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: colors.text,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryLabel: {fontFamily: fonts.semibold, fontSize: 14, color: colors.bg},
  footer: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.dim,
  },
  link: {color: '#A99BFF'},
});
