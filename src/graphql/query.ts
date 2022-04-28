import { gql } from '@apollo/client/core'

export function pairQuery (address: string) {
  return gql`
      {
        pair(id: "${address.toLowerCase()}") {
          reserveUSD
          reserve0
          reserve1
          totalSupply
          token0 {
            id
            name
            symbol
          }
          token1 {
            id
            name
            symbol
          }
        }
      }
    `
}

export function stablePoolQuery (poolAddress: string) {
  return gql`
    {
      swap(id: "${poolAddress.toLowerCase()}") {
        numTokens
        balances
        lpTokenSupply
        virtualPrice
        tokens {
          id
          name
          symbol
        }
      }
    }
  `
}

export function tokenPriceQuery (address: string) {
  return gql`
        {
            token(id: "${address.toLowerCase()}") {
                derivedETH
            }
            bundle(id: "1") {
                ethPrice
            }
        }
    `
}

export function userQuery (pid: number, account: string) {
  return gql`
    {
      user(id: "${pid}-${account.toLowerCase()}") {
        id
        amount
        voltHarvested
      }
    }
  `
}

export function poolQuery (pid: number) {
  return gql`
    {
      pool(id: "${pid}") {
        balance
        allocPoint
        owner {
          voltPerSec
          totalAllocPoint
        }
        rewarder {
          rewardToken
          name
          symbol
          decimals
          tokenPerSec
        }
      }
    }
  `
}
