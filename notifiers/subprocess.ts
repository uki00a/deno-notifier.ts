import type { Notification, Notifier } from "./notifier.ts";
import { normalizeNotification } from "./util.ts";
import { readAll } from "../deps.ts";

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
    const process = Deno.run({
      cmd,
      stderr: "piped",
    });
    try {
      const status = await process.status();
      if (!status.success) {
        const output = await readAll(process.stderr);
        const decoder = new TextDecoder();
        throw new Error(decoder.decode(output));
      }
    } finally {
      process.stderr.close();
      process.close();
    }
  }

  abstract buildCmd(notification: Notification): string[];
}
