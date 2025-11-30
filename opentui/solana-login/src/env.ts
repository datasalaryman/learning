import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SOLANA_RPC_URL: z.string().url("Invalid URL format"),
    SOLANA_KEYPAIR: z.string().min(1, "SOLANA_KEYPAIR is required"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});