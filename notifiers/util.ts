import type { Notification } from "./notifier.ts";

export function normalizeNotification(
  titleOrNotification: string | Notification,
  maybeMessage?: string,
): Notification {
  return typeof titleOrNotification === "string"
    ? { title: titleOrNotification, message: maybeMessage as string }
    : titleOrNotification;
}

export function escapeDoubleQuotes(s: string): string {
  return s.replaceAll('"', '\\"');
}
