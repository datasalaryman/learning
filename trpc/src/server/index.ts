import { db } from './db.ts'
import { publicProcedure, router } from "./trpc.ts";
import { z } from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone'

const appRouter = router({
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = await db.user.findMany();

    console.log("userList procedure called")

    return users;
  }),
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
        const { input } = opts;

        const user = await db.user.findById(input);

        console.log("userById procedure called");

        return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
        const { input } = opts;

        const user = await db.user.create(input);

        console.log("userCreate procedure called");

        return user;
    })
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
})

server.listen(3000)