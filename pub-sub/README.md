# pubsub

## Prerequisites

Install bun.sh 

## Dependencies

```bash
bun install
```

# Usage

Open two terminals. Turn on the subscriber in one:
```bash
bun sub
```

and to publish the `hello` message, turn on the publisher in the other:
```bash
bun pub
```

You should see the following in your `bun sub` terminal after running `bun pub` three times:

```
$ tsx sub/index.ts
Hello redis-channel, via Bun!
Subscribed to 1 channels.
hello
hello
hello
```