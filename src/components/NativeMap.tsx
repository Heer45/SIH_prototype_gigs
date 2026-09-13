import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontSize, FontWeight } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';

interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
  type?: 'issue' | 'worker' | 'citizen';
}

interface NativeMapProps {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  markers?: MarkerData[];
  onMarkerPress?: (marker: MarkerData) => void;
  style?: ViewStyle;
}

let MapViewComponent: any = null;
let MarkerComponent: any = null;

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapViewComponent = Maps.default || Maps;
    MarkerComponent = Maps.Marker;
  } catch {
    MapViewComponent = null;
  }
}

export const NativeMap: React.FC<NativeMapProps> = ({
  latitude,
  longitude,
  latitudeDelta = 0.015,
  longitudeDelta = 0.015,
  markers = [],
  onMarkerPress,
  style,
}) => {
  if (Platform.OS !== 'web' && MapViewComponent) {
    return (
      <View style={[styles.container, style]}>
        <MapViewComponent
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          {MarkerComponent &&
            markers.map((m) => (
              <MarkerComponent
                key={m.id}
                coordinate={{ latitude: m.latitude, longitude: m.longitude }}
                title={m.title}
                description={m.description}
                onPress={() => onMarkerPress && onMarkerPress(m)}
              />
            ))}
        </MapViewComponent>
      </View>
    );
  }

  // Cross-platform Web/Fallback Interactive Map Visualizer
  return (
    <View style={[styles.container, styles.fallbackContainer, style]}>
      {/* Mock Map Grid lines */}
      <View style={styles.gridOverlay}>
        <View style={styles.roadH1} />
        <View style={styles.roadH2} />
        <View style={styles.roadV1} />
        <View style={styles.roadV2} />
      </View>

      {/* Markers */}
      {markers.map((m, idx) => {
        const topPercent = 25 + (idx * 28) % 60;
        const leftPercent = 20 + (idx * 33) % 65;
        const iconName =
          m.type === 'worker' ? 'person-circle' : m.type === 'issue' ? 'alert-circle' : 'location';
        const iconColor =
          m.type === 'worker' ? '#0891B2' : m.type === 'issue' ? Colors.error : Colors.primary;

        return (
          <TouchableOpacity
            key={m.id}
            activeOpacity={0.8}
            onPress={() => onMarkerPress && onMarkerPress(m)}
            style={[
              styles.markerWrapper,
              {
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
              },
            ]}
          >
            <View style={[styles.markerPin, { backgroundColor: iconColor }]}>
              <Ionicons name={iconName} size={16} color="#FFFFFF" />
            </View>
            <View style={styles.markerCallout}>
              <Text style={styles.markerText} numberOfLines={1}>
                {m.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Center Radar / GPS Indicator */}
      <View style={styles.gpsCenter}>
        <View style={styles.gpsPulse} />
        <View style={styles.gpsDot} />
      </View>

      {/* Map watermark badge */}
      <View style={styles.mapBadge}>
        <Ionicons name="map" size={12} color={Colors.primaryDark} />
        <Text style={styles.mapBadgeText}>GPS Active: {latitude.toFixed(4)}, {longitude.toFixed(4)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: BorderRadius.xl,
    backgroundColor: '#E4EDE5',
    position: 'relative',
    height: 180,
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
  },
  roadH1: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#D2E2D4',
  },
  roadH2: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#D2E2D4',
  },
  roadV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '30%',
    width: 14,
    backgroundColor: '#D2E2D4',
  },
  roadV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '75%',
    width: 12,
    backgroundColor: '#D2E2D4',
  },
  gpsCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsPulse: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(47, 111, 87, 0.25)',
  },
  gpsDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerPin: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  markerCallout: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  markerText: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  mapBadge: {
    position: 'absolute',
    bottom: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mapBadgeText: {
    fontSize: 9,
    fontWeight: FontWeight.semiBold,
    color: Colors.textSecondary,
  },
});

export default NativeMap;
