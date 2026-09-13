/**
 * Worker-related types for NagrikSetu.
 */

/** A cooperative worker profile */
export interface Worker {
  id: string;
  name: string;
  skill: string;
  rating: number;
  reviews: number;
  distance: string;
  experience: string;
  availability: string;
  /** AI match score (0–100) */
  score: number;
  jobs: number;
  imageUrl: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
}
