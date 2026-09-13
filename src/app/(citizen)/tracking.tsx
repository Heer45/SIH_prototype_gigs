import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';
import NativeMap from '@/components/NativeMap';

const steps = [
  { label: 'Request Created', time: '10:15 AM', done: true, desc: 'Your service request was submitted' },
  { label: 'Worker Assigned', time: '10:22 AM', done: true, desc: 'Rajesh Kumar has been assigned' },
  { label: 'Worker Accepted', time: '10:25 AM', done: true, desc: 'Rajesh confirmed availability' },
  { label: 'Worker En Route', time: '10:48 AM', done: false, active: true, desc: 'Rajesh is 12 min away from you' },
  { label: 'Work Started', time: '—', done: false, desc: 'Worker will update on arrival' },
  { label: 'Verification Pending', time: '—', done: false, desc: 'Before/after photo check' },
  { label: 'Completed', time: '—', done: false, desc: 'Service will be marked complete' },
];

export default function TrackingScreen() {
  const router = useRouter();

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(citizen)/home');
    else if (tab === 'services') router.push('/(citizen)/services');
    else if (tab === 'community') router.push('/(citizen)/community');
    else if (tab === 'profile') router.push('/(citizen)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Track Request</Text>
            <Text style={styles.headerReqId}>#REQ-20240910-4871</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>🚗 En Route</Text>
          </View>
        </View>

        {/* Worker ETA Bar */}
        <View style={styles.etaBar}>
          <View style={styles.workerAvatarBox}>
            <Text style={styles.workerAvatarText}>RK</Text>
          </View>
          <View style={styles.workerEtaInfo}>
            <Text style={styles.workerName}>Rajesh Kumar</Text>
            <Text style={styles.workerMeta}>⭐ 4.9 · Certified Electrician</Text>
          </View>
          <View style={styles.etaRight}>
            <Text style={styles.etaMinutes}>12 min</Text>
            <Text style={styles.etaLabel}>ETA</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* GPS Live Map */}
        <View style={[styles.mapContainer, Shadows.card]}>
          <NativeMap
            latitude={28.6139}
            longitude={77.209}
            markers={[
              {
                id: 'worker',
                latitude: 28.6145,
                longitude: 77.21,
                title: 'Rajesh (Worker)',
                type: 'worker',
              },
              {
                id: 'dest',
                latitude: 28.612,
                longitude: 77.208,
                title: 'Your Home',
                type: 'citizen',
              },
            ]}
          />
        </View>

        {/* Timeline */}
        <View style={[styles.timelineCard, Shadows.card]}>
          <Text style={styles.timelineTitle}>Status Timeline</Text>
          <View style={styles.timelineList}>
            {steps.map((step, idx) => (
              <View key={step.label} style={styles.timelineItem}>
                {/* Timeline node */}
                <View style={styles.nodeColumn}>
                  <View
                    style={[
                      styles.nodeCircle,
                      step.done
                        ? styles.nodeDone
                        : step.active
                        ? styles.nodeActive
                        : styles.nodePending,
                    ]}
                  >
                    {step.done ? (
                      <Ionicons name="checkmark" size={14} color={Colors.white} />
                    ) : step.active ? (
                      <View style={styles.activeDot} />
                    ) : (
                      <View style={styles.pendingDot} />
                    )}
                  </View>
                  {idx < steps.length - 1 && <View style={styles.connectorLine} />}
                </View>

                {/* Timeline text */}
                <View style={styles.stepInfo}>
                  <View style={styles.stepHeader}>
                    <Text
                      style={[
                        styles.stepLabel,
                        step.done
                          ? { color: Colors.primary }
                          : step.active
                          ? { color: Colors.orange }
                          : { color: Colors.textTertiary },
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={styles.stepTime}>{step.time}</Text>
                  </View>
                  {(step.done || step.active) && (
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.callButton} activeOpacity={0.85}>
            <Text style={styles.callButtonText}>📞 Call Worker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.verifyButton}
            activeOpacity={0.85}
            onPress={() => router.push('/(citizen)/verification')}
          >
            <Text style={styles.verifyButtonText}>Verify Work ✓</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="activity" onTabPress={handleTabPress} />
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
    paddingBottom: Spacing.screen,
    borderBottomLeftRadius: BorderRadius.sheet,
    borderBottomRightRadius: BorderRadius.sheet,
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
    color: Colors.white,
  },
  headerReqId: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xs,
  },
  statusPillText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.orange,
  },
  etaBar: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  workerAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerAvatarText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.primaryDarkest,
  },
  workerEtaInfo: {
    flex: 1,
  },
  workerName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm + 1,
    color: Colors.white,
  },
  workerMeta: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  etaRight: {
    alignItems: 'flex-end',
  },
  etaMinutes: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  etaLabel: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: 'rgba(255,255,255,0.6)',
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  mapContainer: {
    borderRadius: BorderRadius.card,
    overflow: 'hidden',
  },
  timelineCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  timelineTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.screen,
  },
  timelineList: {
    gap: Spacing.base,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  nodeColumn: {
    alignItems: 'center',
    width: 32,
  },
  nodeCircle: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
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
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.orange,
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textTertiary,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  stepInfo: {
    flex: 1,
    paddingTop: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
  },
  stepTime: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
  },
  stepDesc: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#E8F1FA',
    paddingVertical: Spacing.base + 2,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.cyan,
  },
  verifyButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base + 2,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs + 1,
    color: Colors.white,
  },
});
