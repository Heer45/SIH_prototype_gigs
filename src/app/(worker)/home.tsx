import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';

export default function WorkerHomeScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);

  const handleTabPress = (tab: string) => {
    if (tab === 'jobs') router.push('/(worker)/gigs');
    else if (tab === 'track') router.push('/(worker)/job');
    else if (tab === 'profile') router.push('/(worker)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isOnline ? Colors.cyan : '#6B7280',
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View style={styles.workerProfileRow}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>RK</Text>
            </View>
            <View>
              <Text style={styles.workerName}>Rajesh Kumar</Text>
              <Text style={styles.workerSkill}>Certified Electrician · ⭐ 4.9</Text>
            </View>
          </View>

          {/* Online Toggle */}
          <View style={styles.toggleContainer}>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#22C55E' }}
              thumbColor={Colors.white}
            />
            <Text style={styles.toggleLabel}>
              {isOnline ? '🟢 Online' : '⚫ Offline'}
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: "Today's Earnings", value: '₹847', icon: '💰' },
            { label: 'Jobs Done', value: '5', icon: '✅' },
            { label: 'Respect Score', value: '94', icon: '🏅' },
          ].map((s) => (
            <View key={s.label} style={styles.statBox}>
              <Text style={{ fontSize: 16 }}>{s.icon}</Text>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLbl}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* New Job Alert */}
        {isOnline ? (
          <TouchableOpacity
            style={[styles.jobAlertCard, Shadows.card]}
            activeOpacity={0.9}
            onPress={() => router.push('/(worker)/job')}
          >
            <View style={styles.jobAlertHeader}>
              <View style={styles.alertPill}>
                <Text style={styles.alertPillText}>🔔 New Job Alert!</Text>
              </View>
              <Text style={styles.alertTime}>Just now</Text>
            </View>

            <Text style={styles.jobTitle}>Electrical Repair</Text>
            <Text style={styles.jobLocation}>📍 Nehru Nagar, Sector 12 · 1.2 km away</Text>

            <View style={styles.jobAlertFooter}>
              <Text style={styles.jobReward}>₹475</Text>
              <View style={styles.jobActionsRow}>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push('/(worker)/job');
                  }}
                >
                  <Text style={styles.acceptText}>Accept →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.offlineBox}>
            <Text style={{ fontSize: 36 }}>😴</Text>
            <Text style={styles.offlineTitle}>You're Offline</Text>
            <Text style={styles.offlineSubtitle}>Go online to receive job requests</Text>
          </View>
        )}

        {/* Today's Summary */}
        <View style={[styles.summaryCard, Shadows.card]}>
          <Text style={styles.summaryCardTitle}>Today's Summary</Text>
          <View style={styles.summaryProgressList}>
            {[
              { label: 'Jobs Completed', value: '5 / 6', progress: 83, color: Colors.primary },
              { label: 'Customer Rating', value: '4.9 ⭐', progress: 98, color: Colors.orange },
              { label: 'On-time Arrival', value: '100%', progress: 100, color: Colors.cyan },
            ].map((m) => (
              <View key={m.label} style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressItemLabel}>{m.label}</Text>
                  <Text style={[styles.progressItemVal, { color: m.color }]}>{m.value}</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${m.progress}%`, backgroundColor: m.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Browse All Jobs Button */}
        <TouchableOpacity
          style={[styles.browseButton, Shadows.button]}
          activeOpacity={0.85}
          onPress={() => router.push('/(worker)/gigs')}
        >
          <Text style={styles.browseButtonText}>Browse All Jobs →</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation role="worker" activeTab="home" onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.screenLg,
    borderBottomLeftRadius: BorderRadius.sheet,
    borderBottomRightRadius: BorderRadius.sheet,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.screen,
  },
  workerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.primaryDarkest,
  },
  workerName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  workerSkill: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  toggleContainer: {
    alignItems: 'center',
    gap: 2,
  },
  toggleLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
    color: Colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  statVal: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
    marginVertical: 2,
  },
  statLbl: {
    fontFamily: FontFamily.body,
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.screenLg,
  },
  jobAlertCard: {
    backgroundColor: '#EAF3F5',
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 2,
    borderColor: Colors.cyan,
  },
  jobAlertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  alertPill: {
    backgroundColor: Colors.error,
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  alertPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
  alertTime: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  jobTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xxl,
    color: Colors.textPrimary,
  },
  jobLocation: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  jobAlertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.screen,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  jobReward: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.primary,
  },
  jobActionsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  rejectBtn: {
    backgroundColor: '#FCEAEA',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.screen,
    borderRadius: BorderRadius.sm,
  },
  rejectText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.error,
  },
  acceptBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.screen,
    borderRadius: BorderRadius.sm,
  },
  acceptText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
  offlineBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.major,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  offlineTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    marginTop: Spacing.base,
  },
  offlineSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  summaryCardTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  summaryProgressList: {
    gap: Spacing.base,
  },
  progressItem: {
    gap: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItemLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  progressItemVal: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  browseButton: {
    backgroundColor: Colors.cyan,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
