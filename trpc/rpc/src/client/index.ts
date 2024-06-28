import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const createdUser = await trpc.userCreate.mutate({ name: "help" });
console.log(createdUser)
const user1 = await trpc.userById.query("1");
console.log(user1)

const user2 = await trpc.userById.query("2");
console.log(user2);
