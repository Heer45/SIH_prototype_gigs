import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import { mockWorkers } from '@/data/workers';

const filters = ['Best Match', 'Nearest', 'Top Rated', 'Price'];

export default function WorkerMatchScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Best Match');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.title}>Available Workers</Text>
            <Text style={styles.subtitle}>3 workers found · Electrical Repair</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((f) => {
            const isSelected = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                activeOpacity={0.8}
                onPress={() => setActiveFilter(f)}
              >
                <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {mockWorkers.map((w, idx) => (
          <View
            key={w.id}
            style={[
              styles.workerCard,
              idx === 0 ? styles.bestMatchCard : null,
              Shadows.card,
            ]}
          >
            {idx === 0 && (
              <View style={styles.aiBestMatchBadge}>
                <Text style={styles.aiBestMatchText}>🤖 AI Best Match</Text>
              </View>
            )}

            <View style={styles.cardHeader}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: w.imageUrl }} style={styles.avatar} />
                <View style={styles.verifiedCheck}>
                  <Ionicons name="checkmark" size={10} color={Colors.white} />
                </View>
              </View>

              <View style={styles.workerInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.workerName}>{w.name}</Text>
                  {w.badge ? (
                    <View style={[styles.badgePill, { backgroundColor: w.badgeBg }]}>
                      <Text style={[styles.badgeText, { color: w.badgeColor }]}>{w.badge}</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={styles.workerSkill}>
                  {w.skill} · {w.experience} exp
                </Text>

                <View style={styles.statsRow}>
                  <View style={styles.ratingBox}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.ratingVal}>{w.rating.toFixed(1)}</Text>
                    <Text style={styles.reviewsCount}>({w.reviews})</Text>
                  </View>
                  <View style={styles.distanceBox}>
                    <Text style={{ fontSize: 12 }}>📍</Text>
                    <Text style={styles.distanceText}>{w.distance}</Text>
                  </View>
                </View>
              </View>

              {/* AI Score Box */}
              <TouchableOpacity
                style={styles.scoreBox}
                activeOpacity={0.85}
                onPress={() => router.push('/(citizen)/ai-match')}
              >
                <Text style={styles.scoreNumber}>{w.score}%</Text>
                <Text style={styles.scoreLabel}>Match</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.footerLeft}>
                <View
                  style={[
                    styles.availBadge,
                    {
                      backgroundColor: w.availability.includes('now') ? '#E5F5EE' : '#FEF3C7',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.availText,
                      { color: w.availability.includes('now') ? '#2F6F57' : '#D97706' },
                    ]}
                  >
                    {w.availability.includes('now') ? '🟢' : '🕐'} {w.availability}
                  </Text>
                </View>
                <View style={styles.jobsBadge}>
                  <Text style={styles.jobsText}>{w.jobs} jobs</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.bookButton}
                activeOpacity={0.85}
                onPress={() => router.push('/(citizen)/payment')}
              >
                <Text style={styles.bookButtonText}>Book Worker</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Explainable AI link */}
        <TouchableOpacity
          style={styles.aiExplainerCard}
          activeOpacity={0.85}
          onPress={() => router.push('/(citizen)/ai-match')}
        >
          <Text style={{ fontSize: 24 }}>🤖</Text>
          <View style={styles.aiExplainerTextContainer}>
            <Text style={styles.aiExplainerTitle}>How does AI matching work?</Text>
            <Text style={styles.aiExplainerSubtitle}>See the explainable AI score breakdown</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.blue} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    marginBottom: Spacing.base,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  filterRow: {
    gap: Spacing.md,
    paddingVertical: 2,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  workerCard: {
    backgroundColor: Colors.workerCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  bestMatchCard: {
    borderColor: Colors.secondary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.15,
  },
  aiBestMatchBadge: {
    position: 'absolute',
    top: -10,
    left: 16,
    backgroundColor: Colors.primary,
    paddingVertical: 3,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xs,
  },
  aiBestMatchText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs - 1,
    color: Colors.white,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.base,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.border,
  },
  verifiedCheck: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  workerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  workerName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  badgePill: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
  },
  workerSkill: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginTop: Spacing.sm,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    fontSize: 12,
  },
  ratingVal: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
  },
  reviewsCount: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
  },
  distanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  distanceText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  scoreBox: {
    width: 52,
    height: 52,
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  scoreLabel: {
    fontFamily: FontFamily.body,
    fontSize: 8,
    color: 'rgba(255,255,255,0.7)',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.base,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  footerLeft: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  availBadge: {
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  availText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 10,
  },
  jobsBadge: {
    backgroundColor: Colors.background,
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  jobsText: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.screen,
    borderRadius: BorderRadius.sm,
  },
  bookButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
  aiExplainerCard: {
    backgroundColor: Colors.aiCard,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.blueLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  aiExplainerTextContainer: {
    flex: 1,
  },
  aiExplainerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.blue,
  },
  aiExplainerSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
