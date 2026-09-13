import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Background decorative circles */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <View style={styles.circleMidLeft} />

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBox}>
            <Ionicons name="location" size={36} color={Colors.secondary} />
          </View>
          <Text style={styles.title}>NagrikSetu</Text>
          <Text style={styles.subtitle}>Connecting Communities. Empowering Workers.</Text>
        </View>

        {/* Illustration graphic */}
        <View style={styles.illustrationContainer}>
          <View style={styles.cardIllustration}>
            <View style={styles.illustrationRow}>
              <View style={styles.personBubble}>
                <Ionicons name="person" size={28} color={Colors.primary} />
                <Text style={styles.bubbleText}>Citizen</Text>
              </View>
              <View style={styles.connectLine} />
              <View style={styles.personBubble}>
                <Ionicons name="construct" size={28} color={Colors.cyan} />
                <Text style={styles.bubbleText}>Worker</Text>
              </View>
            </View>
            <Text style={styles.illustrationCaption}>🏛️ Verified Labour Cooperatives</Text>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.footer}>
          <View style={styles.emojiRow}>
            {['🏠', '🔧', '🌿', '✨'].map((e, i) => (
              <View key={i} style={styles.emojiBox}>
                <Text style={{ fontSize: 18 }}>{e}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, Shadows.button]}
            activeOpacity={0.85}
            onPress={() => router.push('/(auth)/onboarding')}
          >
            <Text style={styles.buttonText}>Get Started →</Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>Powered by Cooperative Societies</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDarkest,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.screenLg,
    justifyContent: 'space-between',
    paddingVertical: Spacing.screenLg,
  },
  circleTopRight: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 40,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  circleMidLeft: {
    position: 'absolute',
    top: 140,
    left: 20,
    width: 90,
    height: 90,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(139,191,159,0.12)',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.major,
  },
  iconBox: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.splash,
    color: Colors.white,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIllustration: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BorderRadius.sheet,
    padding: Spacing.screenXl,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  illustrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Spacing.base,
  },
  personBubble: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  bubbleText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.xs,
  },
  connectLine: {
    height: 2,
    flex: 1,
    backgroundColor: Colors.secondary,
    marginHorizontal: Spacing.base,
    borderStyle: 'dashed',
  },
  illustrationCaption: {
    color: Colors.secondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  emojiRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  emojiBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.primary,
  },
  footerNote: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.45)',
    fontFamily: FontFamily.body,
  },
});
