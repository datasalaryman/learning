import { Redis } from "@upstash/redis";
import { env } from "./env"

console.log("Hello redis-channel, via Bun!");

const redis = new Redis({
  url: env.UPSTASH_URL,
  token: env.UPSTASH_TOKEN,
});


redis.publish("events", "hello");
// string
// await redis.set('key', '45', {
//   ex: 60
// });

// let data = await redis.get('key');

// console.log(data)
