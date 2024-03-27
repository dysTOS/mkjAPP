export interface UserNotification<T = any> {
  id?: string;
  notifiable_id?: string;
  notifiable_type?: string;
  type?: UserNotificationType;
  data?: T;
  read_at?: string;
  created_at?: string;
  updated_at?: string;
  command?: () => void;
}

export enum UserNotificationType {
  TerminCreated = 'App\\Notifications\\TerminCreatedNotification',
  TerminUpdated = 'App\\Notifications\\TerminUpdatedNotification',
  TestSocket = 'App\\Notifications\\TestSocket',
  SwUpdate = 'SwUpdate',
}
