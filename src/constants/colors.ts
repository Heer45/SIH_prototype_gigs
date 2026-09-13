/**
 * NagrikSetu Design System — Color Palette
 *
 * These colors are extracted directly from the existing prototype.
 * Do NOT change these values — they define the app's visual identity.
 */

export const Colors = {
  // ── Brand Colors ──────────────────────────────────────────
  /** Primary green — buttons, active nav, success actions, logo */
  primary: '#2F6F57',
  /** Darker shade of primary — used in gradients */
  primaryDark: '#1d4d3d',
  /** Darkest shade — gradient endpoints */
  primaryDarkest: '#152e25',
  /** Secondary sage green — service cards, highlights, worker sections */
  secondary: '#8BBF9F',

  // ── Backgrounds ───────────────────────────────────────────
  /** Main app background */
  background: '#F4F7F2',
  /** Worker card backgrounds — soft blue-green tint */
  workerCard: '#EAF3F5',
  /** Community card backgrounds — warm beige */
  communityCard: '#F6EFE3',
  /** AI card backgrounds — soft blue */
  aiCard: '#E8F1FA',
  /** Payment card backgrounds — soft mint */
  paymentCard: '#E5F5EE',
  /** Emergency backgrounds — soft red */
  emergency: '#FCEAEA',

  // ── Text ──────────────────────────────────────────────────
  /** Primary text color */
  textPrimary: '#1F2937',
  /** Secondary/muted text color */
  textSecondary: '#667085',
  /** Tertiary/disabled text color */
  textTertiary: '#9CA3AF',

  // ── UI Elements ───────────────────────────────────────────
  /** Borders and dividers */
  border: '#E5EAE1',
  /** Card background */
  white: '#FFFFFF',
  /** Warning/accent orange — civic score, community badges */
  orange: '#D97706',
  /** Orange highlight backgrounds */
  orangeLight: '#FEF3C7',
  /** Worker badge blue */
  cyan: '#0891B2',
  /** Purple badge */
  purple: '#7C3AED',
  /** Purple light background */
  purpleLight: '#EDE9FE',
  /** Blue for AI elements */
  blue: '#1E40AF',
  /** Blue light border */
  blueLight: '#93C5FD',
  /** Star/rating color */
  star: '#FFB300',
  /** Error/danger red */
  error: '#EF4444',
  /** Hard hat yellow */
  yellow: '#FFC107',
} as const;

// Type for accessing color values
export type ColorKey = keyof typeof Colors;
