/**
 * Community-related types for NagrikSetu.
 */

/** Category for community issue reports */
export type IssueCategory = 'Garbage' | 'Dirty Road' | 'Overflowing Bin' | 'Debris' | 'Other';

/** An activity feed item */
export interface ActivityFeedItem {
  id: string;
  icon: string;
  bgColor: string;
  title: string;
  subtitle: string;
  pill: string;
  pillColor: string;
}

/** Community impact statistics */
export interface CommunityStats {
  issuesSolved: number;
  workersActive: number;
  areasImproved: number;
}
