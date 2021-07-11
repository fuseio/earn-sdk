import { NetworkId } from '../constants'
import { fuseswapClient, pancakeswapClient, uniswapClient } from '../graphql'
import { getPairInfoQuery } from '../graphql/query'

function fetchPairInfoUniswap(address: string) {
  return uniswapClient.query({
    query: getPairInfoQuery(address),
  })
}

function fetchPairInfoFuseswap(address: string) {
  return fuseswapClient.query({
    query: getPairInfoQuery(address),
  })
}

function fetchPairInfoPancakeswap(address: string) {
  return pancakeswapClient.query({
    query: getPairInfoQuery(address),
  })
}

export default function fetchPairInfo(address: string, networkId: number): Promise<any> | undefined {
  switch (networkId as NetworkId) {
    case NetworkId.ETHEREUM:
      return fetchPairInfoUniswap(address)
    case NetworkId.BSC:
      return fetchPairInfoPancakeswap(address)
    case NetworkId.FUSE:
      return fetchPairInfoFuseswap(address)
  }
}
