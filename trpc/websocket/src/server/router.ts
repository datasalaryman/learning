import { EventEmitter } from "events";
import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

const t = initTRPC.create();

export const appRouter = t.router({
  onAdd: t.procedure.subscription(() => {
    // return an `observable` with a callback which is triggered immediately
    return observable((emit) => {
      const onAdd = (data:any) => {
        // emit data to client
        emit.next(data);
      };

      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on("add", onAdd);

      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("add", onAdd);
      };
    });
  }),
  add: t.procedure
    .input(
      z.any()
    )
    .mutation(async (opts) => {
      const post = { ...opts.input }; /* [..] add to db */

      ee.emit("add", post);
      return post;
    }),
});
