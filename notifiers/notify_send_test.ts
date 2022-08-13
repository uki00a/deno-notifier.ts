import { NotifySendNotifier } from "./notify_send.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("NotifySendNotifier#buildCmd", () => {
  const notifier = new NotifySendNotifier();
  for (
    const {
      notification,
      expected,
    } of [
      {
        notification: {
          title: "Hello",
          message: "World",
        },
        expected: ["notify-send", "Hello", "World"],
      },
      {
        notification: {
          title: "Hello",
          message: "World",
          icon: "/path/to/icon.png",
        },
        expected: [
          "notify-send",
          "Hello",
          "World",
          "--icon",
          "/path/to/icon.png",
        ],
      },
      {
        notification: {
          title: "Hello",
          message: "World",
          icon: "/path/to/icon.png",
          sound: "device-added",
        },
        expected: [
          "notify-send",
          "Hello",
          "World",
          "--icon",
          "/path/to/icon.png",
          "--hint=string:sound-name:device-added",
        ],
      },
    ]
  ) {
    const actual = notifier.buildCmd(Object.freeze(notification));
    assertEquals(actual, expected);
  }
});
