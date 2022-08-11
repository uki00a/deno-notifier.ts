import { SubprocessNotifier } from "./subprocess.ts";
import type { Notification } from "./notifier.ts";

export class NotifySendNotifier extends SubprocessNotifier {
  buildCmd(notification: Notification): string[] {
    const { title, message, icon, sound } = notification;
    const cmd = ["notify-send", title, message];
    if (icon) {
      cmd.push("--icon", icon);
    }
    if (sound) {
      cmd.push(`--hint=string:sound-name:${sound}`);
    }
    return cmd;
  }
}
