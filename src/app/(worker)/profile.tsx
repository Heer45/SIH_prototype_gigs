import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';

const skills = ['Electrical Wiring', 'Panel Repairs', 'AC Installation', 'Home Automation', 'Safety Audits'];
const reviews = [
  { name: 'Amit M.', msg: '"Fixed quickly, very professional!"', stars: 5 },
  { name: 'Priya S.', msg: '"Polite and honest worker."', stars: 5 },
  { name: 'Ravi K.', msg: '"Excellent work, highly recommend!"', stars: 5 },
];

export default function WorkerProfileScreen() {
  const router = useRouter();

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(worker)/home');
    else if (tab === 'jobs') router.push('/(worker)/gigs');
    else if (tab === 'track') router.push('/(worker)/job');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={10} color={Colors.white} />
          </View>
        </View>

        <Text style={styles.workerName}>Rajesh Kumar</Text>
        <Text style={styles.workerSubtitle}>Certified Electrician · 8 years experience</Text>
        <Text style={styles.workerCoop}>Member: Delhi Labour Cooperative · ID: DLC-24781</Text>

        <View style={styles.pillsRow}>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingPillText}>⭐ 4.9 Rating</Text>
          </View>
          <View style={styles.jobsPill}>
            <Text style={styles.jobsPillText}>247 Jobs</Text>
          </View>
          <View style={styles.respectPill}>
            <Text style={styles.respectPillText}>🏅 94 Respect</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Stats Grid */}
        <View style={styles.statsRow}>
          {[
            { value: '₹1.2L', label: 'This Month', icon: '💰', color: Colors.primary, bg: '#E5F5EE' },
            { value: '247', label: 'Total Jobs', icon: '✅', color: Colors.cyan, bg: '#EAF3F5' },
            { value: '98%', label: 'On-time Rate', icon: '🎯', color: Colors.orange, bg: '#FEF3C7' },
          ].map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: s.bg }, Shadows.card]}>
              <Text style={{ fontSize: 20 }}>{s.icon}</Text>
              <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLbl}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Skills & Expertise */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.cardTitle}>Skills & Expertise</Text>
          <View style={styles.skillsWrap}>
            {skills.map((s) => (
              <View key={s} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Community Thanks */}
        <View style={styles.thanksCard}>
          <Text style={styles.cardTitle}>Community Thanks 🌍</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thanksRow}>
            {reviews.map((r) => (
              <View key={r.name} style={styles.reviewCard}>
                <Text style={styles.reviewName}>{r.name}</Text>
                <Text style={styles.reviewStars}>{'★'.repeat(r.stars)}</Text>
                <Text style={styles.reviewMsg}>{r.msg}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Cooperative Membership Card */}
        <View style={styles.coopCard}>
          <Text style={{ fontSize: 32 }}>🏛️</Text>
          <View style={styles.coopInfo}>
            <Text style={styles.coopTitle}>Delhi Labour Cooperative Society</Text>
            <Text style={styles.coopDesc}>
              Member since Jan 2019 · Fair wage guarantee · Digital ID verified
            </Text>
          </View>
        </View>

        {/* Switch to Citizen mode */}
        <TouchableOpacity
          style={styles.switchButton}
          activeOpacity={0.85}
          onPress={() => router.replace('/(citizen)/home')}
        >
          <Text style={styles.switchButtonText}>Switch to Citizen Mode 🏠</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation role="worker" activeTab="profile" onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.cyan,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.major,
    borderBottomLeftRadius: BorderRadius.header,
    borderBottomRightRadius: BorderRadius.header,
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: Spacing.base,
  },
  avatarBox: {
    width: 84,
    height: 84,
    borderRadius: BorderRadius.xxl,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.headingLg,
    color: Colors.primaryDarkest,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  workerName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.white,
  },
  workerSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  workerCoop: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.base,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ratingPill: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  ratingPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: 10,
    color: Colors.orange,
  },
  jobsPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  jobsPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 10,
    color: Colors.white,
  },
  respectPill: {
    backgroundColor: '#E5F5EE',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  respectPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: 10,
    color: Colors.primary,
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.card,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  statVal: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    marginVertical: 2,
  },
  statLbl: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textTertiary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  cardTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  skillTag: {
    backgroundColor: '#EAF3F5',
    borderWidth: 1,
    borderColor: Colors.blueLight,
    paddingVertical: 6,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.full,
  },
  skillTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.cyan,
  },
  thanksCard: {
    backgroundColor: Colors.communityCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 1,
    borderColor: '#E8D5B8',
  },
  thanksRow: {
    gap: Spacing.base,
  },
  reviewCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
  },
  reviewName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
  },
  reviewStars: {
    fontSize: 10,
    color: Colors.star,
    marginVertical: 2,
  },
  reviewMsg: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
    lineHeight: 14,
  },
  coopCard: {
    backgroundColor: '#EAF3F5',
    borderRadius: BorderRadius.xl,
    padding: Spacing.screen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  coopInfo: {
    flex: 1,
  },
  coopTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
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
  switchButton: {
    backgroundColor: '#E5F5EE',
    borderWidth: 2,
    borderColor: Colors.secondary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.primary,
  },
});
