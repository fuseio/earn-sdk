import { TransactionResponse } from '@ethersproject/providers'

import Staking from './Staking'
import STAKING_ABI from '../constants/abi/StakingSingleReward.json'
import { BigNumber } from 'ethers'
import fetchPairInfo from '../utils/fetchPairInfo'

interface StakerData {
  userTotalStaked: string
  userTotalWithdrawn: string
}

interface StakingTimes {
  start: number
  duration: number
  end: number
}

export default class StakingSingleReward extends Staking {
  constructor(stakingAddress: string, provider: any) {
    super(stakingAddress, STAKING_ABI, provider)
  }

  deposit(amount: string): Promise<TransactionResponse> {
    return this.contract.stake(amount)
  }

  withdraw(amount: string): Promise<TransactionResponse> {
    return this.contract.withdrawStakeAndInterest(amount)
  }

  withdrawReward(): Promise<TransactionResponse> {
    return this.contract.withdrawInterest()
  }

  async getStakerInfo(account: string): Promise<StakerData> {
    const [
      userTotalStaked,
      userTotalWithdrawn,
    ] = await this.contract.getStakerData(account)
    return {
      userTotalStaked,
      userTotalWithdrawn,
    }
  }

  async getStats(account: string, pairAddress: string, networkId: number, rewards?: Array<string>): Promise<any> {
    const [
      globalTotalStake,
      totalRewards,
      estimatedRewards,
      unlockedRewards,
      accuruedRewards,
    ] = await this.contract.getStatsData(account)
    const { data } = await fetchPairInfo(pairAddress, networkId)
    const { duration } = await this.getStakingTimes()
    const { userTotalStaked } = await this.getStakerInfo(account)
    // since it's a single reward contract, we assume only one reward
    const rewardPrice = await getTokenPrice(rewards[0])

    
    const reserveUSD = data?.pair?.reserveUSD
    const totalSupply = data?.pair?.totalSupply
    const token0 = data?.pair?.token0
    const token1 = data?.pair?.token1
    const tokenReserve0 = data?.pair?.reserve0
    const tokenReserve1 = data?.pair?.reserve1
    
    const lockedRewards = totalRewards.sub(unlockedRewards)
    const pairPrice = reserveUSD / totalSupply
    const totalStakedUSD = userTotalStaked * pairPrice
    const globalTotalStakeUSD = globalTotalStake * pairPrice
    const durationInDays = duration / (3600 * 24)
    const totalRewardsInUSD = totalRewards * rewardPrice
    const apyPercent = (totalRewardsInUSD / globalTotalStakeUSD) * (365 / durationInDays)

    return {
      globalTotalStake: globalTotalStake.toString(),
      totalReward: totalRewards.toString(),
      estimatedReward: estimatedRewards.toString(),
      unlockedReward: unlockedRewards.toString(),
      accuruedRewards: accuruedRewards.toString(),
      rewardsInfo: [{
        totalRewardsInUSD,
        apyPercent
      }],
      token0,
      token1,
      tokenReserve0,
      tokenReserve1,
      lockedRewards,
      totalStakedUSD
    }
  }

  async getStakingTimes(): Promise<StakingTimes> {
    const duration: BigNumber = await this.contract.stakingPeriod()
    const start: BigNumber = await this.contract.stakingStartTime()
    const end = start.add(duration)

    return {
      start: start.toNumber(),
      duration: duration.toNumber(),
      end: end.toNumber(),
    }
  }
}
