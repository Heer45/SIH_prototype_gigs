import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';
import { takePhoto, pickFromGallery } from '@/services/camera';

const issueCategories = [
  { icon: '🗑️', label: 'Garbage', color: '#FCEAEA', textColor: '#EF4444' },
  { icon: '🛣️', label: 'Dirty Road', color: '#FEF3C7', textColor: '#D97706' },
  { icon: '🚮', label: 'Overflowing Bin', color: '#FCEAEA', textColor: '#EF4444' },
  { icon: '🧱', label: 'Debris', color: '#F6EFE3', textColor: '#92400E' },
  { icon: '💧', label: 'Water Logging', color: '#E8F1FA', textColor: '#0891B2' },
  { icon: '⚠️', label: 'Other', color: '#F4F7F2', textColor: '#667085' },
];

const initialReports = [
  {
    id: '1',
    icon: '🗑️',
    title: 'Garbage on Main Road',
    location: 'Near Bus Stop, Sector 12',
    time: '2 hrs ago',
    status: 'In Progress',
    statusColor: '#D97706',
    statusBg: '#FEF3C7',
    votes: 14,
  },
  {
    id: '2',
    icon: '🛣️',
    title: 'Pothole at Crossing',
    location: 'Civil Lines, Junction',
    time: 'Yesterday',
    status: 'Resolved',
    statusColor: '#2F6F57',
    statusBg: '#E5F5EE',
    votes: 31,
  },
  {
    id: '3',
    icon: '🚮',
    title: 'Overflowing Dustbin',
    location: 'Market Area, Block C',
    time: '3 days ago',
    status: 'Resolved',
    statusColor: '#2F6F57',
    statusBg: '#E5F5EE',
    votes: 8,
  },
];

export default function CommunityScreen() {
  const router = useRouter();
  const [reports, setReports] = useState(initialReports);
  const [attachedImageUri, setAttachedImageUri] = useState<string | null>(null);

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(citizen)/home');
    else if (tab === 'services') router.push('/(citizen)/services');
    else if (tab === 'activity') router.push('/(citizen)/tracking');
    else if (tab === 'profile') router.push('/(citizen)/profile');
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      setAttachedImageUri(uri);
      // TEMPORARY: Do NOT navigate after camera for diagnostic test
    }
  };

  const handlePickGallery = async () => {
    const uri = await pickFromGallery();
    if (uri) {
      setAttachedImageUri(uri);
      router.push({
        pathname: '/(citizen)/ai-analysis',
        params: { photoUri: encodeURIComponent(uri) },
      });
    }
  };

  const handleCategoryPress = async (_label: string) => {
    if (attachedImageUri) {
      router.push({
        pathname: '/(citizen)/ai-analysis',
        params: { photoUri: encodeURIComponent(attachedImageUri) },
      });
    } else {
      const uri = await takePhoto();
      if (uri) {
        setAttachedImageUri(uri);
        router.push({
          pathname: '/(citizen)/ai-analysis',
          params: { photoUri: encodeURIComponent(uri) },
        });
      }
    }
  };

  const handleVote = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, votes: r.votes + 1 } : r))
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>See something wrong? Report it now.</Text>

        {/* Camera & Gallery Action Buttons */}
        <View style={styles.mediaActionsRow}>
          <TouchableOpacity
            style={[styles.mediaCTAButton, styles.cameraCTA, Shadows.button]}
            activeOpacity={0.85}
            onPress={handleTakePhoto}
          >
            <View style={styles.cameraIconBox}>
              <Ionicons name="camera" size={22} color={Colors.orange} />
            </View>
            <Text style={styles.cameraCTAText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mediaCTAButton, styles.galleryCTA, Shadows.button]}
            activeOpacity={0.85}
            onPress={handlePickGallery}
          >
            <View style={styles.galleryIconBox}>
              <Ionicons name="images" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.galleryCTAText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Attached image preview banner if present */}
        {attachedImageUri ? (
          <View style={[styles.attachedPreviewCard, Shadows.card]}>
            <Image source={{ uri: attachedImageUri }} style={styles.previewThumbnail} />
            <View style={styles.attachedPreviewInfo}>
              <Text style={styles.attachedTitle}>Photo Attached</Text>
              <Text style={styles.attachedSub}>Ready for AI analysis</Text>
            </View>
            <TouchableOpacity
              style={styles.analyzeBtn}
              onPress={() =>
                router.push({
                  pathname: '/(citizen)/ai-analysis',
                  params: { photoUri: encodeURIComponent(attachedImageUri) },
                })
              }
            >
              <Text style={styles.analyzeBtnText}>Analyze →</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => setAttachedImageUri(null)}
            >
              <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Issue Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Categories</Text>
          <View style={styles.categoriesGrid}>
            {issueCategories.map((cat) => (
              <TouchableOpacity
                key={cat.label}
                style={[styles.catCard, { backgroundColor: cat.color }]}
                activeOpacity={0.85}
                onPress={() => handleCategoryPress(cat.label)}
              >
                <Text style={{ fontSize: 24 }}>{cat.icon}</Text>
                <Text style={[styles.catLabel, { color: cat.textColor }]}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Monthly Area Stats */}
        <View style={[styles.statsCard, Shadows.card]}>
          <Text style={styles.statsCardTitle}>This Month in Your Area 🏆</Text>
          <View style={styles.statsRow}>
            {[
              { value: '47', label: 'Reports Filed', icon: '📋' },
              { value: '38', label: 'Resolved', icon: '✅' },
              { value: '₹12k', label: 'Fund Used', icon: '💰' },
            ].map((s, i) => (
              <View
                key={s.label}
                style={[
                  styles.statColumn,
                  i < 2 ? styles.statColumnBorder : null,
                ]}
              >
                <Text style={{ fontSize: 18 }}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
            <TouchableOpacity onPress={() => router.push('/(citizen)/tracking')}>
              <Text style={styles.mapViewLink}>Map View →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reportsList}>
            {reports.map((r) => (
              <View key={r.id} style={[styles.reportCard, Shadows.card]}>
                <View style={styles.reportIconBox}>
                  <Text style={{ fontSize: 20 }}>{r.icon}</Text>
                </View>

                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle} numberOfLines={1}>
                    {r.title}
                  </Text>
                  <Text style={styles.reportLocation}>{r.location}</Text>
                  <View style={styles.reportMetaRow}>
                    <View style={[styles.statusBadge, { backgroundColor: r.statusBg }]}>
                      <Text style={[styles.statusText, { color: r.statusColor }]}>
                        {r.status}
                      </Text>
                    </View>
                    <Text style={styles.reportTime}>{r.time}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.voteButton}
                  activeOpacity={0.7}
                  onPress={() => handleVote(r.id)}
                >
                  <Text style={{ fontSize: 14 }}>👍</Text>
                  <Text style={styles.voteCount}>{r.votes}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="community" onTabPress={handleTabPress} />
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
    paddingBottom: Spacing.screen,
    borderBottomLeftRadius: BorderRadius.sheet,
    borderBottomRightRadius: BorderRadius.sheet,
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.white,
  },
  headerSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    marginBottom: Spacing.base,
  },
  mediaActionsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  mediaCTAButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  cameraCTA: {},
  galleryCTA: {},
  cameraIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: '#E5F5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCTAText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    color: Colors.orange,
  },
  galleryCTAText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.screenLg,
  },
  attachedPreviewCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  previewThumbnail: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.border,
  },
  attachedPreviewInfo: {
    flex: 1,
  },
  attachedTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  attachedSub: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.primary,
    marginTop: 2,
  },
  analyzeBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.sm,
  },
  analyzeBtnText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
  clearBtn: {
    padding: 2,
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
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  mapViewLink: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  catCard: {
    width: '30%',
    flexGrow: 1,
    paddingVertical: Spacing.base + 2,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: 4,
  },
  catLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  statsCardTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  statColumnBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  statValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xxl,
    color: Colors.primary,
    marginVertical: 2,
  },
  statLabel: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textTertiary,
  },
  reportsList: {
    gap: Spacing.base,
  },
  reportCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  reportIconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  reportLocation: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  reportMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
  },
  reportTime: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textTertiary,
  },
  voteButton: {
    alignItems: 'center',
    gap: 2,
    padding: Spacing.xs,
  },
  voteCount: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
