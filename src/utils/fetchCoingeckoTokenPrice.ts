import fetch from 'cross-fetch'
import { NetworkId } from '../constants'

export function getAssetPlatform (networkId) {
  switch (networkId) {
    case NetworkId.ETHEREUM:
      return 'ethereum'
    case NetworkId.BSC:
      return 'binance-smart-chain'
  }
}

export default async function fetchCoingeckoTokenPrice (address: string, assetPlatform?: string, vsCurrencies = 'usd') {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?contract_addresses=${address}&vs_currencies=${vsCurrencies}`)
  const json = await response.json()
  return json[address.toLowerCase()][vsCurrencies]
}
