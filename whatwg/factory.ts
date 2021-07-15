import type { Notifier } from "../mod.ts";
import { deferred } from "../deps.ts";
import type { Deferred } from "../deps.ts";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification
 * @see https://notifications.spec.whatwg.org/
 */
export interface NotificationConstructor {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
   */
  new (title: string, options?: NotificationOptions): Notification;
  readonly permission: Permission;
  requestPermission(): Promise<Permission>;
  requestPermission(callback: (permission: Permission) => unknown): void;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
 */
export interface NotificationOptions {
  body?: string;
  icon?: string;
}

export interface Notification extends EventTarget {
  readonly title: string;
  readonly body: string;
  readonly icon?: string;
}

type Permission =
  | "denied"
  | "granted"
  | "default";

function fromDenoPermission({ state }: Deno.PermissionStatus): Permission {
  switch (state) {
    case "granted":
    case "denied":
      return state;
    case "prompt":
      return "default";
  }
}

export async function createNotificationConstructor(
  createNotifier: () => Notifier,
  permissions: Deno.Permissions,
): Promise<NotificationConstructor> {
  const denoPermission = await permissions.query({
    name: "run",
  });

  /**
   * The implementation is based on https://notifications.spec.whatwg.org
   */
  class Notification extends EventTarget {
    readonly #title: string;
    readonly #body: string;
    readonly #icon?: string;

    readonly #done: Deferred<void>;

    constructor(
      title: string,
      options?: NotificationOptions,
    ) {
      super();

      // 7. Set notification’s title to title.
      this.#title = title;

      // 11. Set notification’s body to options["body"].
      this.#body = options?.body ?? "";

      // 15. If options["icon"] exists, then parse it using baseURL, and if that does not return failure, set notification’s icon URL to the return value. (Otherwise icon URL is not set.)
      if (options?.icon) {
        this.#icon = options.icon;
      }

      // 2.6. Showing a notification
      //   2. Display notification on the device (e.g., by calling the appropriate notification platform API).
      const done = deferred<void>();
      this.#done = done;
      (async () => {
        const notifier = createNotifier();
        try {
          await notifier.notify({
            title: this.title,
            message: this.body,
            icon: this.icon,
          });
          done.resolve();
        } catch (err) {
          done.reject(err);
        }
      })();
    }

    get title(): string {
      return this.#title;
    }

    get body(): string {
      return this.#body;
    }

    get icon(): string | undefined {
      return this.#icon;
    }

    static requestPermission(): Promise<Permission>;
    static requestPermission(
      callback: (permission: Permission) => unknown,
    ): void;
    static requestPermission(
      callback?: (permission: Permission) => unknown,
    ): Promise<void> | unknown {
      const promise = permissions.request({ name: "run" });
      if (callback) {
        promise.then((status) => callback(fromDenoPermission(status)));
      } else {
        return promise.then(fromDenoPermission);
      }
    }

    static get permission(): Permission {
      return fromDenoPermission(denoPermission);
    }
  }

  return Notification;
}
