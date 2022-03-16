enum JsonRpc {
  EthSendTransaction,
  EthCall,
}


interface MethodOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}
interface CallOptions extends MethodOptions {
  blockNumber?: number | string;
}

interface SendOptions extends CallOptions {
  value?: string;
}

function ethJsonRpc (
  jsonRpcMethod: JsonRpc,
  address: string,
  method: string,
  abi: any,
  web3: any,
  parameters: any[] = [],
  methodOptions: MethodOptions,
) {
  const contract = new web3.eth.Contract(abi, address)

  if (jsonRpcMethod === JsonRpc.EthSendTransaction) {
    return contract.methods[method](...parameters)
      .send(methodOptions)
  } else if (jsonRpcMethod === JsonRpc.EthCall) {
    return contract.methods[method](...parameters)
      .call(methodOptions, (methodOptions as SendOptions).blockNumber)
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
  parameters: any[] = [],
  callOptions: CallOptions = {}
) {
  return ethJsonRpc(JsonRpc.EthCall, address, method, abi, web3, parameters, callOptions)
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
  methodOptions: CallOptions = {}
) {
  return ethJsonRpc(JsonRpc.EthSendTransaction, address, method, abi, web3, parameters, methodOptions)
}
