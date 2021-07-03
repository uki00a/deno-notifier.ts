# deno-notifier.ts

deno-notifier.ts is a Deno module for sending desktop notifications. It is
written in pure TypeScript.

## Usage

```typescript
import { notify } from "https://deno.land/x/notifier@v0.0.1/mod.ts";

await notify("This is a title", "This is a message");
```

## Prior works

- Node.js
  - https://github.com/mikaelbr/node-notifier
- Go
  - https://github.com/0xAX/notificator
- Ruby
  - https://github.com/fnando/notifier
