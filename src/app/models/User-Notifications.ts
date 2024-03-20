export interface UserNotification<T = any> {
  id?: string;
  notifiable_id?: string;
  notifiable_type?: string;
  type?: UserNotificationType;
  data?: T;
  read_at?: string;
  created_at?: string;
  updated_at?: string;
}

export enum UserNotificationType {
  TerminCreated = 'App\\Notifications\\TerminCreated',
}
