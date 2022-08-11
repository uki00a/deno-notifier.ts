import { SubprocessNotifier } from "./subprocess.ts";
import { escapeDoubleQuotes } from "./util.ts";
import type { Notification } from "./notifier.ts";

export class OsascriptNotifier extends SubprocessNotifier {
  buildCmd(notification: Notification): string[] {
    const message = escapeDoubleQuotes(notification.message);
    const title = escapeDoubleQuotes(notification.title);
    let script = `display notification "${message}" with title "${title}"`;
    if (notification.sound) {
      const sound = escapeDoubleQuotes(notification.sound);
      script += ` sound name "${sound}"`;
    }
    return [
      "osascript",
      "-e",
      script,
    ];
  }
}
