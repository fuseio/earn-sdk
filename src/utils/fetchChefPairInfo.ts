import { NetworkId } from '../constants'
import { pairQuery } from '../graphql/query'
import { voltageClient } from '../graphql'

async function fetchPairInfoVoltage (address: string) {
  const result = await voltageClient.query({
    query: pairQuery(address)
  })
  return {
    reserveUSD: result?.data?.pair?.reserveUSD,
    totalSupply: result?.data?.pair?.totalSupply,
    token0: result?.data?.pair?.token0,
    token1: result?.data?.pair?.token1,
    totalReserve0: result?.data?.pair?.reserve0,
    totalReserve1: result?.data?.pair?.reserve1
  }
}

export default async function fetchChefPairInfo (address: string, networkId: number): Promise<any> {
  switch (networkId as NetworkId) {
    case NetworkId.FUSE: {
      return await fetchPairInfoVoltage(address)
    }
  }
}
