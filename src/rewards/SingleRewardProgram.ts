import { BigNumber } from 'bignumber.js'
import RewardProgram from './RewardProgam'
import ABI from '../constants/abi/SingleRewardProgram.json'
import fetchPairInfo from '../utils/fetchPairInfo'
import fetchTokenPrice from '../utils/fetchTokenPrice'
import {
  calculateApy,
  calculateReserves,
  weiToNumber
} from '../utils'
import { ethCall, ethTransaction } from '../utils/eth'

interface StakingTimes {
  start: number
  duration: number
  end: number
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
  // eslint-disable-next-line no-useless-constructor
  constructor (stakingAddress: string, provider: any) {
    super(stakingAddress, provider)
  }

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
      'withdrawStakeAndInterest',
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
      'withdrawInterest',
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
   */
  async getStakerInfo (account: string): Promise<any> {
    const result = await ethCall(
      this.stakingAddress,
      'getStakerData',
      ABI,
      this.web3,
      [account]
    )
    return Object.values(result)
  }

  private async getStatsData (account: string): Promise<any> {
    const result = await ethCall(
      this.stakingAddress,
      'getStatsData',
      ABI,
      this.web3,
      [account]
    )
    return Object.values(result)
  }

  /**
   * Gets the start, duration and end of staking
   */
  async getStakingTimes (): Promise<StakingTimes> {
    const duration: string = await ethCall(
      this.stakingAddress,
      'stakingPeriod',
      ABI,
      this.web3
    )
    const start: string = await ethCall(
      this.stakingAddress,
      'stakingStartTime',
      ABI,
      this.web3
    )

    return {
      start: Number(start),
      duration: Number(duration),
      end: Number(start) + Number(duration)
    }
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
  async getStats (account: string, pairAddress: string, networkId: number, rewards?: Array<string>): Promise<any> {
    const [
      globalTotalStake,
      totalRewards,
      estimatedRewards,
      unlockedRewards,
      accuruedRewards
    ] = await this.getStatsData(account)

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
      [totalReserve0, totalReserve1]
    )

    const lockedRewards = new BigNumber(totalRewards).minus(
      new BigNumber(unlockedRewards)
    )
    const pairPrice = reserveUSD / totalSupply
    const totalStakedUSD = weiToNumber(userTotalStaked) * pairPrice
    const globalTotalStakeUSD = weiToNumber(globalTotalStake) * pairPrice

    const reward = rewards && rewards[0]
    const rewardPrice = await fetchTokenPrice(reward, networkId)
    const totalRewardsInUSD = weiToNumber(totalRewards) * rewardPrice

    const { duration } = await this.getStakingTimes()
    const apyPercent = calculateApy(
      totalRewardsInUSD,
      globalTotalStakeUSD,
      duration
    )

    return {
      globalTotalStake,
      unlockedRewards,
      rewardsInfo: [
        {
          totalRewards,
          totalRewardsInUSD,
          estimatedRewards,
          accuruedRewards,
          apyPercent
        }
      ],
      token0,
      token1,
      totalStakedUSD,
      globalTotalStakeUSD,
      pairPrice,
      reserve0: reserve0.toFixed(),
      reserve1: reserve1.toFixed(),
      lockedRewards: lockedRewards.toFixed()
    }
  }
}
