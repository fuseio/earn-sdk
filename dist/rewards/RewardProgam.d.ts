import Web3 from 'web3';
export default abstract class RewardProgram {
    readonly stakingAddress: string;
    protected readonly web3: Web3;
    constructor(stakingAddress: string, provider: any);
    /**
     * Deposit the provided amount of the staking token into the staking contract
     * @param amount the number of staking tokens to deposit
     * @param account the account sending the transaction
     */
    abstract deposit(amount: string, account: string): Promise<any>;
    /**
     * Withdraw the provided amount of the staking token from the staking contract
     * @param amount the number of staking tokens to withdraw
     * @param account the account sending the transaction
     */
    abstract withdraw(amount: string, account: string): Promise<any>;
    /**
     * Withdraw the rewards accured
     * @param account the account sending the transaction
     */
    abstract withdrawReward(account: string): Promise<any>;
    /**
     * Get staking information for the provided address
     * @param account address to fetch the staking information for
     */
    abstract getStakerInfo(account: string): Promise<any>;
    /**
     * Gets global reward stats for contract
     * @param account the account to get stats for
     * @param pairAddress the staking token
     * @param networkId the networkId where contract is deployed
     * @param rewards array of rewards offered
     */
    abstract getStats(account: string, pairAddress: string, networkId: number): Promise<any>;
    /**
     * Gets the start, duration and end of staking
     */
    abstract getStakingTimes(): Promise<any>;
}
