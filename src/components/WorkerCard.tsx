import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Worker } from '@/types/worker';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import StatusChip from './StatusChip';

interface WorkerCardProps {
  worker: Worker;
  onPress: () => void;
  onSelect?: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onPress,
  onSelect,
  selected = false,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        Shadows.card,
        selected && styles.selectedCard,
        style,
      ]}
    >
      <View style={styles.headerRow}>
        <Image source={{ uri: worker.imageUrl }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {worker.name}
            </Text>
            {worker.badge ? (
              <StatusChip
                label={worker.badge}
                backgroundColor={worker.badgeBg || '#FEF3C7'}
                textColor={worker.badgeColor || '#D97706'}
              />
            ) : null}
          </View>
          <Text style={styles.skill}>{worker.skill}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{worker.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({worker.reviews} reviews)</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.distance}>{worker.distance}</Text>
          </View>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Experience</Text>
          <Text style={styles.metaValue}>{worker.experience}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Jobs Done</Text>
          <Text style={styles.metaValue}>{worker.jobs}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>AI Match</Text>
          <Text style={[styles.metaValue, { color: Colors.primary }]}>{worker.score}%</Text>
        </View>
      </View>

      {onSelect ? (
        <TouchableOpacity
          style={[styles.selectButton, selected && styles.selectButtonActive]}
          onPress={onSelect}
        >
          <Text style={[styles.selectButtonText, selected && styles.selectButtonTextActive]}>
            {selected ? 'Selected Worker' : 'Select Worker'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base + 4,
    marginBottom: Spacing.base + 2,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: '#FAFDF9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.border,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  name: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  skill: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  star: {
    color: Colors.star,
    fontSize: 12,
    marginRight: 2,
  },
  rating: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginRight: 4,
  },
  reviews: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  dot: {
    marginHorizontal: 4,
    color: Colors.textTertiary,
  },
  distance: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAF7',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.base,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: FontSize.xs - 1,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: FontSize.xs + 1,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
  },
  selectButton: {
    marginTop: Spacing.base,
    backgroundColor: Colors.primaryDarkest,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  selectButtonActive: {
    backgroundColor: Colors.primary,
  },
  selectButtonText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  selectButtonTextActive: {
    color: Colors.white,
  },
});

export default WorkerCard;
