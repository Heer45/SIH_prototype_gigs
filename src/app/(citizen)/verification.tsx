import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import Header from '@/components/Header';

export default function VerificationScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  return (
    <View style={styles.container}>
      <Header
        title="Work Verification"
        subtitle="Confirm the work is completed"
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Worker Info Card */}
        <View style={styles.workerBar}>
          <View style={styles.workerAvatar}>
            <Text style={styles.workerAvatarText}>RK</Text>
          </View>
          <View style={styles.workerDetails}>
            <Text style={styles.workerName}>Rajesh Kumar</Text>
            <Text style={styles.workerSub}>Electrical Repair · ₹475 earned</Text>
          </View>
          <View style={styles.doneBadge}>
            <Text style={styles.doneBadgeText}>✅ Work Done</Text>
          </View>
        </View>

        {/* Before / After Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Before / After</Text>
          <View style={styles.beforeAfterRow}>
            {/* Before */}
            <View style={styles.proofCard}>
              <View style={[styles.proofImagePlaceholder, { backgroundColor: '#374151' }]}>
                <Ionicons name="flash-off-outline" size={36} color="#EF4444" />
                <View style={[styles.proofTag, { backgroundColor: '#FCEAEA' }]}>
                  <Text style={[styles.proofTagText, { color: '#EF4444' }]}>BEFORE</Text>
                </View>
              </View>
            </View>

            {/* After */}
            <View style={styles.proofCard}>
              <View style={[styles.proofImagePlaceholder, { backgroundColor: Colors.primaryDark }]}>
                <Ionicons name="checkmark-circle-outline" size={36} color={Colors.secondary} />
                <View style={[styles.proofTag, { backgroundColor: '#E5F5EE' }]}>
                  <Text style={[styles.proofTagText, { color: Colors.primary }]}>AFTER ✓</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* AI Verification */}
        <View style={styles.aiVerifyBox}>
          <Ionicons name="hardware-chip-outline" size={24} color={Colors.blue} />
          <View style={styles.aiVerifyContent}>
            <Text style={styles.aiVerifyTitle}>
              AI Verification: 96% confident work is complete
            </Text>
            <Text style={styles.aiVerifyDesc}>
              Electrical socket repaired and functional. No hazard detected.
            </Text>
          </View>
        </View>

        {/* Rate Experience */}
        <View style={[styles.rateCard, Shadows.card]}>
          <Text style={styles.rateTitle}>Rate Your Experience</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                activeOpacity={0.7}
                onPress={() => setRating(star)}
              >
                <Ionicons
                  name="star"
                  size={32}
                  color={star <= rating ? Colors.star : Colors.border}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience (optional)..."
            placeholderTextColor={Colors.textTertiary}
            multiline
            numberOfLines={2}
            value={review}
            onChangeText={setReview}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, Shadows.button]}
            activeOpacity={0.85}
            onPress={() => router.push('/(citizen)/civic-score')}
          >
            <Text style={styles.confirmButtonText}>✅ Confirm Work Done</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportProblemButton} activeOpacity={0.85}>
            <Text style={styles.reportProblemText}>⚠️ Report Problem</Text>
          </TouchableOpacity>
        </View>
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
  workerBar: {
    backgroundColor: Colors.workerCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  workerAvatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workerAvatarText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  workerDetails: {
    flex: 1,
  },
  workerName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
  },
  workerSub: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  doneBadge: {
    backgroundColor: '#E5F5EE',
    paddingVertical: 4,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  doneBadgeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  section: {
    gap: Spacing.base,
  },
  sectionTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  beforeAfterRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  proofCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  proofImagePlaceholder: {
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  proofTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  proofTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: 9,
  },
  aiVerifyBox: {
    backgroundColor: Colors.aiCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.blueLight,
  },
  aiVerifyContent: {
    flex: 1,
  },
  aiVerifyTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.blue,
  },
  aiVerifyDesc: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  rateCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    alignItems: 'center',
  },
  rateTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  starsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.base,
  },
  reviewInput: {
    width: '100%',
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    minHeight: 56,
  },
  buttonsContainer: {
    gap: Spacing.base,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  reportProblemButton: {
    backgroundColor: '#FCEAEA',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    paddingVertical: Spacing.base + 2,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportProblemText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.error,
  },
});
