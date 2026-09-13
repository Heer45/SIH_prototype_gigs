/**
 * Mock data — Community stats and activity feed.
 * Extracted from CitizenHomeScreen prototype.
 */
import { ActivityFeedItem, CommunityStats } from '@/types/community';

export const communityStats: CommunityStats = {
  issuesSolved: 47,
  workersActive: 23,
  areasImproved: 8,
};

export const activityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    icon: '✅',
    bgColor: '#E5F5EE',
    title: 'Garbage Cleanup Completed',
    subtitle: 'Sector 12 Market · 2 hrs ago',
    pill: 'Community',
    pillColor: '#2F6F57',
  },
  {
    id: '2',
    icon: '⭐',
    bgColor: '#F6EFE3',
    title: 'Rajesh Kumar rated 5 stars',
    subtitle: 'Electrical repair · Yesterday',
    pill: 'Service',
    pillColor: '#D97706',
  },
  {
    id: '3',
    icon: '📍',
    bgColor: '#EAF3F5',
    title: 'New worker joined near you',
    subtitle: 'Priya Sharma — Cleaning Expert',
    pill: 'Worker',
    pillColor: '#0891B2',
  },
];
