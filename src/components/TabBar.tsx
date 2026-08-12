import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Gradient, NavGlyph} from './ui';
import {colors, fonts, radius} from '../theme';

/**
 * Five slots with a raised centre action, matching the design. The centre "+"
 * is not a route — it jumps to Home, where upload lives.
 */
export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const routes = state.routes;
  const half = Math.ceil(routes.length / 2);

  const slot = (index: number) => {
    const route = routes[index];
    if (!route) {
      return null;
    }
    const focused = state.index === index;
    const {options} = descriptors[route.key];
    const label = (options.title ?? route.name) as string;
    const tint = focused ? colors.text : colors.dim;

    return (
      <Pressable
        key={route.key}
        style={styles.slot}
        accessibilityRole="button"
        accessibilityState={focused ? {selected: true} : {}}
        onPress={() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }}>
        <NavGlyph color={tint} />
        <Text style={[styles.label, {color: tint}]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.bar, {paddingBottom: 20 + insets.bottom}]}>
      {routes.slice(0, half).map((_, i) => slot(i))}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="New project"
        onPress={() => navigation.navigate(routes[0].name)}>
        <Gradient style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </Gradient>
      </Pressable>

      {routes.slice(half).map((_, i) => slot(half + i))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: 'rgba(10,10,13,0.95)',
  },
  slot: {alignItems: 'center', gap: 5},
  label: {fontFamily: fonts.regular, fontSize: 9.5},
  fab: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    marginTop: -14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.45,
    shadowRadius: 22,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 26,
    fontFamily: fonts.regular,
  },
});
