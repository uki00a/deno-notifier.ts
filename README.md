# deno-notifier.ts

[![Build Status](https://github.com/uki00a/deno-notifier.ts/workflows/ci/badge.svg)](https://github.com/uki00a/deno-notifier.ts/actions)
![https://img.shields.io/github/tag/uki00a/deno-notifier.ts.svg](https://img.shields.io/github/tag/uki00a/deno-notifier.ts.svg)
[![license](https://img.shields.io/github/license/uki00a/deno-notifier.ts)](https://github.com/uki00a/deno-notifier.ts)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/notifier/mod.ts)

deno-notifier.ts is a Deno module for sending desktop notifications. It is
written in pure TypeScript.

> **This module is still highly experimental! In particular, it has not been
> fully tested on Windows and Mac OS.**

## Usage

```ts
import { notify } from "https://deno.land/x/notifier/mod.ts";

await notify("This is a title", "This is a message");
```

This module also provides API inspired by
[WHATWG's Notifications API](https://notifications.spec.whatwg.org/) (**WIP**).

```ts
import { Notification } from "https://deno.land/x/notifier/whatwg/mod.ts";

new Notification("Hello", {
  body: "World",
  icon: "/path/to/icon.png",
  sound: "device-added" // only support Linux and macOS
});
```

## Requirements

### Linux

You'll need to install one of the following:

- `notify-send`

### Mac OS X

You'll need to install one of the following:

- `osascript`

### Windows

You'll need to install one of the following:

- [Snoretoast](https://github.com/KDE/snoretoast)

## Prior works

- Node.js
  - https://github.com/mikaelbr/node-notifier
- Go
  - https://github.com/0xAX/notificator
- Ruby
  - https://github.com/fnando/notifier
