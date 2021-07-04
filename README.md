# deno-notifier.ts

[![Build Status](https://github.com/uki00a/deno-notifier.ts/workflows/ci/badge.svg)](https://github.com/uki00a/deno-notifier.ts/actions)
![https://img.shields.io/github/tag/uki00a/deno-notifier.ts.svg](https://img.shields.io/github/tag/uki00a/deno-notifier.ts.svg)
[![license](https://img.shields.io/github/license/uki00a/deno-notifier.ts)](https://github.com/uki00a/deno-notifier.ts)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/notifier/mod.ts)

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
