/**
 * NagrikSetu Design System — Typography
 *
 * Heading font: Nunito (Bold 700, ExtraBold 800, Black 900)
 * Body font: Inter (Regular 400, Medium 500, SemiBold 600)
 *
 * NOTE: In React Native, we use the system font as fallback.
 * Custom fonts (Nunito, Inter) will be loaded via expo-font.
 * Until fonts are loaded, the system default is used.
 */

export const FontFamily = {
  /** Heading font — used for titles, buttons, labels */
  heading: 'Nunito',
  /** Body font — used for descriptions, input text, captions */
  body: 'Inter',
} as const;

export const FontSize = {
  /** Tiny captions (9-10px) */
  xs: 10,
  /** Small labels (11-12px) */
  sm: 12,
  /** Normal body text (13-14px) */
  md: 14,
  /** Slightly larger body (15px) */
  base: 15,
  /** Input and button text (16px) */
  lg: 16,
  /** Section headings (17px) */
  xl: 17,
  /** Screen sub-headings (20px) */
  xxl: 20,
  /** Screen headings (24-26px) */
  heading: 24,
  /** Large headings (26px) */
  headingLg: 26,
  /** Hero headings (28px) */
  hero: 28,
  /** Splash title (34px) */
  splash: 34,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  black: '900' as const,
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.3,
  relaxed: 1.5,
  loose: 1.6,
} as const;
