import { OsascriptNotifier } from "./osascript.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("OsascriptNotifier#buildCmd", async (t) => {
  await t.step("basic", () => {
    const notifier = new OsascriptNotifier();
    const notification = Object.freeze({
      title: "Hello",
      message: "World",
    });
    const actual = notifier.buildCmd(notification);
    const expected = [
      "osascript",
      "-e",
      'display notification "World" with title "Hello"',
    ];
    assertEquals(actual, expected);
  });

  await t.step("with sound", () => {
    const notifier = new OsascriptNotifier();
    const notification = Object.freeze({
      title: "Hello",
      message: "World",
      sound: "Submarine",
    });
    const actual = notifier.buildCmd(notification);
    const expected = [
      "osascript",
      "-e",
      'display notification "World" with title "Hello" sound name "Submarine"',
    ];
    assertEquals(actual, expected);
  });
});
