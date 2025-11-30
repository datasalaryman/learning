import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { createKeyPairFromBytes } from "@solana/kit";
import bs58 from "bs58";

// Custom validator for Solana keypair
const validateSolanaKeypair = z.string()
  .min(1, "SOLANA_KEYPAIR is required")
  .refine(
    (keypairString) => {
      try {
        // Decode base58 string to bytes
        const keypairBytes = bs58.decode(keypairString);
        
        // Solana keypair should be 64 bytes (32 private + 32 public)
        if (keypairBytes.length !== 64) {
          return false;
        }
        
        // Try to create a keypair from the bytes to validate it
        createKeyPairFromBytes(keypairBytes);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Invalid Solana keypair format. Must be a valid 64-byte base58 encoded keypair.",
    }
  );

export const env = createEnv({
  server: {
    SOLANA_RPC_URL: z.string().refine(
      (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid URL format" }
    ),
    SOLANA_KEYPAIR: validateSolanaKeypair,
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});