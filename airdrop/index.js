const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

//new wallet
const newPair = new Keypair();
console.log(newPair);
  
											 
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

									 
const getWalletBalance = async() => {
    try{
            //getting a connection
            const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
            const myWallet = await Keypair.fromSecretKey(privateKey);
            const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
			console.log(`wallet balance : ${walletBalance}`);
    }
    catch(err){
        console.log(err);
    }
};

const airDropSol = async() => {
    try{
        //getting a connection url
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        //creating wallet from secret key
        const myWallet = await Keypair.fromSecretKey(privateKey);
        console.log("--airdropping 5 SOL--");
        const fromAirDropSign = await connection.requestAirdrop(
            new PublicKey(myWallet.publicKey),
            5 * LAMPORTS_PER_SOL
        );
        //confirming the transaction
        await connection.confirmTransaction(fromAirDropSign);
    }
	
  
												  
								  
		 
																			  
																   
											
																   
											   
							
		
																
    catch(err){
        console.log(err);
    }
};

						  
const driverFunction = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();   