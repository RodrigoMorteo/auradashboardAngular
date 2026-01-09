export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  theme?: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingFrequency: 'Daily' | 'Weekly' | 'Monthly';
}
