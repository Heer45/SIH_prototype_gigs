import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          {/* Header visual */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Ionicons name="leaf" size={24} color={Colors.white} />
              </View>
              <Text style={styles.appName}>NagrikSetu</Text>
            </View>
            <Text style={styles.headerTitle}>Welcome Back!</Text>
            <Text style={styles.headerSubtitle}>Enter your mobile number to continue</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formContainer}>
            <View style={[styles.card, Shadows.card]}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <View style={styles.inputRow}>
                <View style={styles.countryCode}>
                  <Text style={styles.flag}>🇮🇳</Text>
                  <Text style={styles.codeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  placeholderTextColor={Colors.textTertiary}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              <Text style={styles.helperText}>
                We'll send a 6-digit OTP to verify your number. Standard SMS charges may apply.
              </Text>

              <TouchableOpacity
                style={[styles.submitButton, Shadows.button]}
                activeOpacity={0.85}
                onPress={() => router.push('/(auth)/otp')}
              >
                <Text style={styles.submitButtonText}>Send OTP</Text>
                <Ionicons name="arrow-forward" size={18} color={Colors.white} />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.85}
              onPress={() => router.push('/(auth)/role-select')}
            >
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Trust Badges */}
            <View style={styles.trustRow}>
              {[
                { icon: 'lock-closed' as const, label: 'Secure Login' },
                { icon: 'checkmark-circle' as const, label: 'Verified Workers' },
                { icon: 'shield-checkmark' as const, label: 'Govt. Certified' },
              ].map((item) => (
                <View key={item.label} style={styles.trustItem}>
                  <Ionicons name={item.icon} size={20} color={Colors.primary} />
                  <Text style={styles.trustLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: Spacing.heroTop,
    borderBottomLeftRadius: BorderRadius.header,
    borderBottomRightRadius: BorderRadius.header,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  logoIcon: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.white,
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
  formContainer: {
    paddingHorizontal: Spacing.screenLg,
    marginTop: -Spacing.major,
    flex: 1,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screenLg,
  },
  inputLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderRightWidth: 1.5,
    borderRightColor: Colors.border,
    gap: 6,
  },
  flag: {
    fontSize: 16,
  },
  codeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    fontFamily: FontFamily.body,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  helperText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.base,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.screenLg,
  },
  submitButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginVertical: Spacing.screenLg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.base,
  },
  googleButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.major,
  },
  trustItem: {
    alignItems: 'center',
    gap: 4,
  },
  trustLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
