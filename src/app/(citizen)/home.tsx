import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import { serviceCategories } from '@/data/services';
import { activityFeed, communityStats } from '@/data/community';
import BottomNavigation from '@/components/BottomNavigation';
import { getCurrentLocation } from '@/services/location';

export default function CitizenHomeScreen() {
  const router = useRouter();
  const [locationName, setLocationName] = useState('Locating...');

  const fetchLocation = async () => {
    setLocationName('Locating...');
    const loc = await getCurrentLocation();
    if (loc?.address) {
      setLocationName(loc.address);
    } else {
      setLocationName('Location unavailable');
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleTabPress = (tab: string) => {
    if (tab === 'services') router.push('/(citizen)/services');
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
            style={styles.locationRow}
            activeOpacity={0.7}
            onPress={fetchLocation}
          >
            <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.85)" />
            <Text style={styles.locationText} numberOfLines={1}>
              {locationName}
            </Text>
            <Ionicons name="chevron-down" size={12} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={18} color={Colors.white} />
              <View style={styles.badgeDot} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={() => router.push('/(citizen)/profile')}
            >
              <Text style={styles.avatarText}>AM</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.greetingTitle}>How can we help today?</Text>
        <Text style={styles.greetingSubtitle}>Book trusted cooperative workers near you</Text>

        {/* Quick Action Buttons */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.quickActionButton, styles.bookServiceBtn]}
            activeOpacity={0.85}
            onPress={() => router.push('/(citizen)/services')}
          >
            <Text style={styles.btnEmoji}>🔧</Text>
            <Text style={styles.bookServiceText}>Book Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickActionButton, styles.reportIssueBtn]}
            activeOpacity={0.85}
            onPress={() => router.push('/(citizen)/community')}
          >
            <Text style={styles.btnEmoji}>📸</Text>
            <Text style={styles.reportIssueText}>Report Issue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Body */}
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Services Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => router.push('/(citizen)/services')}>
              <Text style={styles.seeAllText}>See all →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesGrid}>
            {serviceCategories.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.serviceItem, { backgroundColor: s.color }]}
                activeOpacity={0.85}
                onPress={() => router.push('/(citizen)/booking')}
              >
                <Text style={styles.serviceEmoji}>{s.icon}</Text>
                <Text style={styles.serviceLabel} numberOfLines={1}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Community Impact Card */}
        <View style={[styles.impactCard, Shadows.card]}>
          <View style={styles.impactHeader}>
            <View>
              <Text style={styles.impactTitle}>Community Impact 🌍</Text>
              <Text style={styles.impactSubtitle}>Your locality stats this month</Text>
            </View>
            <TouchableOpacity
              style={styles.civicScorePill}
              onPress={() => router.push('/(citizen)/civic-score')}
            >
              <Text style={styles.civicScorePillText}>Civic Score: 450</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.impactStatsRow}>
            {[
              { value: communityStats.issuesSolved.toString(), label: 'Issues Solved', icon: '✅' },
              { value: communityStats.workersActive.toString(), label: 'Workers Active', icon: '👷' },
              { value: communityStats.areasImproved.toString(), label: 'Areas Improved', icon: '🏘️' },
            ].map((stat) => (
              <View key={stat.label} style={styles.statBox}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nearby Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Activity</Text>
          <View style={styles.activityList}>
            {activityFeed.map((item) => (
              <View key={item.id} style={[styles.activityCard, Shadows.card]}>
                <View style={[styles.activityIconBox, { backgroundColor: item.bgColor }]}>
                  <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityItemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.activityItemSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={[styles.pillBadge, { backgroundColor: item.pillColor + '18' }]}>
                  <Text style={[styles.pillText, { color: item.pillColor }]}>{item.pill}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="home" onTabPress={handleTabPress} />

      {/* TEMPORARY: Diagnostic access button for camera test */}
      <TouchableOpacity
        style={styles.cameraTestButton}
        activeOpacity={0.7}
        onPress={() => router.push('/(citizen)/camera-test')}
      >
        <Text style={styles.cameraTestButtonText}>📷 Camera Test</Text>
      </TouchableOpacity>
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
    paddingBottom: Spacing.screenLg,
    borderBottomLeftRadius: BorderRadius.sheet,
    borderBottomRightRadius: BorderRadius.sheet,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginRight: Spacing.base,
  },
  locationText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    flexShrink: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    borderWidth: 1.5,
    borderColor: Colors.primaryDark,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.primaryDarkest,
  },
  greetingTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.white,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.screen,
  },
  quickActionButton: {
    flex: 1,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bookServiceBtn: {
    backgroundColor: Colors.white,
  },
  reportIssueBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  btnEmoji: {
    fontSize: 16,
  },
  bookServiceText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.md,
    color: Colors.primary,
  },
  reportIssueText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.md,
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.screen,
    gap: Spacing.screenLg,
  },
  section: {
    gap: Spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  serviceItem: {
    width: '22%',
    flexGrow: 1,
    paddingVertical: Spacing.base,
    paddingHorizontal: 4,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  serviceEmoji: {
    fontSize: 24,
  },
  serviceLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: Colors.communityCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 1,
    borderColor: '#E8D5B8',
  },
  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  impactTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  impactSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  civicScorePill: {
    backgroundColor: Colors.orange,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  civicScorePillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
  impactStatsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  statLabel: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  activityList: {
    gap: Spacing.base,
  },
  activityCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  activityIconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityItemTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  activityItemSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  pillBadge: {
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  pillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
  },

  // TEMPORARY: Diagnostic access button for camera test
  cameraTestButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.screen,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cameraTestButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    color: Colors.white,
  },
});
