import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { ServiceCategory } from '@/types/service';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';

interface ServiceCardProps {
  service: ServiceCategory;
  onPress: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  selected = false,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: service.color || Colors.white },
        selected && styles.selectedCard,
        Shadows.card,
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{service.icon}</Text>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {service.label}
      </Text>
      {service.requests ? (
        <Text style={styles.requests} numberOfLines={1}>
          {service.requests}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 78,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: '#E5F5EE',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  requests: {
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default ServiceCard;
