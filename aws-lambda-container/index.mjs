import { Connection } from "@solana/web3.js";

export async function handler(event) {

    const connection = new Connection(process.env.RPC_ENDPOINT);

    const txObject = await connection.getTransaction(event.payload)

    console.log("Connection object created")

    const response = {
        statusCode: 200,
        body: JSON.stringify(txObject),
    };
    return response;
};