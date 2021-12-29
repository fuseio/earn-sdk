import { NetworkId } from '../constants'
import { fuseswapClient, uniswapClient } from '../graphql'
import { tokenPriceQuery } from '../graphql/query'
import fetchCoingeckoTokenPrice, { getAssetPlatform } from './fetchCoingeckoTokenPrice'

function fetchTokenPriceUniswap (address: string) {
  return uniswapClient.query({
    query: tokenPriceQuery(address)
  })
}

function fetchTokenPriceFuseswap (address: string) {
  return fuseswapClient.query({
    query: tokenPriceQuery(address)
  })
}

export default async function fetchTokenPrice (address: string | undefined, networkId: number): Promise<any> {
  if (!address) return

  switch (networkId as NetworkId) {
    case NetworkId.ETHEREUM: {
      const result = await fetchTokenPriceUniswap(address)
      return result?.data?.token?.derivedETH * result?.data?.bundle?.ethPrice
    }
    case NetworkId.BSC: {
      return await fetchCoingeckoTokenPrice(address, getAssetPlatform(networkId))
    }
    case NetworkId.FUSE: {
      const result = await fetchTokenPriceFuseswap(address)
      return result?.data?.token?.derivedETH * result?.data?.bundle?.ethPrice
    }
  }
}
