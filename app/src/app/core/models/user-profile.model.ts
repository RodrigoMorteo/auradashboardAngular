export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string; // Optional as it might not always be present
  theme?: string; // Added this line
}