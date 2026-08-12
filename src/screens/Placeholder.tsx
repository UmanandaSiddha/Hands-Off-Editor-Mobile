import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../theme';

/** Temporary body for screens that land in a later commit. */
export function Placeholder({name}: {name: string}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg},
  text: {fontFamily: fonts.mono, fontSize: 12, color: colors.dim},
});
