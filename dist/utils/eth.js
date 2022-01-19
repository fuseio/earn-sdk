"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethTransaction = exports.ethCall = void 0;
var JsonRpc;
(function (JsonRpc) {
    JsonRpc[JsonRpc["EthSendTransaction"] = 0] = "EthSendTransaction";
    JsonRpc[JsonRpc["EthCall"] = 1] = "EthCall";
})(JsonRpc || (JsonRpc = {}));
function ethJsonRpc(jsonRpcMethod, address, method, abi, web3, parameters = [], account) {
    const contract = new web3.eth.Contract(abi, address);
    if (jsonRpcMethod === JsonRpc.EthSendTransaction) {
        return contract.methods[method](...parameters)
            .send({ from: account });
    }
    else if (jsonRpcMethod === JsonRpc.EthCall) {
        return contract.methods[method](...parameters)
            .call();
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
function ethCall(address, method, abi, web3, parameters = []) {
    return ethJsonRpc(JsonRpc.EthCall, address, method, abi, web3, parameters);
}
exports.ethCall = ethCall;
/**
 * Generic method for invoking JSON RPC's `eth_sendTransaction`
 *
 * @param address the address the transaction is sent to
 * @param method the method to invoke on the smart contract
 * @param abi The abi for the smart contract
 * @param web3 The ethereum provider or signer
 * @param parameters The args to pass to the method
 */
function ethTransaction(address, method, abi, web3, parameters = [], account) {
    return ethJsonRpc(JsonRpc.EthSendTransaction, address, method, abi, web3, parameters, account);
}
exports.ethTransaction = ethTransaction;
