import { BigNumber } from 'bignumber.js'
import Staking from './Staking'
import ABI from '../constants/abi/StakingSingleReward.json'
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

export default class StakingSingleReward extends Staking {
  // eslint-disable-next-line no-useless-constructor
  constructor (stakingAddress: string, provider: any) {
    super(stakingAddress, provider)
  }

  deposit (amount: string): Promise<any> {
    return ethTransaction(this.stakingAddress, 'deposit', ABI, this.web3, [
      amount
    ])
  }

  withdraw (amount: string): Promise<any> {
    return ethTransaction(this.stakingAddress, 'withdraw', ABI, this.web3, [
      amount
    ])
  }

  withdrawReward (): Promise<any> {
    return ethTransaction(
      this.stakingAddress,
      'withdrawInterest',
      ABI,
      this.web3
    )
  }

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

  async getStatsData (account: string): Promise<any> {
    const result = await ethCall(
      this.stakingAddress,
      'getStatsData',
      ABI,
      this.web3,
      [account]
    )
    return Object.values(result)
  }

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
    } = await fetchPairInfo(pairAddress, networkId)

    const [reserve0, reserve1] = calculateReserves(
      globalTotalStake,
      totalSupply,
      totalReserve0,
      totalReserve1
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
      totalRewards,
      estimatedRewards,
      unlockedRewards,
      accuruedRewards,
      rewardsInfo: [
        {
          totalRewardsInUSD,
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
