import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {Badge, MediaPlaceholder, type BadgeTone} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {exportHistory, type ExportStatus} from '../data';

const tone: Record<ExportStatus, BadgeTone> = {
  ready: 'ready',
  rendering: 'pending',
  expired: 'neutral',
};

export function ExportHistoryScreen() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={exportHistory}
        keyExtractor={(e, i) => `${e.title}-${i}`}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.intro}>
            Renders are kept for 90 days. Re-download or re-render at any
            resolution.
          </Text>
        }
        renderItem={({item}) => (
          <View style={styles.row}>
            <MediaPlaceholder small style={styles.thumb} />
            <View style={styles.copy}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.project}>{item.project}</Text>
              <Text style={styles.spec}>
                {item.platform} · {item.spec}
              </Text>
              <View style={styles.footer}>
                <Badge tone={tone[item.status]}>{item.status}</Badge>
                <Pressable style={styles.download}>
                  <Text style={styles.downloadLabel}>Download</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  list: {paddingHorizontal: 16, paddingBottom: 32, gap: 9},
  intro: {
    paddingBottom: 14,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.muted,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: 'rgba(255,255,255,0.025)',
    padding: 12,
  },
  thumb: {width: 34, height: 52, borderRadius: 8},
  copy: {flex: 1, minWidth: 0},
  title: {fontFamily: fonts.medium, fontSize: 13, color: colors.text},
  project: {
    marginTop: 3,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.dim,
  },
  spec: {
    marginTop: 5,
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.muted,
  },
  footer: {
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  download: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  downloadLabel: {fontFamily: fonts.regular, fontSize: 12, color: colors.text},
});
