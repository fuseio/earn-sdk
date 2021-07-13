import { NetworkId } from '../constants'
import { fuseswapClient, pancakeswapClient, uniswapClient } from '../graphql'
import { getTokenPriceQuery } from '../graphql/query'

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
    query: getTokenPriceQuery(address)
  })
}

export default async function fetchTokenPrice (address: string | undefined, networkId: number): Promise<any> {
  if (!address) return

  let result
  switch (networkId as NetworkId) {
    case NetworkId.ETHEREUM:
      result = await fetchTokenPriceUniswap(address)
      break
    case NetworkId.BSC:
      result = await fetchPairInfoPancakeswap(address)
      break
    case NetworkId.FUSE:
      result = await fetchPairInfoFuseswap(address)
      break
  }

  return result?.data?.token?.derivedETH * result?.data?.bundle?.ethPrice
}
