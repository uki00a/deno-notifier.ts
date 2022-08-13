// TODO: Add `supported` method?
export interface Notifier {
  notify(title: string, message: string): Promise<void>;
  notify(notification: Notification): Promise<void>;
}

export interface Notification {
  title: string;
  message: string;
  icon?: string;
  sound?: string;
}
