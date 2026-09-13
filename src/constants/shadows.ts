import { Platform, ViewStyle } from 'react-native';

/** Creates a cross-platform shadow style */
function createShadow(
  elevation: number,
  shadowColor: string = '#000000',
  opacity: number = 0.06,
): ViewStyle {
  if (Platform.OS === 'android') {
    return { elevation };
  }
  // iOS shadow
  return {
    shadowColor,
    shadowOffset: { width: 0, height: elevation / 2 },
    shadowOpacity: opacity,
    shadowRadius: elevation * 1.5,
  };
}

export const Shadows = {
  /** Very subtle — activity feed items, list items */
  xs: createShadow(1),
  /** Light shadow — cards, form containers */
  sm: createShadow(3),
  /** Medium shadow — elevated cards, worker cards */
  md: createShadow(6),
  /** Strong shadow — buttons, splash CTA */
  lg: createShadow(10, '#000000', 0.12),
  /** Header shadow */
  header: createShadow(4, '#000000', 0.06),
  /** AI Best Match card highlight */
  highlight: createShadow(8, '#2F6F57', 0.15),
  /** Common card shadow */
  card: createShadow(3, '#000000', 0.06),
  /** Common button shadow */
  button: createShadow(6, '#2F6F57', 0.2),
} as const;
