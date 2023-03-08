import type { Notification, Notifier } from "./notifier.ts";
import { normalizeNotification } from "./util.ts";

export abstract class SubprocessNotifier implements Notifier {
  notify(title: string, message: string): Promise<void>;
  notify(notification: Notification): Promise<void>;
  async notify(
    titleOrNotification: string | Notification,
    maybeMessage?: string,
  ): Promise<void> {
    const notification = normalizeNotification(
      titleOrNotification,
      maybeMessage,
    );
    const cmd = this.buildCmd(notification);
    const [executable, ...args] = cmd;
    if (executable == null) {
      throw new Error(
        "`buildCmd()` should return an array with at least one element",
      );
    }

    const status = await new Deno.Command(executable, {
      args,
      stderr: "piped",
    }).output();
    if (!status.success) {
      throw new Error(decoder.decode(process.stderr));
    }
  }

  abstract buildCmd(notification: Notification): string[];
}
