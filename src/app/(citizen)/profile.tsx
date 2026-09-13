import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';

export default function ProfileScreen() {
  const router = useRouter();

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(citizen)/home');
    else if (tab === 'services') router.push('/(citizen)/services');
    else if (tab === 'community') router.push('/(citizen)/community');
    else if (tab === 'activity') router.push('/(citizen)/tracking');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>AM</Text>
        </View>
        <Text style={styles.userName}>Amit Mehta</Text>
        <Text style={styles.userPhone}>+91 98765 43210 · Nehru Nagar</Text>

        <View style={styles.badgesRow}>
          <View style={styles.scorePill}>
            <Text style={styles.scorePillText}>🏆 450 Civic Score</Text>
          </View>
          <View style={styles.goldPill}>
            <Text style={styles.goldPillText}>🥇 Gold Member</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          {[
            { value: '7', label: 'Bookings', icon: '🔧' },
            { value: '12', label: 'Reports', icon: '📋' },
            { value: '3', label: 'Badges', icon: '🏅' },
          ].map((s) => (
            <View key={s.label} style={[styles.statBox, Shadows.card]}>
              <Text style={{ fontSize: 20 }}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Civic Score Link */}
        <TouchableOpacity
          style={styles.civicScoreCard}
          activeOpacity={0.85}
          onPress={() => router.push('/(citizen)/civic-score')}
        >
          <Text style={{ fontSize: 28 }}>🏆</Text>
          <View style={styles.civicScoreInfo}>
            <Text style={styles.civicScoreTitle}>View Civic Score</Text>
            <Text style={styles.civicScoreDesc}>Badges, points history, and impact</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.orange} />
        </TouchableOpacity>

        {/* Mode Switcher */}
        <View style={[styles.switchCard, Shadows.card]}>
          <Text style={styles.switchTitle}>Switch Mode</Text>
          <View style={styles.switchButtonsRow}>
            <View style={[styles.switchButton, styles.switchButtonActive]}>
              <Text style={styles.switchTextActive}>🏠 Citizen</Text>
            </View>
            <TouchableOpacity
              style={[styles.switchButton, styles.switchButtonInactive]}
              activeOpacity={0.8}
              onPress={() => router.replace('/(worker)/home')}
            >
              <Text style={styles.switchTextInactive}>🔧 Worker</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings List */}
        <View style={[styles.settingsCard, Shadows.card]}>
          {[
            { icon: 'location-outline' as const, label: 'Manage Addresses' },
            { icon: 'notifications-outline' as const, label: 'Notifications' },
            { icon: 'lock-closed-outline' as const, label: 'Privacy & Security' },
            { icon: 'help-circle-outline' as const, label: 'Help & Support' },
            { icon: 'document-text-outline' as const, label: 'Terms & Conditions' },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.settingRow,
                i < arr.length - 1 ? styles.settingRowBorder : null,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={20} color={Colors.textSecondary} />
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          style={styles.signOutButton}
          activeOpacity={0.85}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.primaryDark,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.major,
    borderBottomLeftRadius: BorderRadius.header,
    borderBottomRightRadius: BorderRadius.header,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: BorderRadius.xxl,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  avatarInitials: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.primaryDarkest,
  },
  userName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xxl,
    color: Colors.white,
  },
  userPhone: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginTop: Spacing.base,
  },
  scorePill: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xs,
  },
  scorePillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: 11,
    color: Colors.orange,
  },
  goldPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xs,
  },
  goldPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 11,
    color: Colors.white,
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  statLabel: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
  },
  civicScoreCard: {
    backgroundColor: Colors.communityCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    borderWidth: 1,
    borderColor: '#E8D5B8',
  },
  civicScoreInfo: {
    flex: 1,
  },
  civicScoreTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
  },
  civicScoreDesc: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  switchCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  switchTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  switchButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  switchButton: {
    flex: 1,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButtonActive: {
    backgroundColor: '#E5F5EE',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  switchButtonInactive: {
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  switchTextActive: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs + 1,
    color: Colors.primary,
  },
  switchTextInactive: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textTertiary,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.screen,
    gap: Spacing.base,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLabel: {
    flex: 1,
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  signOutButton: {
    backgroundColor: '#FCEAEA',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: Spacing.base + 2,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    color: Colors.error,
  },
});
