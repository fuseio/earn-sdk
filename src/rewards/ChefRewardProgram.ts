import RewardProgram from './RewardProgam'
import ABI from '../constants/abi/MasterChef.json'
import { calculateReserves, getChef, weiToNumber } from '../utils'
import { ethCall, ethTransaction } from '../utils/eth'
import fetchPairInfo from '../utils/fetchPairInfo'
import fetchTokenPrice from '../utils/fetchTokenPrice'
import { getChefPool } from '../graphql/fetcher'

export enum Chef {
    CHEF_V2,
    CHEF_V3
}

export default class ChefRewardProgram extends RewardProgram {
    chef?: Chef

    constructor (chefAddress: string, provider: any) {
      super(chefAddress, provider)

      this.chef = getChef(chefAddress)
    }

    deposit (amount: string, account: string, pid?: number): Promise<any> {
      return ethTransaction(
        this.stakingAddress,
        'deposit',
        ABI,
        this.web3,
        [pid, amount],
        account
      )
    }

    withdraw (amount: string, account: string, pid?: number): Promise<any> {
      return ethTransaction(
        this.stakingAddress,
        'withdraw',
        ABI,
        this.web3,
        [pid, amount],
        account
      )
    }

    withdrawReward (account: string, pid?: number): Promise<any> {
      return ethTransaction(
        this.stakingAddress,
        'deposit',
        ABI,
        this.web3,
        [pid, 0],
        account
      )
    }

    async getStakerInfo (account: string, pid?: number): Promise<any> {
      const userInfo = await ethCall(
        this.stakingAddress,
        'userInfo',
        ABI,
        this.web3,
        [pid, account]
      )

      const userPool = await getChefPool(pid, account, this.chef)

      return [userInfo[0], userPool?.pool?.voltHarvested]
    }

    async getStats (account: string, pairAddress: string, networkId: number, pid?: number): Promise<any> {
      const userPool = await getChefPool(pid, account, this.chef)
      const globalTotalStake = userPool?.pool?.balance
      const userTotalStaked = weiToNumber(userPool?.amount).toString()

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

      const getRewards = async () => {
        const pendingTokens = await ethCall(
          this.stakingAddress,
          'pendingTokens',
          ABI,
          this.web3,
          [pid, account]
        )

        const voltAddress = await ethCall(
          this.stakingAddress,
          'volt',
          ABI,
          this.web3,
          []
        )

        const voltPerSec = (userPool?.pool?.owner?.voltPerSec / 1e18)
        const voltPrice = await fetchTokenPrice(voltAddress, networkId)

        const rewardPerSec = (userPool?.pool?.allocPoint / userPool?.pool?.owner?.totalAllocPoint) * voltPerSec
        const rewardPerDay = rewardPerSec * 3600 * 24 * 30 * 12
        const rewardPerDayUSD = rewardPerDay * voltPrice

        const roiPerSec = (rewardPerSec * voltPrice) / globalTotalStakeUSD
        const aprPercent = roiPerSec * 12 * 30 * 24 * 3600

        const accuruedRewards = weiToNumber(pendingTokens[0])

        return [{
          rewardPerDay,
          rewardPerDayUSD,
          accuruedRewards,
          apyPercent: aprPercent,
          rewardRate: 0
        }]
      }

      const rewardsInfo = await getRewards()

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

    getStakingTimes (): any {
      return {
        start: Infinity,
        duration: Infinity,
        end: Infinity
      }
    }
}
