/**
 * NagrikSetu Design System — Spacing & Border Radius
 *
 * Consistent spacing values used throughout the app.
 * Based on an 4px base unit for a harmonious rhythm.
 */

export const Spacing = {
  /** 4px — tiny gaps */
  xs: 4,
  /** 6px — small icon gaps */
  sm: 6,
  /** 8px — chip padding, small gaps */
  md: 8,
  /** 10px — card gaps, grid gaps */
  base: 10,
  /** 12px — button icon gaps, element spacing */
  lg: 12,
  /** 14px — section content padding */
  xl: 14,
  /** 16px — screen horizontal padding, card padding */
  xxl: 16,
  /** 18px — card inner padding */
  section: 18,
  /** 20px — section vertical gaps */
  screen: 20,
  /** 24px — form card padding, screen side padding */
  screenLg: 24,
  /** 28px — content card padding */
  screenXl: 28,
  /** 32px — major section gaps */
  major: 32,
  /** 40px — header padding top */
  header: 40,
  /** 48px — bottom section padding */
  bottom: 48,
  /** 56px — status bar + header top padding */
  statusBar: 56,
  /** 80px — splash/role screen top padding */
  heroTop: 80,
} as const;

export const BorderRadius = {
  /** 5-6px — tiny badges */
  xs: 6,
  /** 10px — filter chips, small buttons */
  sm: 10,
  /** 12px — avatars, notification icons, OTP inputs */
  md: 12,
  /** 14px — buttons, input fields */
  lg: 14,
  /** 16px — service cards, activity items */
  xl: 16,
  /** 18px — role cards, avatar containers */
  xxl: 18,
  /** 20px — cards, form containers */
  card: 20,
  /** 28px — bottom sheets, content cards */
  sheet: 28,
  /** 36px — header bottom corners */
  header: 36,
  /** 50% circle */
  full: 9999,
} as const;
