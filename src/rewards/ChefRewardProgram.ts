import RewardProgram from './RewardProgam'
import ABI from '../constants/abi/MasterChef.json'
import { calculateReserves, getChef, weiToNumber } from '../utils'
import { ethCall, ethTransaction } from '../utils/eth'
import fetchPairInfo from '../utils/fetchPairInfo'
import fetchTokenPrice from '../utils/fetchTokenPrice'
import { getChefPool, getChefUser } from '../graphql/fetcher'
import { VOLT } from '../constants'

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

      const user = await getChefUser(pid, account, this.chef)

      return [userInfo[0], user?.voltHarvested]
    }

    async getStats (account: string, pairAddress: string, networkId: number, pid?: number): Promise<any> {
      const pool = await getChefPool(pid, this.chef)
      const user = await getChefUser(pid, account, this.chef)
      const globalTotalStake = pool?.balance
      const userTotalStaked = weiToNumber(user?.amount).toString()

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

        const voltPerSec = (pool?.owner?.voltPerSec / 1e18)
        const voltPrice = await fetchTokenPrice(VOLT, networkId)

        const rewardPerSec = (pool?.allocPoint / pool?.owner?.totalAllocPoint) * voltPerSec
        const rewardPerDay = rewardPerSec * 3600 * 24
        const rewardPerDayUSD = rewardPerDay * voltPrice

        const roiPerSec = (rewardPerSec * voltPrice) / globalTotalStakeUSD
        const aprPercent = roiPerSec * 12 * 30 * 24 * 3600

        return [{
          rewardPerDay,
          rewardPerDayUSD,
          accuruedRewards: pendingTokens[0],
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
