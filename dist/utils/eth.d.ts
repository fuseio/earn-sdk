/**
 * Generic method for invoking JSON RPC's `eth_call`
 *
 * @param address the address the transaction is sent to
 * @param method the method to invoke on the smart contract
 * @param abi The abi for the smart contract
 * @param web3 The ethereum provider or signer
 * @param parameters The args to pass to the method
 */
export declare function ethCall(address: string, method: string, abi: any, web3: any, parameters?: any[]): any;
/**
 * Generic method for invoking JSON RPC's `eth_sendTransaction`
 *
 * @param address the address the transaction is sent to
 * @param method the method to invoke on the smart contract
 * @param abi The abi for the smart contract
 * @param web3 The ethereum provider or signer
 * @param parameters The args to pass to the method
 */
export declare function ethTransaction(address: string, method: string, abi: any, web3: any, parameters: any[] | undefined, account: string): any;
