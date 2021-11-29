import ERC20_ABI from '../constants/abi/Erc20.json'
import { ethCall } from './eth'

export default async function fetchTokenInfo (address: string, web3: any) {
  const name = await ethCall(address, 'name', ERC20_ABI, web3)
  const symbol = await ethCall(address, 'symbol', ERC20_ABI, web3)
  const decimals = await ethCall(address, 'decimals', ERC20_ABI, web3)

  return {
    name,
    symbol,
    decimals
  }
}
