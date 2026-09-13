import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

export default function PaymentSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          {/* Success Ring */}
          <View style={styles.ringWrapper}>
            <View style={styles.outerRing}>
              <View style={styles.innerRing}>
                <Ionicons name="checkmark" size={36} color={Colors.white} />
              </View>
            </View>
            <Text style={styles.celebrateEmoji}>🎉</Text>
          </View>

          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.subtitle}>
            Your request has been created. Rajesh Kumar will confirm shortly.
          </Text>

          {/* Receipt Card */}
          <View style={[styles.receiptCard, Shadows.card]}>
            {[
              { label: 'Transaction ID', value: 'TXN8837291645' },
              { label: 'Service', value: 'Electrical Repair' },
              { label: 'Worker', value: 'Rajesh Kumar' },
              { label: 'Amount Paid', value: '₹500' },
              { label: 'Community Fund', value: '₹25 contributed ❤️' },
              { label: 'Scheduled', value: 'Today, 11:00 AM' },
            ].map(({ label, value }, i) => (
              <View
                key={label}
                style={[
                  styles.receiptRow,
                  i < 5 ? styles.receiptRowBorder : null,
                ]}
              >
                <Text style={styles.receiptLabel}>{label}</Text>
                <Text style={styles.receiptValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.trackButton, Shadows.button]}
              activeOpacity={0.85}
              onPress={() => router.push('/(citizen)/tracking')}
            >
              <Text style={styles.trackButtonText}>Track Request →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              activeOpacity={0.85}
              onPress={() => router.replace('/(citizen)/home')}
            >
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F2',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenLg,
    paddingTop: Spacing.heroTop - 30,
    paddingBottom: Spacing.screenLg,
    alignItems: 'center',
  },
  ringWrapper: {
    position: 'relative',
    marginBottom: Spacing.screen,
  },
  outerRing: {
    width: 110,
    height: 110,
    borderRadius: BorderRadius.full,
    backgroundColor: '#E5F5EE',
    borderWidth: 3,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrateEmoji: {
    position: 'absolute',
    top: -6,
    right: -6,
    fontSize: 26,
  },
  title: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.headingLg,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.screenLg,
  },
  receiptCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    marginBottom: Spacing.screenLg,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  receiptRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F2',
  },
  receiptLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  receiptValue: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  actionsContainer: {
    width: '100%',
    gap: Spacing.base,
  },
  trackButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  homeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.secondary,
    paddingVertical: Spacing.xl - 2,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.primary,
  },
});
