import RewardProgram from './RewardProgam';
interface StakingTimes {
    start: number;
    duration: number;
    end: number;
}
/**
 * Create a new SingleRewardProgram which represents a single reward
 * contract on the fuse network. The instance provides basic functionality
 * for interacting with the contract.
 *
 * e.g with web3.js
 * ```typescript
 * import Web3 from 'web3'
 * import { SingleRewardProgram } from '@fuseio/earn-sdk'
 *
 * const stakingAddress = '0x'
 * const web3Provider = new Web3('https://rpc.fuse.io')
 * const rewardProgram = new SingleRewardProgram(stakingAddress, web3Provider)
 * ```
 */
export default class SingleRewardProgram extends RewardProgram {
    constructor(stakingAddress: string, provider: any);
    /**
    * Deposit the provided amount of the staking token into the staking contract
    *
    * ```typescript
    * rewardProgram.deposit(
    *   '1000000000000000000',
    *   '0x'
    * )
    * ```
    * @param amount the number of staking tokens to deposit
    * @param account the account sending the transaction
    */
    deposit(amount: string, account: string): Promise<any>;
    /**
     * Withdraw the provided amount of the staking token from the staking contract
     *
     * ```typescript
     * rewardProgram.withdraw(
     *   '1000000000000000000',
     *   '0x'
     * )
     * ```
     * @param amount the number of staking tokens to withdraw
     * @param account the account sending the transaction
     */
    withdraw(amount: string, account: string): Promise<any>;
    /**
     * Withdraw the rewards accured
     *
     * ```typescript
     * rewardProgram.withdrawReward(
     *   '0x'
     * )
     * ```
     * @param account the account sending the transaction
     */
    withdrawReward(account: string): Promise<any>;
    /**
     * Get reward information for the provided address and rewardToken
     *
     * ```typescript
     * rewardProgram.getStakerInfo(
     *   '0x',
     *   '0x00'
     * )
     * ```
     * @param account address to fetch the reward information for
     */
    getStakerInfo(account: string): Promise<any>;
    private getStatsData;
    /**
     * Gets the start, duration and end of staking
     */
    getStakingTimes(): Promise<StakingTimes>;
    /**
     * Gets global reward stats for rewardProgram
     *
     * ```typescript
     * rewardProgram.getStats(
     *   '0x',
     *   '0x',
     *   122,
     *   ['0x']
     * )
     * ```
     * @param account the account to get stats for
     * @param pairAddress the address of the staking token
     * @param networkId the networkId where contract is deployed
     * @param rewards array of rewards offerred
     */
    getStats(account: string, pairAddress: string, networkId: number, rewards?: Array<string>): Promise<any>;
}
export {};
