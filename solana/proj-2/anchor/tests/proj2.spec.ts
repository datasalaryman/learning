import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Proj2} from '../target/types/proj2'

describe('proj2', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Proj2 as Program<Proj2>

  const proj2Keypair = Keypair.generate()

  it('Initialize Proj2', async () => {
    await program.methods
      .initialize()
      .accounts({
        proj2: proj2Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([proj2Keypair])
      .rpc()

    const currentCount = await program.account.proj2.fetch(proj2Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Proj2', async () => {
    await program.methods.increment().accounts({ proj2: proj2Keypair.publicKey }).rpc()

    const currentCount = await program.account.proj2.fetch(proj2Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Proj2 Again', async () => {
    await program.methods.increment().accounts({ proj2: proj2Keypair.publicKey }).rpc()

    const currentCount = await program.account.proj2.fetch(proj2Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Proj2', async () => {
    await program.methods.decrement().accounts({ proj2: proj2Keypair.publicKey }).rpc()

    const currentCount = await program.account.proj2.fetch(proj2Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set proj2 value', async () => {
    await program.methods.set(42).accounts({ proj2: proj2Keypair.publicKey }).rpc()

    const currentCount = await program.account.proj2.fetch(proj2Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the proj2 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        proj2: proj2Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.proj2.fetchNullable(proj2Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
