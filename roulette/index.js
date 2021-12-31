const web3 = require("@solana/web3.js");

const connection = new web3.Connection(web3.clusterApiUrl('devnet'),"confirmed");

//generating a new Keypair
const userWallet = new web3.Keypair();
console.log(userWallet);

//creating a transaction
const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(from.publicKey.toString()),
        toPubkey:new web3.PublicKey(to.publicKey.toString()),
        lamports:web3.LAMPORTS_PER_SOL
    })
)

//signing the transaction
const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWall]
);

