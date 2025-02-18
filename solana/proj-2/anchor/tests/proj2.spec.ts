import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import { Proj2 } from "../target/types/proj2"
import { BankrunProvider, startAnchor } from 'anchor-bankrun';

const IDL = require("../target/idl/proj2.json");

const votingAddress = new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')

describe('Voting', () => {

  it('Initialize Poll', async () => {
    const context = await startAnchor("", [
      {
        name: "proj2", 
        programId: votingAddress
      }
    ], []);

    const provider = new BankrunProvider(context);

    const votingProgram = new Program<Proj2>(IDL, provider);

    await votingProgram.methods.initializePoll(
      new anchor.BN(1), 
      "What is your favorite type of peanut butter?", 
      new anchor.BN(0), 
      new anchor.BN(1839887705)
    ).rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      votingAddress
    );  

    const poll = await votingProgram.account.poll.fetch(pollAddress);

    console.log(poll); 

    expect(poll.pollId.toNumber()).toEqual(1); 
    expect(poll.description).toEqual("What is your favorite type of peanut butter?"); 
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber()); 

  })

})
