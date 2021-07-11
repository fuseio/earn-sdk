import { gql } from '@apollo/client'

export function getPairInfoQuery(address) {
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
