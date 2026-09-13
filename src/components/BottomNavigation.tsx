import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import { CitizenTab, WorkerTab, Role } from '@/types/navigation';

interface BottomNavigationProps {
  role?: Role;
  activeTab: CitizenTab | WorkerTab;
  onTabPress: (tab: any) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}

const CITIZEN_TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { id: 'services', label: 'Services', icon: 'grid-outline', iconActive: 'grid' },
  { id: 'community', label: 'Community', icon: 'people-outline', iconActive: 'people' },
  { id: 'activity', label: 'Activity', icon: 'receipt-outline', iconActive: 'receipt' },
  { id: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

const WORKER_TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { id: 'jobs', label: 'Jobs', icon: 'briefcase-outline', iconActive: 'briefcase' },
  { id: 'track', label: 'Track', icon: 'navigate-outline', iconActive: 'navigate' },
  { id: 'earnings', label: 'Earnings', icon: 'cash-outline', iconActive: 'cash' },
  { id: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  role = 'citizen',
  activeTab,
  onTabPress,
}) => {
  const tabs = role === 'citizen' ? CITIZEN_TABS : WORKER_TABS;

  return (
    <View style={[styles.container, Shadows.card]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => onTabPress(tab.id)}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color={isActive ? Colors.primary : Colors.textTertiary}
              />
            </View>
            <Text style={[styles.label, isActive ? styles.activeLabel : styles.inactiveLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.sm,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Spacing.xs,
  },
  iconContainer: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  activeIconContainer: {
    backgroundColor: '#E5F5EE',
  },
  label: {
    fontSize: FontSize.xs - 1,
    marginTop: 2,
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  inactiveLabel: {
    color: Colors.textTertiary,
    fontWeight: FontWeight.medium,
  },
});

export default BottomNavigation;
