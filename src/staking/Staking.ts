import { Contract } from 'ethers'
import IStaking from './IStaking'

export default abstract class Staking implements IStaking {
  protected readonly contract: Contract

  constructor(stakingAddress: string, ABI: any, provider: any) {
    this.contract = new Contract(stakingAddress, ABI, provider)
  }

  /**
   * Deposit the provided amount of the staking token into the staking contract
   * @param amount the number of staking tokens to deposit
   */
  abstract deposit(amount: string): Promise<any>

  /**
   * Withdraw the provided amount of the staking token from the staking contract
   * @param amount the number of staking tokens to withdraw
   */
  abstract withdraw(amount: string): Promise<any>

  /**
   * Withdraw the rewards accured
   */
  abstract withdrawReward(): Promise<any>

  /**
   * Get staking information for the provided address
   * @param account address to fetch the staking information for
   */
  abstract getStakerInfo(account: string): Promise<any>

  abstract getStats(
    account: string,
    pairAddress: string,
    networkId: number,
    rewards?: string[],
  ): Promise<any>
  
  abstract getStakingTimes(): Promise<any>
}
