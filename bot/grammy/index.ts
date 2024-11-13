import { Bot } from "grammy";
import { env } from "./env";
import { WebSocket } from "ws";

type MessageResponse = {
  id: number | string;
  jsonrpc?: "2.0";
  result:
    | {
        type: "data";
        data: string; // subscription emitted data
      }
    | {
        type: "started"; // subscription started
      }
    | {
        type: "stopped"; // subscription stopped
    }
  }

export type JsonData = {
    accountData: AccountData[];
    description: string;
    events: {
        swap: Event;
    };
    fee: number;
    feePayer: string;
    instructions: Instruction[];
    nativeTransfers: any[];
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    tokenTransfers: any[];
    transactionError: any | null;
    type: string;
};

// Create a bot object
const bot = new Bot(env.TG_BOT_KEY); // <-- place your bot token in this string

// connect to wss
const ws = new WebSocket(
  "ws://localhost:3001" // for local testing
);

let users: string[] = []

ws.on("open", () => {
  ws.send(
    JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "subscription",
      params: {
        path: "custom_enhanced", // change this to change websocket channel
        input: {
          address: env.USER_PDA.toString()
        },
        // test arrays
        // input: {
        //   address: ["whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"],
        // },
      },
    })
  );

  ws.on("message", async (data: string) => {
    const parsedData: MessageResponse = JSON.parse(data);
    if (parsedData.result.type === "started") {
      console.log("Successfully subscribed to events");
    }
    if (parsedData.result.type === "stopped") {
      console.log("Successfully unsubscribed to events");
    }
    if (parsedData.result.type === "data") {
      console.log(JSON.parse(parsedData.result.data)); //do what you want here

      const rawMessage = JSON.parse(parsedData.result.data);

      users.map(async (user) => {
        const message: JsonData = rawMessage['0'];
        await bot.api.sendMessage(user, `New transaction on your hawksight position - https://solscan.io/tx/${message.signature}`);
      })
    }
  });
});


// Register listeners to handle messages
// bot.on(
//   "message:text", 
//   (ctx) => {
//     console.log(`Received message from user: ${ctx.from.id} - \"${ctx.message.text}\"`)
//     ctx.reply("Echo: " + ctx.message.text)
//   });

bot.command(
  "subscribe", 
  async (ctx) => {
    console.log(`Received message from user: ${ctx.from.id} - \"${ctx.message.text}\"`)
    users.push(ctx.from.id)
  }
);

// Start the bot (using long polling)
bot.start();