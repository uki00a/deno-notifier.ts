import { createNotificationConstructor } from "./factory.ts";
import { createNotifier } from "../mod.ts";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
 */
export const Notification = await createNotificationConstructor(
  createNotifier,
  Deno.permissions,
);
