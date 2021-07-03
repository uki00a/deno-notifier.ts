import { OsascriptNotifier } from "./osascript.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("OsascriptNotifier#buildCmd", () => {
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
