import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

const slides = [
  {
    emoji: '🔧',
    color: '#E5F5EE',
    accentColor: '#2F6F57',
    iconName: 'construct' as keyof typeof Ionicons.glyphMap,
    title: 'Find Trusted\nLocal Services',
    desc: 'Book verified cooperative workers near you for plumbing, electrical, cleaning, and more.',
  },
  {
    emoji: '📸',
    color: '#F6EFE3',
    accentColor: '#D97706',
    iconName: 'camera' as keyof typeof Ionicons.glyphMap,
    title: 'Improve Your\nCommunity',
    desc: 'Report local problems with AI-powered photo analysis and help create cleaner neighbourhoods.',
  },
  {
    emoji: '🤝',
    color: '#EAF3F5',
    accentColor: '#0891B2',
    iconName: 'people' as keyof typeof Ionicons.glyphMap,
    title: 'Support Local\nWorkers',
    desc: 'Every service strengthens the cooperative community and ensures fair pay for skilled workers.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  return (
    <View style={[styles.container, { backgroundColor: slide.color }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Skip button */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Center Illustration */}
        <View style={styles.illustrationArea}>
          <View style={[styles.largeIconCircle, { backgroundColor: slide.accentColor + '20' }]}>
            <Ionicons name={slide.iconName} size={70} color={slide.accentColor} />
          </View>
        </View>

        {/* Bottom card */}
        <View style={[styles.bottomCard, Shadows.card]}>
          {/* Progress dots */}
          <View style={styles.dotsRow}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === current
                    ? [styles.activeDot, { backgroundColor: slide.accentColor }]
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: slide.accentColor }]}
            activeOpacity={0.85}
            onPress={() => {
              if (current < slides.length - 1) {
                setCurrent(current + 1);
              } else {
                router.push('/(auth)/login');
              }
            }}
          >
            <Text style={styles.nextButtonText}>
              {current < slides.length - 1 ? 'Next →' : 'Get Started →'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.screenLg,
    paddingTop: Spacing.md,
  },
  skipText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontWeight: FontWeight.semiBold,
  },
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIconCircle: {
    width: 140,
    height: 140,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.sheet,
    borderTopRightRadius: BorderRadius.sheet,
    paddingHorizontal: Spacing.screenLg,
    paddingTop: Spacing.major,
    paddingBottom: Spacing.bottom,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'center',
    marginBottom: Spacing.screenLg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: Colors.border,
  },
  activeDot: {
    width: 28,
  },
  title: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.hero,
    color: Colors.textPrimary,
    lineHeight: 34,
    marginBottom: Spacing.lg,
  },
  desc: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.major,
  },
  nextButton: {
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
