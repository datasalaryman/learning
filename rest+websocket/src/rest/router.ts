import { EventEmitter } from "events";
import { TRPCError, initTRPC } from "@trpc/server";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { OpenApiMeta } from "trpc-openapi";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

export type Context = {
  req: FastifyRequest;
  res: FastifyReply;
  // authorized: boolean;
};

const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (
        error.code === "INTERNAL_SERVER_ERROR" &&
        process.env.NODE_ENV === "production"
      ) {
        return { ...shape, message: "Internal server error" };
      }
      return shape;
    },
  });

export const createContext = async ({
  req,
  res,
}: // eslint-disable-next-line @typescript-eslint/require-await
CreateFastifyContextOptions): Promise<Context> => {
  return { req, res };
};


const restRouter = t.router({
  webhook: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/webhook",
        tags: ["event"],
        summary: "Push an event to webhook listeners",
        // protect: true,
        description:
          "This service pushes a JSON RPC event to the listeners of the webhook server",
      },
    })
    .input(z.object({
      id: z.string()
    }))
    .output(z.object({
      id: z.string()
    }))
    .mutation(async (opts) => {
      return { ...opts.input };
    }),
});

export const appRouter = t.router({
  event: restRouter,
});

export type AppRouter = typeof appRouter;