import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';

const badges = [
  { icon: '📸', label: 'First Report', desc: 'Filed your first community report', earned: true, color: '#FEF3C7', borderColor: '#D97706' },
  { icon: '🌍', label: 'Community Helper', desc: 'Helped resolve 10+ issues', earned: true, color: '#E5F5EE', borderColor: '#2F6F57' },
  { icon: '🏆', label: 'Clean Street Champion', desc: 'Area had 0 pending issues for 7 days', earned: true, color: '#EDE9FE', borderColor: '#7C3AED' },
  { icon: '⚡', label: 'Quick Reporter', desc: 'Reported within 1 hr of issue', earned: false, color: '#F4F7F2', borderColor: '#E5EAE1' },
  { icon: '🤝', label: 'Cooperative Partner', desc: 'Booked 20+ cooperative workers', earned: false, color: '#F4F7F2', borderColor: '#E5EAE1' },
  { icon: '💎', label: 'Diamond Citizen', desc: 'Score above 1000', earned: false, color: '#F4F7F2', borderColor: '#E5EAE1' },
];

const history = [
  { action: 'Verified garbage cleanup', points: '+25', date: 'Today', color: '#2F6F57' },
  { action: 'Filed community report', points: '+15', date: 'Yesterday', color: '#2F6F57' },
  { action: 'Booked cooperative worker', points: '+10', date: '2 days ago', color: '#2F6F57' },
  { action: 'Received 5-star review', points: '+5', date: '3 days ago', color: '#2F6F57' },
];

export default function CivicScoreScreen() {
  const router = useRouter();
  const score = 450;
  const nextLevel = 600;
  const progress = (score / nextLevel) * 100;

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(citizen)/home');
    else if (tab === 'services') router.push('/(citizen)/services');
    else if (tab === 'community') router.push('/(citizen)/community');
    else if (tab === 'activity') router.push('/(citizen)/tracking');
    else if (tab === 'profile') router.push('/(citizen)/profile');
  };

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
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Civic Score</Text>
        </View>

        {/* Score Display Box */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreBigBox}>
            <Text style={styles.bigScoreNumber}>{score}</Text>
            <Text style={styles.scorePointsLabel}>Civic Points</Text>
          </View>

          <View style={styles.scoreProgressCol}>
            <View style={styles.rankBadgesRow}>
              <View style={styles.goldBadge}>
                <Text style={styles.goldBadgeText}>🥇 Gold Member</Text>
              </View>
              <View style={styles.rankBadge}>
                <Text style={styles.rankBadgeText}>Rank #24 in your area</Text>
              </View>
            </View>

            <Text style={styles.ptsToNextText}>{nextLevel - score} pts to Platinum</Text>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Badges Earned */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges Earned</Text>
          <View style={styles.badgesGrid}>
            {badges.map((b) => (
              <View
                key={b.label}
                style={[
                  styles.badgeCard,
                  { backgroundColor: b.color, borderColor: b.borderColor },
                  !b.earned && { opacity: 0.5 },
                ]}
              >
                <Text style={{ fontSize: 26 }}>{b.icon}</Text>
                <Text style={styles.badgeName} numberOfLines={2}>
                  {b.label}
                </Text>
                {!b.earned && <Text style={styles.lockedText}>🔒 Locked</Text>}
              </View>
            ))}
          </View>
        </View>

        {/* Recent Points History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Points</Text>
          <View style={[styles.historyCard, Shadows.card]}>
            {history.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.historyRow,
                  i < history.length - 1 ? styles.historyRowBorder : null,
                ]}
              >
                <View style={styles.historyIconBox}>
                  <Text style={{ fontSize: 16 }}>⭐</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyAction}>{h.action}</Text>
                  <Text style={styles.historyDate}>{h.date}</Text>
                </View>
                <Text style={styles.historyPoints}>{h.points}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Community Impact Summary */}
        <View style={[styles.impactCard, Shadows.card]}>
          <Text style={styles.impactTitle}>Your Community Impact 🌍</Text>
          <View style={styles.impactGrid}>
            {[
              { value: '12', label: 'Issues Reported', icon: '📋' },
              { value: '9', label: 'Issues Resolved', icon: '✅' },
              { value: '₹225', label: 'Fund Contributed', icon: '💚' },
              { value: '3', label: 'Workers Supported', icon: '👷' },
            ].map((s) => (
              <View key={s.label} style={styles.impactItem}>
                <Text style={{ fontSize: 20 }}>{s.icon}</Text>
                <View>
                  <Text style={styles.impactValue}>{s.value}</Text>
                  <Text style={styles.impactLabel}>{s.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="profile" onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.orange,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.screenLg,
    borderBottomLeftRadius: BorderRadius.sheet,
    borderBottomRightRadius: BorderRadius.sheet,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.white,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.screen,
    marginTop: Spacing.base,
  },
  scoreBigBox: {
    alignItems: 'center',
  },
  bigScoreNumber: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: 52,
    color: Colors.white,
    lineHeight: 56,
  },
  scorePointsLabel: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  scoreProgressCol: {
    flex: 1,
  },
  rankBadgesRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  goldBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  goldBadgeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: 11,
    color: Colors.white,
  },
  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  rankBadgeText: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
  },
  ptsToNextText: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.screenLg,
  },
  section: {
    gap: Spacing.base,
  },
  sectionTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  badgeCard: {
    width: '30%',
    flexGrow: 1,
    paddingVertical: Spacing.base,
    paddingHorizontal: 4,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    alignItems: 'center',
    gap: 4,
  },
  badgeName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  lockedText: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textTertiary,
  },
  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    overflow: 'hidden',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base + 2,
    gap: Spacing.base,
  },
  historyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E5F5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyAction: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  historyDate: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  historyPoints: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.primary,
  },
  impactCard: {
    backgroundColor: Colors.communityCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 1,
    borderColor: '#E8D5B8',
  },
  impactTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  impactItem: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  impactValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  impactLabel: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textTertiary,
  },
});
