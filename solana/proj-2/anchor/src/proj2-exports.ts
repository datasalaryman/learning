// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import Proj2IDL from '../target/idl/proj2.json'
import type { Proj2 } from '../target/types/proj2'

// Re-export the generated IDL and type
export { Proj2, Proj2IDL }

// The programId is imported from the program IDL.
export const PROJ2_PROGRAM_ID = new PublicKey(Proj2IDL.address)

// This is a helper function to get the Proj2 Anchor program.
export function getProj2Program(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...Proj2IDL, address: address ? address.toBase58() : Proj2IDL.address } as Proj2, provider)
}

// This is a helper function to get the program ID for the Proj2 program depending on the cluster.
export function getProj2ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Proj2 program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return PROJ2_PROGRAM_ID
  }
}
