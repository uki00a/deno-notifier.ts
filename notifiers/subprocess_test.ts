import { assertEquals, assertRejects } from "../test_deps.ts";
import { SubprocessNotifier } from "./subprocess.ts";
import type { Notification } from "./notifier.ts";

class TestingNotifier extends SubprocessNotifier {
  buildCmd(notification: Notification): string[] {
    const payload = JSON.stringify(notification);
    return [Deno.execPath(), "eval", `throw new Error(\`${payload}\`)`];
  }
}

Deno.test({
  name: "SubprocessNotifier",
  ignore: Deno.build.os !== "linux",
  async fn() {
    const notifier = new TestingNotifier();
    const notification = {
      title: "Hello",
      message: "World",
    };
    const expectedMessage = JSON.stringify(notification);
    await assertRejects(
      () => notifier.notify(notification),
      Error,
      expectedMessage,
    );
  },
});
