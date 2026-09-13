import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import BottomNavigation from '@/components/BottomNavigation';

const categories = [
  { icon: '🔧', label: 'Plumbing', count: '24 workers', color: '#E5F5EE', textColor: '#2F6F57' },
  { icon: '⚡', label: 'Electrical', count: '18 workers', color: '#E8F1FA', textColor: '#0891B2' },
  { icon: '🧹', label: 'Cleaning', count: '31 workers', color: '#F6EFE3', textColor: '#D97706' },
  { icon: '🪵', label: 'Carpentry', count: '9 workers', color: '#EAF3F5', textColor: '#0891B2' },
  { icon: '🎨', label: 'Painting', count: '12 workers', color: '#E8F1FA', textColor: '#7C3AED' },
  { icon: '🌿', label: 'Gardening', count: '7 workers', color: '#E5F5EE', textColor: '#2F6F57' },
  { icon: '🚿', label: 'Sanitation', count: '15 workers', color: '#EAF3F5', textColor: '#0891B2' },
  { icon: '🚨', label: 'Emergency', count: 'Priority', color: '#FCEAEA', textColor: '#EF4444' },
];

const popularServices = [
  { title: 'Home Deep Cleaning', category: 'Cleaning', price: '₹599', time: '3-4 hrs', rating: 4.8, workers: 12, icon: '🧹' },
  { title: 'Pipe Leak Repair', category: 'Plumbing', price: '₹299', time: '1-2 hrs', rating: 4.7, workers: 8, icon: '🔧' },
  { title: 'Fan / AC Repair', category: 'Electrical', price: '₹399', time: '1 hr', rating: 4.9, workers: 15, icon: '⚡' },
  { title: 'Furniture Assembly', category: 'Carpentry', price: '₹449', time: '2-3 hrs', rating: 4.6, workers: 5, icon: '🪵' },
];

export default function ServicesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleTabPress = (tab: string) => {
    if (tab === 'home') router.push('/(citizen)/home');
    else if (tab === 'community') router.push('/(citizen)/community');
    else if (tab === 'activity') router.push('/(citizen)/tracking');
    else if (tab === 'profile') router.push('/(citizen)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.label}
                style={[styles.categoryCard, { backgroundColor: cat.color }]}
                activeOpacity={0.85}
                onPress={() => router.push('/(citizen)/booking')}
              >
                <Text style={styles.catEmoji}>{cat.icon}</Text>
                <Text style={styles.catLabel} numberOfLines={1}>
                  {cat.label}
                </Text>
                <Text style={[styles.catCount, { color: cat.textColor }]}>{cat.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <Text style={styles.sectionSubtitle}>Near you</Text>
          </View>

          <View style={styles.popularList}>
            {popularServices.map((svc) => (
              <TouchableOpacity
                key={svc.title}
                style={[styles.popularCard, Shadows.card]}
                activeOpacity={0.85}
                onPress={() => router.push('/(citizen)/booking')}
              >
                <View style={styles.popularIconBox}>
                  <Text style={{ fontSize: 26 }}>{svc.icon}</Text>
                </View>
                <View style={styles.popularInfo}>
                  <Text style={styles.popularTitle}>{svc.title}</Text>
                  <Text style={styles.popularMeta}>
                    ⭐ {svc.rating} · {svc.time} · {svc.workers} workers
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>{svc.price}</Text>
                  <Text style={styles.priceSub}>onwards</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <Text style={{ fontSize: 28 }}>🚨</Text>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency Services</Text>
            <Text style={styles.emergencyDesc}>Priority workers available 24×7</Text>
          </View>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => router.push('/(citizen)/booking')}
          >
            <Text style={styles.emergencyButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="services" onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: Spacing.statusBar,
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.screen,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.heading,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base - 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
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
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  categoryCard: {
    width: '22%',
    flexGrow: 1,
    paddingVertical: Spacing.screen,
    paddingHorizontal: 4,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  catEmoji: {
    fontSize: 26,
  },
  catLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  catCount: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    fontWeight: FontWeight.semiBold,
  },
  popularList: {
    gap: Spacing.base,
  },
  popularCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  popularIconBox: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularInfo: {
    flex: 1,
  },
  popularTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  popularMeta: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.primary,
  },
  priceSub: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
  },
  emergencyBanner: {
    backgroundColor: '#FCEAEA',
    borderRadius: BorderRadius.xl,
    padding: Spacing.screen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    color: Colors.error,
  },
  emergencyDesc: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  emergencyButton: {
    backgroundColor: Colors.error,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  emergencyButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs,
    color: Colors.white,
  },
});
