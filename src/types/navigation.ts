/**
 * Navigation-related types for NagrikSetu.
 *
 * These define the user roles and tab structures
 * used throughout the app for navigation decisions.
 */

/** User role — determines which dashboard/tabs to show */
export type Role = 'citizen' | 'worker';

/** Bottom tabs for citizen mode */
export type CitizenTab = 'home' | 'services' | 'community' | 'activity' | 'profile';

/** Bottom tabs for worker mode */
export type WorkerTab = 'home' | 'jobs' | 'track' | 'earnings' | 'profile';
