use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatordapp {
    use super::*;

    
//Context<T> -- is array of solana accounts and program IDs
pub fn create(ctx:Context<Create>,init_message:String) -> ProgramResult{
    let calculator = &mut ctx.accounts.calculator;
    calculator.greeting = init_message;
    Ok(())
}
pub fn add(ctx:Context<Addition>,num1:i64,num2:i64) -> ProgramResult{
    let calculator = &mut ctx.accounts.calculator;
    calculator.result = num1 + num2;
    Ok(())
}
pub fn multiply(ctx:Context<Multiplication>,num1:i64,num2:i64) -> ProgramResult{
    let calculator = &mut ctx.accounts.calculator;
    calculator.result = num1 * num2;
    Ok(())
}
pub fn subtract(ctx:Context<Subtract>,num1:i64,num2:i64) -> ProgramResult{
    let calculator = &mut ctx.accounts.calculator;
    calculator.result = num1 - num2;
    Ok(())
}
pub fn divide(ctx:Context<Divide>,num1:i64,num2:i64) -> ProgramResult{
    let calculator = &mut ctx.accounts.calculator;
    calculator.result = num1 % num2;
    Ok(())
}

}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}


#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtract<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Divide<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}
//to create a Create Struct
// we will pass 3 acc , 1. calculator acc. which we use in later methods | 2.User account, from which rent will be charged | 3.system program

#[derive(Accounts)]
pub struct Create<'info> {
    //below line we are creating a new acc.(calculator) owned by current program using 'init', after thats specfying the payer and space for this new acc.
    #[account(init, payer = user, space = 8 + 64 + 64 + 64 + 64)]
    //new acc details
    pub calculator: Account<'info, Calculator>,
    //making new acc mutable
    #[account(mut)]
    //user acc
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}