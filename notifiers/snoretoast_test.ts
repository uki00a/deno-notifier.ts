import { SnoretoastNotifier } from "./snoretoast.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("SnoretoastNotifier#buildCmd", () => {
  const notifier = new SnoretoastNotifier();
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
        expected: ["snoretoast.exe", "-t", "Hello", "-m", "World"],
      },
      {
        notification: {
          title: "Hello",
          message: "World",
          icon: "/path/to/icon.png",
        },
        expected: [
          "snoretoast.exe",
          "-t",
          "Hello",
          "-m",
          "World",
          "-p",
          "/path/to/icon.png",
        ],
      },
    ]
  ) {
    const actual = notifier.buildCmd(Object.freeze(notification));
    assertEquals(actual, expected);
  }
});
