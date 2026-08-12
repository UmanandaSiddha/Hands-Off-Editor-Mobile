import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MediaPlaceholder} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import {HIGH_SCORE, projectRows} from '../data';
import type {RootStackParamList} from '../navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const filters = ['All', 'Ready', 'Processing', 'Shared', 'Archived'];

export function ProjectsScreen() {
  const navigation = useNavigation<Nav>();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const rows = projectRows.filter(r =>
    r.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={rows}
        keyExtractor={r => r.title}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.summary}>
              18 sources · 142 clips · 3 shared with your team
            </Text>

            <View style={styles.search}>
              <View style={styles.searchGlyph} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search projects…"
                placeholderTextColor={colors.dim}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.filters}>
              {filters.map(f => {
                const on = f === filter;
                return (
                  <Pressable
                    key={f}
                    onPress={() => setFilter(f)}
                    style={[styles.filter, on && styles.filterOn]}>
                    <Text style={[styles.filterLabel, on && styles.filterLabelOn]}>
                      {f}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No projects match “{query}”.</Text>
        }
        renderItem={({item}) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate('Tabs')}>
            <MediaPlaceholder small style={styles.thumb} />
            <View style={styles.rowCopy}>
              <Text numberOfLines={1} style={styles.rowTitle}>
                {item.title}
              </Text>
              <Text style={styles.rowSource}>{item.src}</Text>
              <View style={styles.rowMeta}>
                <Text style={styles.metaText}>{item.dur}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{item.clips} clips</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text
                  style={[
                    styles.metaText,
                    parseFloat(item.score) >= HIGH_SCORE && styles.metaHigh,
                  ]}>
                  {item.score}
                </Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  list: {paddingHorizontal: 16, paddingBottom: 32, gap: 8},
  summary: {fontFamily: fonts.regular, fontSize: 13, color: colors.muted},
  search: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(0,0,0,0.32)',
    paddingHorizontal: 13,
  },
  searchGlyph: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.dim,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text,
  },
  filters: {marginTop: 14, marginBottom: 6, flexDirection: 'row', gap: 6},
  filter: {borderRadius: radius.pill, paddingHorizontal: 13, paddingVertical: 6},
  filterOn: {backgroundColor: 'rgba(255,255,255,0.09)'},
  filterLabel: {fontFamily: fonts.regular, fontSize: 12.5, color: colors.muted},
  filterLabelOn: {color: colors.text},

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: colors.fill,
    padding: 10,
  },
  thumb: {width: 44, height: 30, borderRadius: radius.sm},
  rowCopy: {flex: 1, minWidth: 0},
  rowTitle: {fontFamily: fonts.medium, fontSize: 13, color: colors.text},
  rowSource: {fontFamily: fonts.regular, fontSize: 11, color: colors.dim},
  rowMeta: {marginTop: 4, flexDirection: 'row', alignItems: 'center', gap: 5},
  metaText: {fontFamily: fonts.mono, fontSize: 10.5, color: colors.muted},
  metaDot: {fontFamily: fonts.regular, fontSize: 10.5, color: colors.dim},
  metaHigh: {color: colors.mint},
  chevron: {fontFamily: fonts.regular, fontSize: 16, color: colors.dim},
  empty: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.dim,
  },
});
