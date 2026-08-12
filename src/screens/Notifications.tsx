import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, radius} from '../theme';
import {notifications} from '../data';

export function NotificationsScreen() {
  const [read, setRead] = useState<string[]>([]);
  const allRead = read.length >= notifications.filter(n => n.unread).length;

  return (
    <View style={styles.screen}>
      <FlatList
        data={notifications}
        keyExtractor={n => n.title}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Pressable
            style={styles.markAll}
            onPress={() => setRead(notifications.map(n => n.title))}>
            <Text style={styles.markAllLabel}>
              {allRead ? 'All caught up' : 'Mark all read'}
            </Text>
          </Pressable>
        }
        renderItem={({item}) => {
          const unread = item.unread && !read.includes(item.title);
          return (
            <Pressable
              style={[styles.row, unread && styles.rowUnread]}
              onPress={() => setRead(r => [...r, item.title])}>
              <View style={[styles.dot, unread && styles.dotUnread]} />
              <View style={styles.copy}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
              <Text style={styles.when}>{item.when}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  list: {paddingHorizontal: 16, paddingBottom: 32, gap: 8},
  markAll: {alignSelf: 'flex-end', paddingBottom: 12},
  markAllLabel: {fontFamily: fonts.regular, fontSize: 13, color: colors.muted},
  row: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.022)',
    padding: 14,
  },
  rowUnread: {
    borderColor: 'rgba(124,92,255,0.22)',
    backgroundColor: 'rgba(124,92,255,0.07)',
  },
  dot: {
    marginTop: 6,
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  dotUnread: {backgroundColor: colors.accent},
  copy: {flex: 1, minWidth: 0},
  title: {fontFamily: fonts.medium, fontSize: 13.5, color: colors.text},
  body: {
    marginTop: 4,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.muted,
  },
  when: {fontFamily: fonts.mono, fontSize: 11, color: colors.dim},
});
