import Redis from "ioredis" ;
import { env } from "./env";

console.log("Hello redis-channel, via Bun!");

const main = () => {
  const redis = new Redis({
    host: env.UPSTASH_CLIENT_URL,
    port: 6379,
    username: env.UPSTASH_USER,
    password: env.UPSTASH_TOKEN,
    tls: {}
  });

  redis.subscribe("events", (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscribed to ${count} channels.`);
  });

  redis.on("message", (channel, message) => {
    // console.log(`Received message from ${channel} channel.`);
    console.log(message);
  });
};

main();
