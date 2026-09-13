import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (index: number, value: string) => {
    const val = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify OTP</Text>
          <Text style={styles.headerSubtitle}>Sent to +91 98765 43210</Text>
        </View>

        {/* Card */}
        <View style={styles.content}>
          <View style={[styles.card, Shadows.card]}>
            <Text style={styles.cardTitle}>Enter the 6-digit code</Text>

            <View style={styles.otpRow}>
              {otp.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    inputRefs.current[i] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    digit ? styles.otpBoxFilled : null,
                  ]}
                  value={digit}
                  onChangeText={(val) => handleChange(i, val)}
                  onKeyPress={(e) => handleKeyPress(i, e)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn't receive? </Text>
              <TouchableOpacity>
                <Text style={styles.resendLink}>Resend OTP</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, Shadows.button]}
              activeOpacity={0.85}
              onPress={() => router.push('/(auth)/role-select')}
            >
              <Text style={styles.submitButtonText}>Verify & Continue</Text>
            </TouchableOpacity>
          </View>

          {/* Secure indicator */}
          <View style={styles.lockContainer}>
            <View style={styles.lockIconBox}>
              <Ionicons name="lock-closed" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.lockText}>
              Your number is secured with end-to-end encryption
            </Text>
          </View>
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
  header: {
    backgroundColor: Colors.primaryDark,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screenLg,
    paddingBottom: Spacing.heroTop - 20,
    borderBottomLeftRadius: BorderRadius.header,
    borderBottomRightRadius: BorderRadius.header,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  backText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.8)',
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.headingLg,
    color: Colors.white,
  },
  headerSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xs,
  },
  content: {
    paddingHorizontal: Spacing.screenLg,
    marginTop: -Spacing.major,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screenLg,
  },
  cardTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.screenLg,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.screenLg,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    fontSize: FontSize.heading,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: '#E5F5EE',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.screenLg,
  },
  resendText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  resendLink: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  lockContainer: {
    alignItems: 'center',
    marginTop: Spacing.major,
    gap: Spacing.sm,
  },
  lockIconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: '#E5F5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
