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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const graphql_1 = require("../graphql");
const query_1 = require("../graphql/query");
const fetchCoingeckoTokenPrice_1 = __importStar(require("./fetchCoingeckoTokenPrice"));
function fetchTokenPriceUniswap(address) {
    return graphql_1.uniswapClient.query({
        query: query_1.tokenPriceQuery(address)
    });
}
function fetchTokenPriceFuseswap(address) {
    return graphql_1.fuseswapClient.query({
        query: query_1.tokenPriceQuery(address)
    });
}
function fetchTokenPrice(address, networkId) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        if (!address)
            return;
        switch (networkId) {
            case constants_1.NetworkId.ETHEREUM: {
                const result = yield fetchTokenPriceUniswap(address);
                return ((_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.derivedETH) * ((_d = (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.bundle) === null || _d === void 0 ? void 0 : _d.ethPrice);
            }
            case constants_1.NetworkId.BSC: {
                return yield fetchCoingeckoTokenPrice_1.default(address, fetchCoingeckoTokenPrice_1.getAssetPlatform(networkId));
            }
            case constants_1.NetworkId.FUSE: {
                const result = yield fetchTokenPriceFuseswap(address);
                return ((_f = (_e = result === null || result === void 0 ? void 0 : result.data) === null || _e === void 0 ? void 0 : _e.token) === null || _f === void 0 ? void 0 : _f.derivedETH) * ((_h = (_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.bundle) === null || _h === void 0 ? void 0 : _h.ethPrice);
            }
        }
    });
}
exports.default = fetchTokenPrice;
