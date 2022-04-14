import RewardProgram from './RewardProgam'
import ABI from '../constants/abi/MasterChef.json'
import { calculateReserves, getChef, weiToNumber } from '../utils'
import { ethCall, ethTransaction } from '../utils/eth'
import { getChefPool, getChefUser } from '../graphql/fetcher'
import { VOLT, xVOLT } from '../constants'
import fetchVoltageTokenPrice from '../utils/fetchVoltageTokenPrice'
import fetchTokenInfo from '../utils/fetchTokenInfo'
import fetchChefPairInfo from '../utils/fetchChefPairInfo'

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

      let reserves, tokens, pairPrice

      if (pairAddress.toLowerCase() === xVOLT.toLowerCase()) {
        tokens = [await fetchTokenInfo(xVOLT, this.web3), null]

        reserves = [globalTotalStake, null]

        pairPrice = await fetchVoltageTokenPrice(VOLT, networkId)
      } else {
        const {
          reserveUSD,
          totalSupply,
          tokens: tokensInfo,
          totalReserves
        } = await fetchChefPairInfo(pairAddress, networkId)

        const _reserves = calculateReserves(
          globalTotalStake,
          totalSupply,
          totalReserves
        )

        tokens = tokensInfo
        reserves = _reserves.map((reserve) => reserve.toFixed())
        pairPrice = reserveUSD / totalSupply
      }

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
        const voltPrice = await fetchVoltageTokenPrice(VOLT, networkId)

        const baseRewardPerSec = (pool?.allocPoint / pool?.owner?.totalAllocPoint) * voltPerSec
        const baseRewardPerDay = baseRewardPerSec * 3600 * 24
        const baseRewardPerDayUSD = baseRewardPerDay * voltPrice

        const baseRoiPerSec = (baseRewardPerSec * voltPrice) / globalTotalStakeUSD
        const baseAprPercent = baseRoiPerSec * 12 * 30 * 24 * 3600

        const bonusRewardPrice = await fetchVoltageTokenPrice(pendingTokens.bonusTokenAddress, networkId)
        const bonusRewardPerSec = pool?.rewarder?.tokenPerSec / 1e18
        const bonusRewardPerDay = bonusRewardPerSec * 3600 * 24
        const bonusRewardPerDayUSD = bonusRewardPerDay * bonusRewardPrice

        const bounsRoiPerSec = (bonusRewardPerSec * bonusRewardPrice) / globalTotalStakeUSD
        const bonusAprPercent = bounsRoiPerSec * 12 * 30 * 24 * 3600

        return [{
          baseRewardPerDay,
          baseRewardPerDayUSD,
          baseRewardSymbol: 'VOLT',
          pendingBaseReward: pendingTokens?.pendingVolt,
          baseAprPercent,
          bonusRewardPerDay,
          bonusRewardPerDayUSD,
          bonusRewardSymbol: pool?.rewarder?.symbol,
          pendingBonusReward: pendingTokens?.pendingBonusToken,
          bonusAprPercent
        }]
      }

      const rewardsInfo = await getRewards()

      return {
        globalTotalStake,
        rewardsInfo,
        tokens,
        totalStakedUSD,
        globalTotalStakeUSD,
        pairPrice,
        reserves
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
