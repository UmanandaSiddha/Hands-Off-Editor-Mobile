import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandMark, MediaPlaceholder} from '../components/ui';
import {colors, fonts, radius} from '../theme';
import type {Message} from '../data';
import {initialChat, quickPrompts} from '../data';

/** The three-dot "thinking" indicator. */
function TypingDots() {
  const dots = [useRef(new Animated.Value(1)).current, useRef(new Animated.Value(1)).current, useRef(new Animated.Value(1)).current];

  useEffect(() => {
    const loops = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(dot, {
            toValue: 0.35,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.typing}>
      {dots.map((dot, i) => (
        <Animated.View key={i} style={[styles.typingDot, {opacity: dot}]} />
      ))}
    </View>
  );
}

export function AssistantScreen() {
  const [chat, setChat] = useState<Message[]>(initialChat);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (replyTimer.current) {
        clearTimeout(replyTimer.current);
      }
    },
    [],
  );

  function send(text: string) {
    const message = text.trim();
    if (!message) {
      return;
    }
    setChat(c => [...c, {who: 'you', text: message}]);
    setDraft('');
    setThinking(true);
    replyTimer.current = setTimeout(() => {
      setThinking(false);
      setChat(c => [
        ...c,
        {
          who: 'ai',
          text: 'Done — applied to clip 1. Re-scored at 9.1 and refreshed the preview. Undo is one keystroke away.',
        },
      ]);
    }, 1100);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <BrandMark size={26} round={9} />
        <View>
          <Text style={styles.headerTitle}>Assistant</Text>
          <Text style={styles.headerSub}>editing clip 1</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({animated: true})
          }>
          {chat.map((m, i) => (
            <View
              key={i}
              style={[
                styles.bubble,
                m.who === 'you' ? styles.bubbleYou : styles.bubbleAi,
              ]}>
              <Text
                style={[
                  styles.bubbleText,
                  m.who === 'ai' && styles.bubbleTextAi,
                ]}>
                {m.text}
              </Text>
            </View>
          ))}

          {/* Inline result card the design shows after an applied edit. */}
          <View style={styles.resultCard}>
            <MediaPlaceholder small style={styles.resultThumb} />
            <View style={styles.flex}>
              <Text style={styles.resultTitle}>Preview updated</Text>
              <Text style={styles.resultMeta}>Score 9.1 → 9.3</Text>
              <View style={styles.resultActions}>
                <Pressable style={styles.keep}>
                  <Text style={styles.keepLabel}>Keep</Text>
                </Pressable>
                <Pressable style={styles.undo}>
                  <Text style={styles.undoLabel}>Undo</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {thinking && <TypingDots />}
        </ScrollView>

        <View style={styles.composer}>
          <View style={styles.quickRow}>
            {quickPrompts.map(q => (
              <Pressable
                key={q}
                style={styles.quickChip}
                onPress={() => send(q)}>
                <Text style={styles.quickLabel}>{q}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.inputRow}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => send(draft)}
              placeholder="Ask for an edit…"
              placeholderTextColor={colors.dim}
              style={styles.input}
            />
            <Pressable style={styles.sendButton} onPress={() => send(draft)}>
              <Text style={styles.sendGlyph}>↑</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  flex: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  headerTitle: {fontFamily: fonts.semibold, fontSize: 14, color: colors.text},
  headerSub: {fontFamily: fonts.regular, fontSize: 11, color: colors.dim},

  messages: {padding: 16, gap: 10},
  bubble: {
    maxWidth: '86%',
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  bubbleYou: {
    alignSelf: 'flex-end',
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: colors.fillStrong,
  },
  bubbleAi: {
    alignSelf: 'flex-start',
    borderColor: colors.accentBorder,
    backgroundColor: 'rgba(124,92,255,0.12)',
  },
  bubbleText: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.text,
  },
  bubbleTextAi: {color: colors.assistant},

  resultCard: {
    alignSelf: 'flex-start',
    width: '86%',
    flexDirection: 'row',
    gap: 9,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: colors.fill,
    padding: 10,
  },
  resultThumb: {width: 34, height: 50, borderRadius: radius.sm},
  resultTitle: {fontFamily: fonts.semibold, fontSize: 11.5, color: colors.text},
  resultMeta: {
    marginTop: 3,
    fontFamily: fonts.regular,
    fontSize: 10.5,
    color: colors.muted,
  },
  resultActions: {marginTop: 7, flexDirection: 'row', gap: 6},
  keep: {
    borderRadius: 8,
    backgroundColor: colors.text,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  keepLabel: {fontFamily: fonts.semibold, fontSize: 10.5, color: colors.bg},
  undo: {
    borderRadius: 8,
    backgroundColor: colors.fillStrong,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  undoLabel: {fontFamily: fonts.regular, fontSize: 10.5, color: colors.muted},

  typing: {flexDirection: 'row', gap: 5, paddingHorizontal: 2, paddingVertical: 4},
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.dim,
  },

  composer: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 22,
  },
  quickRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingBottom: 10},
  quickChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quickLabel: {fontFamily: fonts.regular, fontSize: 11.5, color: colors.soft},
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingLeft: 13,
    paddingRight: 8,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.text,
  },
  sendButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendGlyph: {fontFamily: fonts.bold, fontSize: 12, color: '#fff'},
});
