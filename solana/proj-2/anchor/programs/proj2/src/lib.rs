#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod proj2 {
    use super::*;

  pub fn close(_ctx: Context<CloseProj2>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.proj2.count = ctx.accounts.proj2.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.proj2.count = ctx.accounts.proj2.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeProj2>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.proj2.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeProj2<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Proj2::INIT_SPACE,
  payer = payer
  )]
  pub proj2: Account<'info, Proj2>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseProj2<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub proj2: Account<'info, Proj2>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub proj2: Account<'info, Proj2>,
}

#[account]
#[derive(InitSpace)]
pub struct Proj2 {
  count: u8,
}
