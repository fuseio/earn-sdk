import { NetworkId } from '../constants'
import { voltageClient } from '../graphql'
import { tokenPriceQuery } from '../graphql/query'

function fetchTokenPriceVoltage (address: string) {
  return voltageClient.query({
    query: tokenPriceQuery(address)
  })
}

export default async function fetchVoltageTokenPrice (address: string | undefined, networkId: number): Promise<any> {
  if (!address) return

  switch (networkId as NetworkId) {
    case NetworkId.FUSE: {
      const result = await fetchTokenPriceVoltage(address)
      return result?.data?.token?.derivedETH * result?.data?.bundle?.ethPrice
    }
  }
}
