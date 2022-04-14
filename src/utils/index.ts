import { BigNumber } from 'bignumber.js'
import { MASTERCHEF_V2_ADDRESS, MASTERCHEF_V3_ADDRESS, STABLESWAP_POOLS } from '../constants'
import { masterChefV2Client, masterChefV3Client } from '../graphql'
import { Chef } from '../rewards/ChefRewardProgram'

export function weiToNumber (value: string | BigNumber, decimals = 18): number {
  return new BigNumber(value).div(10 ** decimals).toNumber()
}

export function numberToWei (value: string, decimals = 18): string {
  return !value
    ? '0'
    : new BigNumber(value).multipliedBy(10 ** decimals).toFixed()
}

export function calculateReserves (
  globalTotalStake: string,
  totalSupply: string,
  totalReserves: string[]
) {
  const reserves = totalReserves.map(
    (totalReserve) =>
      new BigNumber(globalTotalStake)
        .div(numberToWei(totalSupply))
        .multipliedBy(numberToWei(totalReserve)))
  return reserves
}

export function calculateApy (
  totalRewardsInUSD: number,
  globalTotalStakeUSD: number,
  duration: number
) {
  const durationInDays = duration / (3600 * 24)
  return (totalRewardsInUSD / globalTotalStakeUSD) * (365 / durationInDays)
}

export function getChef (address: string) {
  if (address.toLowerCase() === MASTERCHEF_V2_ADDRESS.toLowerCase()) {
    return Chef.CHEF_V2
  } else if (address.toLowerCase() === MASTERCHEF_V3_ADDRESS.toLowerCase()) {
    return Chef.CHEF_V3
  }
}

export function getChefSubgraph (chef: Chef) {
  if (chef === Chef.CHEF_V2) {
    return masterChefV2Client
  } else if (chef === Chef.CHEF_V3) {
    return masterChefV3Client
  }
}

export function isStableswap (address: string) {
  return STABLESWAP_POOLS.includes(address)
}
