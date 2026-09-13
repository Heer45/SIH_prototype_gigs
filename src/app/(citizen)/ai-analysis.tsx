import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import Header from '@/components/Header';

export default function AIAnalysisScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ photoUri?: string }>();

  const rawUri = params.photoUri ? String(params.photoUri) : '';
  const photoUri = rawUri
    ? rawUri.startsWith('file:') || rawUri.startsWith('content:') || rawUri.startsWith('http')
      ? rawUri
      : decodeURIComponent(rawUri)
    : null;

  return (
    <View style={styles.container}>
      <Header
        title="AI Analysis"
        subtitle="Photo analyzed in 2.3 seconds"
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Photo with AI Bounding Box */}
        <View style={styles.photoContainer}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={styles.photoImage}
              resizeMode="cover"
              onError={(err) =>
                console.warn('Error loading image in AI Analysis:', err.nativeEvent.error)
              }
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="trash-bin" size={54} color={Colors.textTertiary} />
            </View>
          )}

          {/* AI Bounding Box Overlay */}
          <View style={styles.boundingBox}>
            <View style={styles.boundingTag}>
              <Text style={styles.boundingTagText}>🔍 Roadside Garbage · 94%</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View style={styles.completeBadge}>
            <Text style={styles.completeBadgeText}>✅ Analysis Complete</Text>
          </View>
        </View>

        {/* AI Detection Result Card */}
        <View style={[styles.aiResultCard, Shadows.card]}>
          <View style={styles.aiResultHeader}>
            <View style={styles.aiIconBox}>
              <Ionicons name="hardware-chip-outline" size={20} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.aiResultTitle}>AI Detection Result</Text>
              <Text style={styles.aiResultSubtitle}>Powered by NagrikSetu Vision AI</Text>
            </View>
          </View>

          {/* Grid of Results */}
          <View style={styles.resultsGrid}>
            {[
              { label: 'Detected', value: 'Roadside Garbage', color: Colors.error, bg: '#FCEAEA' },
              { label: 'Confidence', value: '94%', color: Colors.blue, bg: '#E8F1FA' },
              { label: 'Severity', value: 'HIGH', color: Colors.error, bg: '#FCEAEA' },
              { label: 'Service', value: 'Cleaning Worker', color: Colors.primary, bg: '#E5F5EE' },
            ].map((item) => (
              <View key={item.label} style={[styles.resultItem, { backgroundColor: item.bg }]}>
                <Text style={styles.resultLabel}>{item.label}</Text>
                <Text style={[styles.resultValue, { color: item.color }]}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Confidence Bar */}
          <View style={styles.confidenceSection}>
            <View style={styles.confidenceHeader}>
              <Text style={styles.confidenceLabel}>Detection Confidence</Text>
              <Text style={styles.confidenceValue}>94%</Text>
            </View>
            <View style={styles.confidenceTrack}>
              <View style={[styles.confidenceFill, { width: '94%' }]} />
            </View>
          </View>
        </View>

        {/* Location Card */}
        <View style={[styles.locationCard, Shadows.card]}>
          <Ionicons name="location" size={22} color={Colors.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Near Bus Stop, Sector 12 Market</Text>
            <Text style={styles.locationCoordinates}>
              28.6448° N, 77.2167° E · GPS confirmed
            </Text>
          </View>
          <TouchableOpacity style={styles.editLocButton}>
            <Text style={styles.editLocText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Auto Generated Description */}
        <View style={[styles.descCard, Shadows.card]}>
          <Text style={styles.descTitle}>Auto-Generated Description</Text>
          <View style={styles.descTextBox}>
            <Text style={styles.descText}>
              "Accumulated roadside garbage detected near Bus Stop. High severity — requires immediate cleaning. Recommended: Cleaning Worker deployment."
            </Text>
          </View>
        </View>

        {/* Create Request Button */}
        <TouchableOpacity
          style={[styles.createButton, Shadows.button]}
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: '/(citizen)/tracking',
              params: { photoUri: photoUri ? encodeURIComponent(photoUri) : '' },
            })
          }
        >
          <Text style={styles.createButtonText}>Create Request →</Text>
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
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  photoContainer: {
    backgroundColor: '#1F2937',
    borderRadius: BorderRadius.card,
    height: 190,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
  },
  boundingBox: {
    position: 'absolute',
    top: '25%',
    left: '20%',
    right: '20%',
    bottom: '22%',
    borderWidth: 2.5,
    borderColor: '#60A5FA',
    borderRadius: BorderRadius.xs,
  },
  boundingTag: {
    position: 'absolute',
    top: -22,
    left: 0,
    backgroundColor: '#2563EB',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  boundingTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 9,
    color: Colors.white,
  },
  completeBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#E8F1FA',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.xs,
  },
  completeBadgeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: 10,
    color: '#1E40AF',
  },
  aiResultCard: {
    backgroundColor: Colors.aiCard,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    borderWidth: 1,
    borderColor: Colors.blueLight,
  },
  aiResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.base,
  },
  aiIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiResultTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm + 1,
    color: Colors.blue,
  },
  aiResultSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: '#3B82F6',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
    marginBottom: Spacing.base,
  },
  resultItem: {
    width: '47%',
    flexGrow: 1,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
  },
  resultLabel: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  resultValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xs + 2,
  },
  confidenceSection: {
    gap: 4,
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confidenceLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  confidenceValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.blue,
  },
  confidenceTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: Colors.blue,
    borderRadius: 4,
  },
  locationCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  locationCoordinates: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  editLocButton: {
    backgroundColor: Colors.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.xs,
  },
  editLocText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  descCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
  },
  descTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  descTextBox: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    padding: Spacing.base,
  },
  descText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  createButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
