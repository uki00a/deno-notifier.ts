import { NotifySendNotifier } from "./notify_send.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("NotifySendNotifier#buildCmd", () => {
  const notifier = new NotifySendNotifier();
  const notification = Object.freeze({
    title: "Hello",
    message: "World",
  });
  const actual = notifier.buildCmd(notification);
  const expected = ["notify-send", "Hello", "World"];
  assertEquals(actual, expected);
});
