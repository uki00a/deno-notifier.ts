import { SubprocessNotifier } from "./subprocess.ts";
import type { Notification } from "./notifier.ts";

export class NotifySendNotifier extends SubprocessNotifier {
  buildCmd(notification: Notification): string[] {
    const { title, message } = notification;
    return ["notify-send", title, message];
  }
}
