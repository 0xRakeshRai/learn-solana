const assert = require('assert');
const anchorRef = require('@project-serum/anchor');
const { SystemProgram } = anchorRef.web3;

let _calculator;

describe('mycalculatordapp', () => {
  const provider = anchorRef.Provider.local();
  anchorRef.setProvider(provider);

  const calculator = anchorRef.web3.Keypair.generate();
  const program = anchorRef.workspace.Mycalculatordapp;

  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to Solana");
    _calculator = calculator;
  });

  it("Adds two numbers", async function() {
    const calculator = _calculator;
    
    await program.rpc.add(new anchorRef.BN(2), new anchorRef.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchorRef.BN(5)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it('Multiplies two numbers', async function() {
    const calculator = _calculator;
    
    await program.rpc.multiply(new anchorRef.BN(2), new anchorRef.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchorRef.BN(6)));
    assert.ok(account.greeting === "Welcome to Solana");

  })

  it('Subtracts two numbers', async function() {
    const calculator = _calculator;
    
    await program.rpc.subtract(new anchorRef.BN(12), new anchorRef.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchorRef.BN(9)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it('Divides two numbers', async function() {
    const calculator = _calculator;
    
    await program.rpc.divide(new anchorRef.BN(20), new anchorRef.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchorRef.BN(2)));
    assert.ok(account.greeting === "Welcome to Solana");
  });
});