"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MASTERCHEF_V3_SUBGRAPH_URL = exports.MASTERCHEF_V2_SUBGRAPH_URL = exports.MASTERCHEF_V3_ADDRESS = exports.MASTERCHEF_V2_ADDRESS = exports.PANCAKESWAP_SUBGRAPH_URL = exports.FUSESWAP_SUBGRAPH_URL = exports.UNISWAP_SUBGRAPH_URL = exports.NetworkId = void 0;
var NetworkId;
(function (NetworkId) {
    NetworkId[NetworkId["ETHEREUM"] = 1] = "ETHEREUM";
    NetworkId[NetworkId["BSC"] = 56] = "BSC";
    NetworkId[NetworkId["FUSE"] = 122] = "FUSE";
})(NetworkId = exports.NetworkId || (exports.NetworkId = {}));
exports.UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
exports.FUSESWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/fuseio/fuseswap';
exports.PANCAKESWAP_SUBGRAPH_URL = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2';
exports.MASTERCHEF_V2_ADDRESS = '0x89c77020558a5BAE4e3D873BA1615Aaf4eEd83e7';
exports.MASTERCHEF_V3_ADDRESS = '0x7c416513BEf5D21950af85742d9644F387Dd08F4';
exports.MASTERCHEF_V2_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/mul53/masterchefv2';
exports.MASTERCHEF_V3_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/mul53/masterchefv3';
