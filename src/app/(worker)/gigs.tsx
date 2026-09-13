import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';

const gigs = [
  {
    id: '1',
    title: 'Garbage Cleanup',
    location: 'Sector 12 Market',
    distance: '1.5 km',
    reward: 200,
    urgency: 'HIGH',
    urgencyColor: '#EF4444',
    urgencyBg: '#FCEAEA',
    category: 'Community',
    categoryColor: '#D97706',
    categoryBg: '#FEF3C7',
    time: 'ASAP',
    icon: '🧹',
  },
  {
    id: '2',
    title: 'Plumbing Fix',
    location: 'Civil Lines, Block A',
    distance: '2.1 km',
    reward: 350,
    urgency: 'NORMAL',
    urgencyColor: '#2F6F57',
    urgencyBg: '#E5F5EE',
    category: 'Plumbing',
    categoryColor: '#0891B2',
    categoryBg: '#EAF3F5',
    time: '3:00 PM',
    icon: '🔧',
  },
  {
    id: '3',
    title: 'Home Deep Cleaning',
    location: 'Nehru Nagar, Flat 4B',
    distance: '0.8 km',
    reward: 550,
    urgency: 'NORMAL',
    urgencyColor: '#2F6F57',
    urgencyBg: '#E5F5EE',
    category: 'Cleaning',
    categoryColor: '#7C3AED',
    categoryBg: '#EDE9FE',
    time: 'Tomorrow, 10 AM',
    icon: '✨',
  },
  {
    id: '4',
    title: 'Electrical Fault',
    location: 'RK Puram, House 12',
    distance: '3.2 km',
    reward: 475,
    urgency: 'URGENT',
    urgencyColor: '#D97706',
    urgencyBg: '#FEF3C7',
    category: 'Electrical',
    categoryColor: '#D97706',
    categoryBg: '#FEF3C7',
    time: 'Today, 5 PM',
    icon: '⚡',
  },
];

export default function WorkerGigsScreen() {
  const router = useRouter();

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(worker)/home');
    else if (tab === 'track') router.push('/(worker)/job');
    else if (tab === 'profile') router.push('/(worker)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Available Jobs</Text>
          <View style={styles.nearPill}>
            <Text style={styles.nearPillText}>🟢 4 near you</Text>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {['All Jobs', 'My Skills', 'Nearby', 'High Pay'].map((f, i) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, i === 0 && styles.filterChipActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {gigs.map((g, idx) => (
          <View
            key={g.id}
            style={[
              styles.gigCard,
              idx === 0 ? styles.urgentGigCard : null,
              Shadows.card,
            ]}
          >
            <View style={styles.gigHeader}>
              <View style={styles.gigLeft}>
                <View style={styles.gigIconBox}>
                  <Text style={{ fontSize: 24 }}>{g.icon}</Text>
                </View>
                <View>
                  <Text style={styles.gigTitle}>{g.title}</Text>
                  <Text style={styles.gigLocation}>
                    📍 {g.location} · {g.distance}
                  </Text>
                </View>
              </View>

              <View style={styles.gigRewardBox}>
                <Text style={styles.gigReward}>₹{g.reward}</Text>
                <Text style={styles.gigRewardSub}>reward</Text>
              </View>
            </View>

            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: g.urgencyBg }]}>
                <Text style={[styles.tagText, { color: g.urgencyColor }]}>{g.urgency}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: g.categoryBg }]}>
                <Text style={[styles.tagText, { color: g.categoryColor }]}>{g.category}</Text>
              </View>
              <View style={styles.timeTag}>
                <Text style={styles.timeTagText}>🕐 {g.time}</Text>
              </View>
            </View>

            <View style={styles.gigActionsRow}>
              <TouchableOpacity style={styles.rejectButton} activeOpacity={0.8}>
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                activeOpacity={0.85}
                onPress={() => router.push('/(worker)/job')}
              >
                <Text style={styles.acceptButtonText}>Accept Job →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNavigation role="worker" activeTab="jobs" onTabPress={handleTabPress} />
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
    paddingBottom: Spacing.screen,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.textPrimary,
  },
  nearPill: {
    backgroundColor: '#E5F5EE',
    paddingVertical: 4,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xs,
  },
  nearPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  filterRow: {
    gap: Spacing.md,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
  },
  filterChipActive: {
    backgroundColor: Colors.cyan,
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
  gigCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  urgentGigCard: {
    borderColor: Colors.error,
  },
  gigHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.base,
  },
  gigLeft: {
    flexDirection: 'row',
    gap: Spacing.base,
    flex: 1,
  },
  gigIconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gigTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  gigLocation: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  gigRewardBox: {
    alignItems: 'flex-end',
  },
  gigReward: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xxl,
    color: Colors.primary,
  },
  gigRewardSub: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textTertiary,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.base,
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  tagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
  },
  timeTag: {
    backgroundColor: Colors.background,
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  timeTagText: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  gigActionsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: Spacing.base,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  acceptButton: {
    flex: 2,
    paddingVertical: Spacing.base,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
});
