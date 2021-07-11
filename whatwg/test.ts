import { createNotificationConstructor } from "./factory.ts";
import { createNotifier } from "../mod.ts";
import type { Notifier } from "../mod.ts";
import { assertEquals, td } from "../test_deps.ts";
import { deferred } from "../deps.ts";
import type { Deferred } from "../deps.ts";

function withTimeout(ms: number): Deferred<void> {
  const promise = deferred<void>();
  const timer = setTimeout(() => {
    promise.reject();
  }, ms);
  const { resolve: origResolve } = promise;

  function resolve(): void {
    clearTimeout(timer);
    origResolve();
  }

  promise.resolve = resolve;
  return promise;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

Deno.test("Notification.permission", async () => {
  for (
    const { given, expected } of [
      { given: "prompt", expected: "default" },
      { given: "granted", expected: "granted" },
      { given: "denied", expected: "denied" },
    ] as const
  ) {
    const permissions = td.object<Deno.Permissions>();
    td.when(permissions.query({ name: "run" })).thenResolve({
      state: given,
    });
    const Notification = await createNotificationConstructor(
      createNotifier,
      permissions,
    );
    assertEquals(Notification.permission, expected);
  }
});

Deno.test("Notification.requestPermission()", async () => {
  const permissions = td.object<Deno.Permissions>();
  const Notification = await createNotificationConstructor(
    createNotifier,
    permissions,
  );
  td.when(permissions.query({ name: "run" })).thenResolve({ state: "denied" });
  td.when(permissions.request({ name: "run" })).thenResolve({
    state: "prompt",
  });
  const permission = await Notification.requestPermission();
  assertEquals(permission, "default");
});

Deno.test("Notification.requestPermission(callback)", async () => {
  const permissions = td.object<Deno.Permissions>();
  const Notification = await createNotificationConstructor(
    createNotifier,
    permissions,
  );
  const promise = withTimeout(3000);
  td.when(permissions.query({ name: "run" })).thenResolve({ state: "granted" });
  td.when(permissions.request({ name: "run" })).thenResolve({
    state: "denied",
  });
  Notification.requestPermission((permission) => {
    assertEquals(permission, "denied");
    promise.resolve();
  });
  await promise;
});

Deno.test("Notification", async () => {
  const notifier = td.object<Notifier>();
  const permissions = td.object<Deno.Permissions>();
  const Notification = await createNotificationConstructor(
    () => notifier,
    permissions,
  );

  new Notification(
    "Hello",
    {
      body: "World",
      icon: "/path/to/icon.png",
    },
  );

  // FIXME: This is not ideal...
  await delay(50);

  td.verify(
    notifier.notify({
      title: "Hello",
      message: "World",
      icon: "/path/to/icon.png",
    }),
    { times: 1 },
  );
});
