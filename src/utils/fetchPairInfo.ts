import { NetworkId } from '../constants'
import PAIR_ABI from '../constants/abi/Pair.json'
import { fuseswapClient, uniswapClient } from '../graphql'
import { getPairInfoQuery } from '../graphql/query'
import { weiToNumber } from '.'
import fetchCoingeckoTokenPrice, { getAssetPlatform } from './fetchCoingeckoTokenPrice'
import fetchTokenInfo from './fetchTokenInfo'
import { ethCall } from './eth'

async function fetchPairInfoContract (address: string, networkId: number, web3: any) {
  const assetPlatform = getAssetPlatform(networkId)
  if (!assetPlatform) return

  const token0Address = await ethCall(address, 'token0', PAIR_ABI, web3)
  const token0 = await fetchTokenInfo(token0Address, web3)
  const token0Price = await fetchCoingeckoTokenPrice(token0Address, assetPlatform)

  const token1Address = await ethCall(address, 'token1', PAIR_ABI, web3)
  const token1 = await fetchTokenInfo(token1Address, web3)
  const token1Price = await fetchCoingeckoTokenPrice(token1Address, assetPlatform)

  const reserves = await ethCall(address, 'getReserves', PAIR_ABI, web3)
  const totalReserve0 = weiToNumber(reserves[0])
  const totalReserve1 = weiToNumber(reserves[1])

  const totalSupply = await ethCall(address, 'totalSupply', PAIR_ABI, web3)

  return {
    totalReserve0,
    totalReserve1,
    token0,
    token1,
    totalSupply: weiToNumber(totalSupply),
    reserveUSD: totalReserve0 * token0Price + totalReserve1 * token1Price
  }
}

async function fetchPairInfoUniswap (address: string) {
  const result = await uniswapClient.query({
    query: getPairInfoQuery(address)
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

async function fetchPairInfoFuseswap (address: string) {
  const result = await fuseswapClient.query({
    query: getPairInfoQuery(address)
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

export default async function fetchPairInfo (address: string, networkId: number, web3: any): Promise<any> {
  switch (networkId as NetworkId) {
    case NetworkId.ETHEREUM: {
      return await fetchPairInfoUniswap(address)
    }
    case NetworkId.BSC: {
      return await fetchPairInfoContract(address, networkId, web3)
    }
    case NetworkId.FUSE: {
      return await fetchPairInfoFuseswap(address)
    }
  }
}
