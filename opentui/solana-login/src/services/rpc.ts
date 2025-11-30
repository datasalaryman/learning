import { createSolanaRpc } from '@solana/kit';
import { env } from '@/env';

/**
 * Singleton RPC client instance for the entire application
 * Uses the validated SOLANA_RPC_URL environment variable
 */
export const rpc = createSolanaRpc(env.SOLANA_RPC_URL);

/**
 * Get latest blockhash and fee calculator
 * @returns Promise resolving to latest blockhash information
 */
export async function getLatestBlockhash() {
  return await rpc.getLatestBlockhash().send();
}

/**
 * Get current slot
 * @returns Promise resolving to current slot number
 */
export async function getCurrentSlot(): Promise<bigint> {
  return await rpc.getSlot().send();
}
/**
 * Get version information
 * @returns Promise resolving to Solana version information
 */
export async function getVersion() {
  return await rpc.getVersion().send();
}
