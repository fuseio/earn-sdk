"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterChefV3Client = exports.masterChefV2Client = exports.pancakeswapClient = exports.fuseswapClient = exports.uniswapClient = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const core_1 = require("@apollo/client/core");
const constants_1 = require("../constants");
exports.uniswapClient = new core_1.ApolloClient({
    link: new core_1.HttpLink({ uri: constants_1.UNISWAP_SUBGRAPH_URL, fetch: cross_fetch_1.default }),
    cache: new core_1.InMemoryCache()
});
exports.fuseswapClient = new core_1.ApolloClient({
    link: new core_1.HttpLink({ uri: constants_1.FUSESWAP_SUBGRAPH_URL, fetch: cross_fetch_1.default }),
    cache: new core_1.InMemoryCache()
});
exports.pancakeswapClient = new core_1.ApolloClient({
    link: new core_1.HttpLink({ uri: constants_1.PANCAKESWAP_SUBGRAPH_URL, fetch: cross_fetch_1.default }),
    cache: new core_1.InMemoryCache()
});
exports.masterChefV2Client = new core_1.ApolloClient({
    link: new core_1.HttpLink({ uri: constants_1.MASTERCHEF_V2_SUBGRAPH_URL, fetch: cross_fetch_1.default }),
    cache: new core_1.InMemoryCache()
});
exports.masterChefV3Client = new core_1.ApolloClient({
    link: new core_1.HttpLink({ uri: constants_1.MASTERCHEF_V3_SUBGRAPH_URL, fetch: cross_fetch_1.default }),
    cache: new core_1.InMemoryCache()
});
