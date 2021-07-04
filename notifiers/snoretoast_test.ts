import { SnoretoastNotifier } from "./snoretoast.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("SnoretoastNotifier#buildCmd", () => {
  const notifier = new SnoretoastNotifier();
  const notification = Object.freeze({
    title: "Hello",
    message: "World",
  });
  const actual = notifier.buildCmd(notification);
  const expected = ["snoretoast.exe", "-t", "Hello", "-m", "World"];
  assertEquals(actual, expected);
});
