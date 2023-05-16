import { parse } from "./cli_deps.ts";
import { notify } from "./mod.ts";

async function main(args: Array<string>) {
  const parsed = parse(args, {
    string: ["title"],
  });
  const message = parsed._.join(" ");
  const title = parsed.title || message;
  await notify({
    message,
    title,
  });
}

if (import.meta.main) {
  main(Deno.args).catch((error) => {
    console.error(error);
    Deno.exit(1);
  });
}
