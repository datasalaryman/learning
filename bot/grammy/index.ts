import { Bot } from "grammy";
import { env } from "./env";

// Create a bot object
const bot = new Bot(env.TG_BOT_KEY); // <-- place your bot token in this string

// Register listeners to handle messages
bot.on(
  "message:text", 
  (ctx) => {
    console.log(`Received message from user: ${ctx.from.id} - \"${ctx.message.text}\"`)
    ctx.reply("Echo: " + ctx.message.text)
  });

// Start the bot (using long polling)
bot.start();