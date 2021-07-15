import { NetworkId } from '../constants'
import { fuseswapClient, pancakeswapClient, uniswapClient } from '../graphql'
import { getTokenPriceQuery, getTokenPriceQueryPancake } from '../graphql/query'

function fetchTokenPriceUniswap (address: string) {
  return uniswapClient.query({
    query: getTokenPriceQuery(address)
  })
}

function fetchPairInfoFuseswap (address: string) {
  return fuseswapClient.query({
    query: getTokenPriceQuery(address)
  })
}

function fetchPairInfoPancakeswap (address: string) {
  return pancakeswapClient.query({
    query: getTokenPriceQueryPancake(address)
  })
}

export default async function fetchTokenPrice (address: string | undefined, networkId: number): Promise<any> {
  if (!address) return

  let result, derived: string, price: string
  switch (networkId as NetworkId) {
    case NetworkId.ETHEREUM:
      derived = 'derivedETH'
      price = 'ethPrice'
      result = await fetchTokenPriceUniswap(address)
      break
    case NetworkId.BSC:
      derived = 'derivedBNB'
      price = 'bnbPrice'
      result = await fetchPairInfoPancakeswap(address)
      break
    case NetworkId.FUSE:
      derived = 'derivedETH'
      price = 'ethPrice'
      result = await fetchPairInfoFuseswap(address)
      break
  }

  return result?.data?.token?.[derived] * result?.data?.bundle?.[price]
}
