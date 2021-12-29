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

export function poolQuery (pid: number, account: string) {
  return gql`
    {
      users(where: { address: "${account.toLowerCase()}", pool: "${pid}" }) {
        id
        pool {
          owner {
            voltPerSec
            totalAllocPoint
          }
          balance
          voltHarvested
          allocPoint
        }
        amount
      }
    }
  `
}
