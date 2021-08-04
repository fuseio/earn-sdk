import { ethCall, ethTransaction } from '../utils/eth'
import ABI from '../constants/abi/MultiRewardProgram.json'
import ERC20_ABI from '../constants/abi/Erc20.json'
import RewardProgram from './RewardProgam'
import fetchPairInfo from '../utils/fetchPairInfo'
import { calculateApy, calculateReserves, weiToNumber } from '../utils'
import fetchTokenPrice from '../utils/fetchTokenPrice'
import BigNumber from 'bignumber.js'

export default class MultiRewardProgram extends RewardProgram {
  // eslint-disable-next-line no-useless-constructor
  constructor (stakingAddress: string, provider: any) {
    super(stakingAddress, provider)
  }

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
    } = await fetchPairInfo(pairAddress, networkId)

    const [reserve0, reserve1] = calculateReserves(
      globalTotalStake,
      totalSupply,
      totalReserve0,
      totalReserve1
    )

    const pairPrice = reserveUSD / totalSupply
    const totalStakedUSD = weiToNumber(userTotalStaked) * pairPrice
    const globalTotalStakeUSD = weiToNumber(globalTotalStake) * pairPrice

    const rewardsInfo = await this.getRewardsInfo(account, networkId, globalTotalStakeUSD, rewards)

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

  async getRewardsInfo (account: string, networkId: number, globalTotalStakeUSD: number, rewards: any[] = []) {
    const rewardsInfo: any = []

    for (const reward of rewards) {
      const estimatedRewards = await ethCall(
        this.stakingAddress,
        'earned',
        ABI,
        this.web3,
        [account, reward]
      )

      const paidRewards = await ethCall(
        this.stakingAddress,
        'userRewardPerTokenPaid',
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

      const accuruedRewards = new BigNumber(estimatedRewards).plus(paidRewards).toString()

      const totalRewards = await ethCall(
        this.stakingAddress,
        'getRewardForDuration',
        ABI,
        this.web3,
        [reward]
      )

      const rewardPrice = await fetchTokenPrice(reward, networkId)
      const totalRewardsInUSD = weiToNumber(totalRewards, rewardTokenDecimals) * rewardPrice

      const { duration } = await this.getStakingTimes(reward)
      const apyPercent = calculateApy(
        totalRewardsInUSD,
        globalTotalStakeUSD,
        duration
      )

      rewardsInfo.push({
        totalRewards,
        totalRewardsInUSD,
        estimatedRewards,
        accuruedRewards,
        apyPercent
      })
    }

    return rewardsInfo
  }
}
