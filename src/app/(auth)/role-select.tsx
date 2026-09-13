import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

export default function RoleSelectScreen() {
  const router = useRouter();

  const handleSelect = (role: 'citizen' | 'worker') => {
    if (role === 'citizen') {
      router.replace('/(citizen)/home');
    } else {
      router.replace('/(worker)/home');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          {/* Logo Header */}
          <View style={styles.header}>
            <View style={styles.logoIcon}>
              <Ionicons name="leaf" size={32} color={Colors.white} />
            </View>
            <Text style={styles.title}>Welcome to NagrikSetu</Text>
            <Text style={styles.subtitle}>How would you like to use the app today?</Text>
          </View>

          {/* Role Cards */}
          <View style={styles.cardsContainer}>
            {/* Citizen Card */}
            <TouchableOpacity
              style={[styles.roleCard, Shadows.card]}
              activeOpacity={0.85}
              onPress={() => handleSelect('citizen')}
            >
              <View style={[styles.roleIconBox, { backgroundColor: '#E5F5EE' }]}>
                <Ionicons name="home" size={32} color={Colors.primary} />
              </View>
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>I'm a Citizen</Text>
                <Text style={styles.roleDesc}>Book services and report community issues</Text>
                <View style={styles.tagRow}>
                  {['Book Services', 'Report Issues', 'Track Requests'].map((tag) => (
                    <View key={tag} style={styles.citizenTag}>
                      <Text style={styles.citizenTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
            </TouchableOpacity>

            {/* Worker Card */}
            <TouchableOpacity
              style={[styles.roleCard, Shadows.card]}
              activeOpacity={0.85}
              onPress={() => handleSelect('worker')}
            >
              <View style={[styles.roleIconBox, { backgroundColor: '#EAF3F5' }]}>
                <Ionicons name="construct" size={32} color={Colors.cyan} />
              </View>
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>I'm a Worker</Text>
                <Text style={styles.roleDesc}>Find jobs and earn fairly through the cooperative</Text>
                <View style={styles.tagRow}>
                  {['Find Jobs', 'Fair Pay', 'Track Earnings'].map((tag) => (
                    <View key={tag} style={styles.workerTag}>
                      <Text style={styles.workerTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.cyan} />
            </TouchableOpacity>
          </View>

          {/* Trust Badge */}
          <View style={styles.trustBadge}>
            <Ionicons name="shield-checkmark" size={24} color={Colors.orange} />
            <View style={styles.trustTextContainer}>
              <Text style={styles.trustTitle}>Government Certified Platform</Text>
              <Text style={styles.trustDesc}>
                All cooperatives verified under Societies Registration Act
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenLg,
    paddingTop: Spacing.major,
    paddingBottom: Spacing.screenXl,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.major,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xxl,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  title: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.headingLg,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  cardsContainer: {
    width: '100%',
    gap: Spacing.lg,
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  roleIconBox: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xxl,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  roleDesc: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.base,
  },
  citizenTag: {
    backgroundColor: '#E5F5EE',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  citizenTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.semiBold,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  workerTag: {
    backgroundColor: '#EAF3F5',
    paddingVertical: 3,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  workerTagText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.semiBold,
    fontSize: FontSize.xs,
    color: Colors.cyan,
  },
  trustBadge: {
    marginTop: Spacing.major,
    backgroundColor: '#F6EFE3',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8D5B8',
  },
  trustTextContainer: {
    flex: 1,
  },
  trustTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  trustDesc: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
