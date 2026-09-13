import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import Header from '@/components/Header';

const factors = [
  { label: 'Distance', weight: 30, icon: '📍', desc: '1.2 km away — closest match', color: '#2F6F57' },
  { label: 'Skill Match', weight: 25, icon: '🎯', desc: 'Certified Electrician — exact skill', color: '#0891B2' },
  { label: 'Availability', weight: 20, icon: '🕐', desc: 'Available right now', color: '#D97706' },
  { label: 'Workload Balance', weight: 15, icon: '⚖️', desc: 'Not overloaded, fair distribution', color: '#7C3AED' },
  { label: 'Reliability', weight: 10, icon: '✅', desc: '4.9 rating, 247 jobs completed', color: '#EF4444' },
];

export default function AIMatchScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header
        title="Why This Worker?"
        subtitle="Explainable AI Match Score"
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Main Score Hero Card */}
        <View style={[styles.scoreHeroCard, Shadows.card]}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentText}>92%</Text>
            <Text style={styles.scoreSubText}>Match</Text>
          </View>

          <View style={styles.workerHeroInfo}>
            <Text style={styles.workerHeroName}>Rajesh Kumar</Text>
            <Text style={styles.workerHeroSkill}>Certified Electrician</Text>
            <View style={styles.heroBadgesRow}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>⭐ 4.9 Rating</Text>
              </View>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>📍 1.2 km</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Factors Breakdown */}
        <View style={[styles.breakdownCard, Shadows.card]}>
          <Text style={styles.breakdownTitle}>Score Breakdown</Text>
          <View style={styles.factorsList}>
            {factors.map((f) => (
              <View key={f.label} style={styles.factorItem}>
                <View style={styles.factorHeader}>
                  <View style={styles.factorLeft}>
                    <Text style={{ fontSize: 16 }}>{f.icon}</Text>
                    <View>
                      <Text style={styles.factorName}>{f.label}</Text>
                      <Text style={styles.factorDesc}>{f.desc}</Text>
                    </View>
                  </View>
                  <Text style={[styles.factorWeight, { color: f.color }]}>{f.weight}%</Text>
                </View>

                {/* Progress bar */}
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${f.weight * 3.3}%`, backgroundColor: f.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Cooperative info */}
        <View style={styles.coopCard}>
          <Text style={{ fontSize: 24 }}>🏛️</Text>
          <View style={styles.coopInfo}>
            <Text style={styles.coopTitle}>Delhi Labour Cooperative Society</Text>
            <Text style={styles.coopDesc}>
              Member since 2019 · Background verified · Digital ID: DLC-24781
            </Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.bookButton, Shadows.button]}
          activeOpacity={0.85}
          onPress={() => router.push('/(citizen)/payment')}
        >
          <Text style={styles.bookButtonText}>Book Rajesh Kumar →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1FA',
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.screen,
  },
  scoreHeroCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.sheet,
    padding: Spacing.screenLg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.screen,
  },
  scoreCircle: {
    width: 84,
    height: 84,
    borderRadius: BorderRadius.full,
    borderWidth: 6,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scorePercentText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.white,
    lineHeight: 28,
  },
  scoreSubText: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
  },
  workerHeroInfo: {
    flex: 1,
  },
  workerHeroName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xxl,
    color: Colors.white,
  },
  workerHeroSkill: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.base,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  heroBadgeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 10,
    color: Colors.white,
  },
  breakdownCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  breakdownTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  factorsList: {
    gap: Spacing.base + 2,
  },
  factorItem: {
    gap: Spacing.xs,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  factorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  factorName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  factorDesc: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  factorWeight: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs + 1,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  coopCard: {
    backgroundColor: Colors.communityCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    gap: Spacing.base,
    borderWidth: 1,
    borderColor: '#E8D5B8',
  },
  coopInfo: {
    flex: 1,
  },
  coopTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  coopDesc: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
