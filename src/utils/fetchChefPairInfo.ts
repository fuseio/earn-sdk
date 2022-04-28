import { NetworkId, STABLESWAP_POOL_LP_HASH } from '../constants'
import { pairQuery, stablePoolQuery } from '../graphql/query'
import { stableswapClient, voltageClient } from '../graphql'
import { isStableswap } from '.'

async function fetchPairInfoVoltage (address: string) {
  let result
  if (isStableswap(address)) {
    result = await stableswapClient.query({
      query: stablePoolQuery(STABLESWAP_POOL_LP_HASH[address.toLowerCase()])
    })
    const tokens = result?.data?.swap?.tokens
    const reserves = result?.data?.swap?.balances
    return {
      reserveUSD: result?.data?.swap?.lpTokenSupply * 1,
      totalSupply: result?.data?.swap?.lpTokenSupply,
      tokens,
      totalReserves: reserves
    }
  } else {
    result = await voltageClient.query({
      query: pairQuery(address)
    })
    return {
      reserveUSD: result?.data?.pair?.reserveUSD,
      totalSupply: result?.data?.pair?.totalSupply,
      tokens: [result?.data?.pair?.token0, result?.data?.pair?.token1],
      totalReserves: [result?.data?.pair?.reserve0, result?.data?.pair?.reserve1]
    }
  }
}

export default async function fetchChefPairInfo (address: string, networkId: number): Promise<any> {
  switch (networkId as NetworkId) {
    case NetworkId.FUSE: {
      return await fetchPairInfoVoltage(address)
    }
  }
}
