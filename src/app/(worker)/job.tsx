import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import NativeMap from '@/components/NativeMap';

const statusSteps = [
  { label: 'Assigned', done: true },
  { label: 'Accepted', done: true },
  { label: 'En Route', done: false, active: true },
  { label: 'Work Started', done: false },
  { label: 'Completed', done: false },
];

export default function WorkerJobScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'accepted' | 'enroute' | 'started' | 'completed'>('enroute');

  const statusActions = {
    accepted: { label: 'Start Navigation', next: 'enroute' as const, color: Colors.cyan },
    enroute: { label: "I've Arrived — Start Work", next: 'started' as const, color: Colors.orange },
    started: { label: 'Mark Work Complete', next: 'completed' as const, color: Colors.primary },
    completed: { label: 'Upload Proof & Finish', next: 'completed' as const, color: Colors.purple },
  };

  const action = statusActions[status];

  const handleNextStatus = () => {
    if (status === 'enroute') {
      setStatus('started');
    } else if (status === 'started') {
      setStatus('completed');
      router.push('/(worker)/profile');
    }
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
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Job Details</Text>
            <Text style={styles.headerJobId}>#JOB-20240910-0391</Text>
          </View>
        </View>

        <View style={styles.jobInfoBanner}>
          <View>
            <Text style={styles.bannerTitle}>Electrical Repair</Text>
            <Text style={styles.bannerSub}>📍 Nehru Nagar, Sector 12 · 1.2 km</Text>
          </View>
          <View style={styles.bannerRewardBox}>
            <Text style={styles.bannerReward}>₹475</Text>
            <Text style={styles.bannerRewardSub}>reward</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Status Tracker */}
        <View style={[styles.card, Shadows.card]}>
          <View style={styles.trackerRow}>
            {statusSteps.map((s, idx) => (
              <View key={s.label} style={styles.trackerNodeWrapper}>
                <View
                  style={[
                    styles.nodeCircle,
                    s.done
                      ? styles.nodeDone
                      : s.active
                      ? styles.nodeActive
                      : styles.nodePending,
                  ]}
                >
                  {s.done ? (
                    <Ionicons name="checkmark" size={12} color={Colors.white} />
                  ) : s.active ? (
                    <View style={styles.activeDot} />
                  ) : null}
                </View>
                <Text
                  style={[
                    styles.nodeLabel,
                    s.done
                      ? { color: Colors.primary }
                      : s.active
                      ? { color: Colors.orange }
                      : { color: Colors.textTertiary },
                  ]}
                >
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Customer Card */}
        <View style={styles.customerCard}>
          <Text style={styles.customerCardHeader}>Customer</Text>
          <View style={styles.customerRow}>
            <View style={styles.customerAvatar}>
              <Text style={styles.customerInitials}>AM</Text>
            </View>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>Amit Mehta</Text>
              <Text style={styles.customerAddress}>Flat 4B, Nehru Nagar</Text>
            </View>
            <TouchableOpacity style={styles.callButton} activeOpacity={0.8}>
              <Text style={styles.callButtonText}>📞 Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Details Card */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.customerCardHeader}>Task Details</Text>
          <Text style={styles.taskDescText}>
            "Power socket in bedroom not working. Tripped breaker twice. Also check ceiling fan wiring."
          </Text>
          <View style={styles.taskTagsRow}>
            <View style={styles.urgentTag}>
              <Text style={styles.urgentTagText}>🔴 URGENT</Text>
            </View>
            <View style={styles.electricalTag}>
              <Text style={styles.electricalTagText}>⚡ Electrical</Text>
            </View>
          </View>
        </View>

        {/* Map Preview */}
        <View style={[styles.mapCard, Shadows.card]}>
          <NativeMap
            latitude={28.6139}
            longitude={77.209}
            markers={[
              { id: 'job', latitude: 28.6139, longitude: 77.209, title: 'Job Location', type: 'issue' },
            ]}
          />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: action.color }, Shadows.button]}
          activeOpacity={0.85}
          onPress={handleNextStatus}
        >
          <Text style={styles.actionButtonText}>{action.label} →</Text>
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
    backgroundColor: Colors.cyan,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.screen,
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
  headerTitles: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  headerJobId: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  jobInfoBanner: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  bannerSub: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  bannerRewardBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  bannerReward: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  bannerRewardSub: {
    fontFamily: FontFamily.body,
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackerNodeWrapper: {
    alignItems: 'center',
    gap: 4,
  },
  nodeCircle: {
    width: 26,
    height: 26,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeDone: {
    backgroundColor: Colors.primary,
  },
  nodeActive: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: Colors.orange,
  },
  nodePending: {
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.orange,
  },
  nodeLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
    textAlign: 'center',
    maxWidth: 50,
  },
  customerCard: {
    backgroundColor: Colors.workerCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  customerCardHeader: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  customerAvatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerInitials: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  customerAddress: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  callButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.sm,
  },
  callButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
  taskDescText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  taskTagsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.base,
  },
  urgentTag: {
    backgroundColor: '#FCEAEA',
    paddingVertical: 2,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  urgentTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
    color: Colors.error,
  },
  electricalTag: {
    backgroundColor: '#E8F1FA',
    paddingVertical: 2,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  electricalTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
    color: Colors.cyan,
  },
  mapCard: {
    borderRadius: BorderRadius.card,
    overflow: 'hidden',
  },
  actionButton: {
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
