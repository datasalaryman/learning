import Redis from "ioredis" ;
import { env } from "./env";

console.log("Hello redis-channel, via Bun!");

const main = () => {
  const redis = new Redis(
    `rediss://:${env.UPSTASH_TOKEN}@${env.UPSTASH_CLIENT_URL}:33483`
  );

  redis.subscribe("events-stg", (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscribed to ${count} channels.`);
  });

  redis.on("message", (channel, message) => {
    // console.log(`Received message from ${channel} channel.`);
    console.log(message);
  });

};

main();
