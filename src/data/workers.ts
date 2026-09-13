/**
 * Mock data — Workers.
 * Extracted from WorkerMatchScreen prototype.
 */
import { Worker } from '@/types/worker';

export const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    skill: 'Certified Electrician',
    rating: 4.9,
    reviews: 214,
    distance: '1.2 km',
    experience: '8 yrs',
    availability: 'Available now',
    score: 92,
    jobs: 247,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    badge: 'Top Rated',
    badgeColor: '#D97706',
    badgeBg: '#FEF3C7',
  },
  {
    id: '2',
    name: 'Suresh Mehta',
    skill: 'Senior Electrician',
    rating: 4.7,
    reviews: 89,
    distance: '2.4 km',
    experience: '5 yrs',
    availability: 'Free at 2 PM',
    score: 84,
    jobs: 132,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    badge: 'Verified',
    badgeColor: '#2F6F57',
    badgeBg: '#E5F5EE',
  },
  {
    id: '3',
    name: 'Arun Sharma',
    skill: 'Electrician',
    rating: 4.6,
    reviews: 54,
    distance: '3.1 km',
    experience: '3 yrs',
    availability: 'Available now',
    score: 78,
    jobs: 78,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
    badge: 'New',
    badgeColor: '#7C3AED',
    badgeBg: '#EDE9FE',
  },
];
