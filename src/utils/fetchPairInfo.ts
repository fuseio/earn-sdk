import { NetworkId } from '../constants'
import { fuseswapClient, pancakeswapClient, uniswapClient } from '../graphql'
import { getPairInfoQuery } from '../graphql/query'

function fetchPairInfoUniswap (address: string) {
  return uniswapClient.query({
    query: getPairInfoQuery(address)
  })
}

function fetchPairInfoFuseswap (address: string) {
  return fuseswapClient.query({
    query: getPairInfoQuery(address)
  })
}

function fetchPairInfoPancakeswap (address: string) {
  return pancakeswapClient.query({
    query: getPairInfoQuery(address)
  })
}

export default async function fetchPairInfo (address: string, networkId: number): Promise<any> {
  let result

  switch (networkId as NetworkId) {
    case NetworkId.ETHEREUM:
      result = await fetchPairInfoUniswap(address)
      break
    case NetworkId.BSC:
      result = await fetchPairInfoPancakeswap(address)
      break
    case NetworkId.FUSE:
      result = await fetchPairInfoFuseswap(address)
      break
  }

  const pair = result?.data?.pair

  return {
    reserveUSD: pair?.reserveUSD,
    totalSupply: pair?.totalSupply,
    token0: pair?.token0,
    token1: pair?.token1,
    totalReserve0: pair?.reserve0,
    totalReserve1: pair?.reserve1
  }
}
