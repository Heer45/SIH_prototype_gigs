/**
 * Service-related types for NagrikSetu.
 */

/** A service category (e.g., Plumbing, Electrical) */
export interface ServiceCategory {
  id: string;
  icon: string;
  label: string;
  color: string;
  requests: string;
}

/** Service urgency level */
export type Urgency = 'Normal' | 'Urgent' | 'Emergency';
