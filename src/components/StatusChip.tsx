import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';

interface StatusChipProps {
  label: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  label,
  icon,
  backgroundColor = '#E5F5EE',
  textColor = '#2F6F57',
  borderColor,
  style,
  textStyle,
}) => {
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor,
          borderColor: borderColor || 'transparent',
          borderWidth: borderColor ? 1 : 0,
        },
        style,
      ]}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.label, { color: textColor }, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: Spacing.xs,
    fontSize: FontSize.xs,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
  },
});

export default StatusChip;
