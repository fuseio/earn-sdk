"use strict";
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
exports.getAssetPlatform = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const constants_1 = require("../constants");
function getAssetPlatform(networkId) {
    switch (networkId) {
        case constants_1.NetworkId.ETHEREUM:
            return 'ethereum';
        case constants_1.NetworkId.BSC:
            return 'binance-smart-chain';
    }
}
exports.getAssetPlatform = getAssetPlatform;
function fetchCoingeckoTokenPrice(address, assetPlatform, vsCurrencies = 'usd') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield cross_fetch_1.default(`https://api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?contract_addresses=${address}&vs_currencies=${vsCurrencies}`);
        const json = yield response.json();
        return json[address.toLowerCase()][vsCurrencies];
    });
}
exports.default = fetchCoingeckoTokenPrice;
