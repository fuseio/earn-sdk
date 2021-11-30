import { ethCall, ethTransaction } from '../utils/eth'
import ABI from '../constants/abi/MultiRewardProgram.json'
import ERC20_ABI from '../constants/abi/Erc20.json'
import RewardProgram from './RewardProgam'
import fetchPairInfo from '../utils/fetchPairInfo'
import { calculateApy, calculateReserves, weiToNumber } from '../utils'
import fetchTokenPrice from '../utils/fetchTokenPrice'

/**
 * Create a new MultiRewardProgram which represents a multi reward
 * contract on the fuse network. The instance provides basic functionality
 * for interacting with the contract.
 *
 * e.g with web3.js
 * ```typescript
 * import Web3 from 'web3'
 * import { MultiRewardProgram } from '@fuseio/earn-sdk'
 *
 * const stakingAddress = '0x'
 * const web3Provider = new Web3('https://rpc.fuse.io')
 * const rewardProgram = new MultiRewardProgram(stakingAddress, web3Provider)
 * ```
 */
export default class MultiRewardProgram extends RewardProgram {
  // eslint-disable-next-line no-useless-constructor
  constructor (stakingAddress: string, provider: any) {
    super(stakingAddress, provider)
  }

  /**
   * Deposit the provided amount of the staking token into the staking contract
   *
   * ```typescript
   * rewardProgram.deposit(
   *    '1000000000000000000',
   *    '0x'
   * )
   * ```
   * @param amount the number of staking tokens to deposit
   * @param account the account sending the transaction
   */
  deposit (amount: string, account: string): Promise<any> {
    return ethTransaction(
      this.stakingAddress,
      'stake',
      ABI,
      this.web3,
      [amount],
      account
    )
  }

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
  withdraw (amount: string, account: string): Promise<any> {
    return ethTransaction(
      this.stakingAddress,
      'withdraw',
      ABI,
      this.web3,
      [amount],
      account
    )
  }

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
  withdrawReward (account: string): Promise<any> {
    return ethTransaction(
      this.stakingAddress,
      'getReward',
      ABI,
      this.web3,
      [],
      account
    )
  }

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
   * @param rewardsToken rewardToken to fetch reward information for
   */
  async getStakerInfo (account: string, rewardsToken?: string): Promise<any> {
    const totalStaked = await ethCall(
      this.stakingAddress,
      'balanceOf',
      ABI,
      this.web3,
      [account]
    )

    let totalWithdrawn = 0

    if (rewardsToken) {
      totalWithdrawn = await ethCall(
        this.stakingAddress,
        'userRewardPerTokenPaid',
        ABI,
        this.web3,
        [account, rewardsToken]
      )
    }

    return [totalStaked, totalWithdrawn]
  }

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
  async getStats (account: string, pairAddress: string, networkId: number, rewards: any[] = []): Promise<any> {
    const globalTotalStake = await ethCall(
      this.stakingAddress,
      'totalSupply',
      ABI,
      this.web3
    )

    const [userTotalStaked] = await this.getStakerInfo(account)

    const {
      reserveUSD,
      totalSupply,
      token0,
      token1,
      totalReserve0,
      totalReserve1
    } = await fetchPairInfo(pairAddress, networkId, this.web3)

    const [reserve0, reserve1] = calculateReserves(
      globalTotalStake,
      totalSupply,
      totalReserve0,
      totalReserve1
    )

    const pairPrice = reserveUSD / totalSupply
    const totalStakedUSD = weiToNumber(userTotalStaked) * pairPrice
    const globalTotalStakeUSD = weiToNumber(globalTotalStake) * pairPrice

    const rewardsInfo = await this.getRewardsInfo(account, networkId, globalTotalStake, globalTotalStakeUSD, rewards)

    return {
      globalTotalStake,
      rewardsInfo,
      token0,
      token1,
      totalStakedUSD,
      globalTotalStakeUSD,
      pairPrice,
      reserve0: reserve0.toFixed(),
      reserve1: reserve1.toFixed()
    }
  }

  /**
   * Gets the start, duration and end of staking
   * @param rewardsToken the reward to get time information for
   */
  async getStakingTimes (rewardsToken?: string): Promise<any> {
    const rewardData = await ethCall(
      this.stakingAddress,
      'rewardData',
      ABI,
      this.web3,
      [rewardsToken]
    )
    const duration = rewardData.rewardsDuration
    const end = rewardData.periodFinish
    const start = end - duration

    return {
      start: Number(start),
      duration: Number(duration),
      end: Number(end)
    }
  }

  private async getRewardRate (reward: string): Promise<any> {
    const rewardData = await ethCall(
      this.stakingAddress,
      'rewardData',
      ABI,
      this.web3,
      [reward]
    )

    const rewardRate = rewardData.rewardRate
    return rewardRate
  }

  private async getRewardsInfo (account: string, networkId: number, globalTotalStake: string, globalTotalStakeUSD: number, rewards: any[] = []) {
    const rewardsInfo: any = []

    for (const reward of rewards) {
      const accuruedRewards = await ethCall(
        this.stakingAddress,
        'earned',
        ABI,
        this.web3,
        [account, reward]
      )

      const rewardTokenDecimals = await ethCall(
        reward,
        'decimals',
        ERC20_ABI,
        this.web3
      )

      const totalRewards = await ethCall(
        this.stakingAddress,
        'getRewardForDuration',
        ABI,
        this.web3,
        [reward]
      )

      const { duration } = await this.getStakingTimes(reward)
      const rewardRate = await this.getRewardRate(reward)
      const rewardPrice = await fetchTokenPrice(reward, networkId)
      const totalRewardsInUSD = weiToNumber(totalRewards, rewardTokenDecimals) * rewardPrice

      const apyPercent = calculateApy(
        totalRewardsInUSD,
        globalTotalStakeUSD,
        duration
      )

      rewardsInfo.push({
        totalRewards,
        totalRewardsInUSD,
        accuruedRewards,
        apyPercent,
        rewardRate
      })
    }

    return rewardsInfo
  }
}
