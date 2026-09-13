import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  variant?: 'primary' | 'light';
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightElement,
  variant = 'light',
  style,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const isPrimary = variant === 'primary';

  return (
    <View
      style={[
        styles.header,
        isPrimary ? styles.headerPrimary : styles.headerLight,
        !isPrimary && Shadows.card,
        style,
      ]}
    >
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={[styles.backButton, isPrimary ? styles.backButtonPrimary : styles.backButtonLight]}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={isPrimary ? Colors.white : Colors.textPrimary}
            />
          </TouchableOpacity>
        ) : null}
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, isPrimary ? styles.titlePrimary : styles.titleLight]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[styles.subtitle, isPrimary ? styles.subtitlePrimary : styles.subtitleLight]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {rightElement ? <View style={styles.rightContainer}>{rightElement}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  headerLight: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerPrimary: {
    backgroundColor: Colors.primaryDark,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  backButtonLight: {
    backgroundColor: Colors.background,
  },
  backButtonPrimary: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  titleLight: {
    color: Colors.textPrimary,
  },
  titlePrimary: {
    color: Colors.white,
  },
  subtitle: {
    fontSize: FontSize.xs,
    marginTop: 1,
  },
  subtitleLight: {
    color: Colors.textSecondary,
  },
  subtitlePrimary: {
    color: 'rgba(255,255,255,0.8)',
  },
  rightContainer: {
    marginLeft: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
