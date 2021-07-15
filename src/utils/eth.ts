enum JsonRpc {
  EthSendTransaction,
  EthCall,
}

function ethJsonRpc (
  jsonRpcMethod: JsonRpc,
  address: string,
  method: string,
  abi: any,
  web3: any,
  parameters: any[] = [],
  account?: string
) {
  const contract = new web3.eth.Contract(abi, address)

  if (jsonRpcMethod === JsonRpc.EthSendTransaction) {
    return contract.methods[method](...parameters)
      .send({ from: account })
  } else if (jsonRpcMethod === JsonRpc.EthCall) {
    return contract.methods[method](...parameters)
      .call()
  }
}

/**
 * Generic method for invoking JSON RPC's `eth_call`
 *
 * @param address the address the transaction is sent to
 * @param method the method to invoke on the smart contract
 * @param abi The abi for the smart contract
 * @param web3 The ethereum provider or signer
 * @param parameters The args to pass to the method
 */
export function ethCall (
  address: string,
  method: string,
  abi: any,
  web3: any,
  parameters: any[] = []
) {
  return ethJsonRpc(JsonRpc.EthCall, address, method, abi, web3, parameters)
}

/**
 * Generic method for invoking JSON RPC's `eth_sendTransaction`
 *
 * @param address the address the transaction is sent to
 * @param method the method to invoke on the smart contract
 * @param abi The abi for the smart contract
 * @param web3 The ethereum provider or signer
 * @param parameters The args to pass to the method
 */
export function ethTransaction (
  address: string,
  method: string,
  abi: any,
  web3: any,
  parameters: any[] = [],
  account: string
) {
  return ethJsonRpc(JsonRpc.EthSendTransaction, address, method, abi, web3, parameters, account)
}
