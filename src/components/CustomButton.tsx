import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'emergency';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  iconRight,
  style,
  textStyle,
}) => {
  const getButtonStyles = (): ViewStyle[] => {
    const stylesList: ViewStyle[] = [styles.base];

    // Size
    if (size === 'sm') stylesList.push(styles.sizeSm);
    else if (size === 'md') stylesList.push(styles.sizeMd);
    else stylesList.push(styles.sizeLg);

    // Variant
    switch (variant) {
      case 'primary':
        stylesList.push(styles.primary);
        if (!disabled) stylesList.push(Shadows.button);
        break;
      case 'secondary':
        stylesList.push(styles.secondary);
        break;
      case 'outline':
        stylesList.push(styles.outline);
        break;
      case 'ghost':
        stylesList.push(styles.ghost);
        break;
      case 'emergency':
        stylesList.push(styles.emergency);
        break;
    }

    if (disabled) {
      stylesList.push(styles.disabled);
    }

    if (style) {
      stylesList.push(style);
    }

    return stylesList;
  };

  const getTextStyles = (): TextStyle[] => {
    const textStylesList: TextStyle[] = [styles.baseText];

    if (size === 'sm') textStylesList.push(styles.textSm);
    else if (size === 'md') textStylesList.push(styles.textMd);
    else textStylesList.push(styles.textLg);

    switch (variant) {
      case 'primary':
      case 'emergency':
        textStylesList.push(styles.textWhite);
        break;
      case 'secondary':
        textStylesList.push(styles.textSecondary);
        break;
      case 'outline':
        textStylesList.push(styles.textOutline);
        break;
      case 'ghost':
        textStylesList.push(styles.textGhost);
        break;
    }

    if (disabled) {
      textStylesList.push(styles.textDisabled);
    }

    if (textStyle) {
      textStylesList.push(textStyle);
    }

    return textStylesList;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyles()}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'emergency' ? '#FFFFFF' : Colors.primary}
          size="small"
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={getTextStyles()}>{title}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeSm: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  sizeMd: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xxl,
  },
  sizeLg: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.screenLg,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  emergency: {
    backgroundColor: Colors.error,
  },
  disabled: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  baseText: {
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
  textSm: {
    fontSize: FontSize.sm,
  },
  textMd: {
    fontSize: FontSize.md,
  },
  textLg: {
    fontSize: FontSize.lg,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: Colors.primaryDarkest,
  },
  textOutline: {
    color: Colors.primary,
  },
  textGhost: {
    color: Colors.primary,
  },
  textDisabled: {
    color: Colors.textTertiary,
  },
  iconLeft: {
    marginRight: Spacing.md,
  },
  iconRight: {
    marginLeft: Spacing.md,
  },
});

export default CustomButton;
