/**
 * Mock data — Service categories.
 * Extracted from CitizenHomeScreen prototype.
 */
import { ServiceCategory } from '@/types/service';
import { Colors } from '@/constants/colors';

export const serviceCategories: ServiceCategory[] = [
  { id: '1', icon: '🔧', label: 'Plumbing', color: Colors.paymentCard, requests: '24 nearby' },
  { id: '2', icon: '⚡', label: 'Electrical', color: Colors.aiCard, requests: '18 nearby' },
  { id: '3', icon: '🧹', label: 'Cleaning', color: Colors.communityCard, requests: '31 nearby' },
  { id: '4', icon: '🪵', label: 'Carpenter', color: Colors.workerCard, requests: '9 nearby' },
  { id: '5', icon: '🎨', label: 'Painting', color: Colors.aiCard, requests: '12 nearby' },
  { id: '6', icon: '🌿', label: 'Gardening', color: Colors.paymentCard, requests: '7 nearby' },
  { id: '7', icon: '🚨', label: 'Emergency', color: Colors.emergency, requests: 'Priority' },
];
