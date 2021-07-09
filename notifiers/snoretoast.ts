import { SubprocessNotifier } from "./subprocess.ts";
import type { Notification } from "./notifier.ts";

export interface SnoretoastNotifierOptions {
  executable?: string;
}

const defaultExecutable = "snoretoast.exe";

/**
 * @see https://github.com/KDE/snoretoast
 */
export class SnoretoastNotifier extends SubprocessNotifier {
  #executable: string;
  constructor(
    options: SnoretoastNotifierOptions = { executable: defaultExecutable },
  ) {
    super();
    const { executable } = options;
    this.#executable = executable ?? defaultExecutable;
  }

  buildCmd(notification: Notification): string[] {
    const { title, message, icon } = notification;
    const cmd = [this.#executable, "-t", title, "-m", message];
    if (icon) {
      cmd.push("-p", icon);
    }
    return cmd;
  }
}
