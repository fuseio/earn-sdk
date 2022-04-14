import { NetworkId } from '../constants'
import { pairQuery, stablePoolQuery } from '../graphql/query'
import { stableswapClient, voltageClient } from '../graphql'
import { isStableswap, weiToNumber } from '.'
import fetchTokenPrice from './fetchTokenPrice'

async function fetchPairInfoVoltage (address: string) {
  let result
  if (isStableswap(address)) {
    result = await stableswapClient.query({
      query: stablePoolQuery(address)
    })
    const tokens = result?.data?.swaps?.tokens?.map((token) => token?.id)
    const reserves = result?.data?.swaps?.balances
    const pooledTokensUsd = result?.data?.swaps?.balanes?.map(async (balance, i) => (await fetchTokenPrice(tokens[i], NetworkId.FUSE)) * balance)
    return {
      reserveUSD: pooledTokensUsd?.reduce((mem, balanceUsd, i) => mem + weiToNumber(balanceUsd, result?.data?.swaps?.tokens?.[i]?.decimals)),
      totalSupply: result?.data?.swaps?.lpTokenSupply,
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
