"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const Pair_json_1 = __importDefault(require("../constants/abi/Pair.json"));
const graphql_1 = require("../graphql");
const query_1 = require("../graphql/query");
const _1 = require(".");
const fetchCoingeckoTokenPrice_1 = __importStar(require("./fetchCoingeckoTokenPrice"));
const fetchTokenInfo_1 = __importDefault(require("./fetchTokenInfo"));
const eth_1 = require("./eth");
function fetchPairInfoContract(address, networkId, web3) {
    return __awaiter(this, void 0, void 0, function* () {
        const assetPlatform = fetchCoingeckoTokenPrice_1.getAssetPlatform(networkId);
        if (!assetPlatform)
            return;
        const token0Address = yield eth_1.ethCall(address, 'token0', Pair_json_1.default, web3);
        const token0 = yield fetchTokenInfo_1.default(token0Address, web3);
        const token0Price = yield fetchCoingeckoTokenPrice_1.default(token0Address, assetPlatform);
        const token1Address = yield eth_1.ethCall(address, 'token1', Pair_json_1.default, web3);
        const token1 = yield fetchTokenInfo_1.default(token1Address, web3);
        const token1Price = yield fetchCoingeckoTokenPrice_1.default(token1Address, assetPlatform);
        const reserves = yield eth_1.ethCall(address, 'getReserves', Pair_json_1.default, web3);
        const totalReserve0 = _1.weiToNumber(reserves[0]);
        const totalReserve1 = _1.weiToNumber(reserves[1]);
        const totalSupply = yield eth_1.ethCall(address, 'totalSupply', Pair_json_1.default, web3);
        return {
            totalReserve0,
            totalReserve1,
            token0,
            token1,
            totalSupply: _1.weiToNumber(totalSupply),
            reserveUSD: totalReserve0 * token0Price + totalReserve1 * token1Price
        };
    });
}
function fetchPairInfoUniswap(address) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield graphql_1.uniswapClient.query({
            query: query_1.pairQuery(address)
        });
        return {
            reserveUSD: (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.pair) === null || _b === void 0 ? void 0 : _b.reserveUSD,
            totalSupply: (_d = (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.pair) === null || _d === void 0 ? void 0 : _d.totalSupply,
            token0: (_f = (_e = result === null || result === void 0 ? void 0 : result.data) === null || _e === void 0 ? void 0 : _e.pair) === null || _f === void 0 ? void 0 : _f.token0,
            token1: (_h = (_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.pair) === null || _h === void 0 ? void 0 : _h.token1,
            totalReserve0: (_k = (_j = result === null || result === void 0 ? void 0 : result.data) === null || _j === void 0 ? void 0 : _j.pair) === null || _k === void 0 ? void 0 : _k.reserve0,
            totalReserve1: (_m = (_l = result === null || result === void 0 ? void 0 : result.data) === null || _l === void 0 ? void 0 : _l.pair) === null || _m === void 0 ? void 0 : _m.reserve1
        };
    });
}
function fetchPairInfoFuseswap(address) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield graphql_1.fuseswapClient.query({
            query: query_1.pairQuery(address)
        });
        return {
            reserveUSD: (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.pair) === null || _b === void 0 ? void 0 : _b.reserveUSD,
            totalSupply: (_d = (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.pair) === null || _d === void 0 ? void 0 : _d.totalSupply,
            token0: (_f = (_e = result === null || result === void 0 ? void 0 : result.data) === null || _e === void 0 ? void 0 : _e.pair) === null || _f === void 0 ? void 0 : _f.token0,
            token1: (_h = (_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.pair) === null || _h === void 0 ? void 0 : _h.token1,
            totalReserve0: (_k = (_j = result === null || result === void 0 ? void 0 : result.data) === null || _j === void 0 ? void 0 : _j.pair) === null || _k === void 0 ? void 0 : _k.reserve0,
            totalReserve1: (_m = (_l = result === null || result === void 0 ? void 0 : result.data) === null || _l === void 0 ? void 0 : _l.pair) === null || _m === void 0 ? void 0 : _m.reserve1
        };
    });
}
function fetchPairInfo(address, networkId, web3) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (networkId) {
            case constants_1.NetworkId.ETHEREUM: {
                return yield fetchPairInfoUniswap(address);
            }
            case constants_1.NetworkId.BSC: {
                return yield fetchPairInfoContract(address, networkId, web3);
            }
            case constants_1.NetworkId.FUSE: {
                return yield fetchPairInfoFuseswap(address);
            }
        }
    });
}
exports.default = fetchPairInfo;
