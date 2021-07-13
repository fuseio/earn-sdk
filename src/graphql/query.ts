import { gql } from '@apollo/client/core'

export function getPairInfoQuery (address: string) {
  return gql`
      {
        pair(id: "${address.toLowerCase()}") {
          untrackedVolumeUSD
          reserveETH
          reserveUSD
          token0Price
          token1Price
          volumeUSD
          liquidityProviderCount
          reserve0
          reserve1
          trackedReserveETH
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
