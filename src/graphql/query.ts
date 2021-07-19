import { gql } from '@apollo/client/core'

export function getPairInfoQuery (address: string) {
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

export function getTokenPriceQuery (address: string) {
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

export function getTokenPriceQueryPancake (address: string) {
  return gql`
    {
      token(id: "${address.toLowerCase()}") {
        derivedBNB
      }
      bundle(id: "1") {
        bnbPrice
      }
    }
  `
}
