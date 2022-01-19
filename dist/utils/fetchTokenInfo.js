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
const Erc20_json_1 = __importDefault(require("../constants/abi/Erc20.json"));
const eth_1 = require("./eth");
function fetchTokenInfo(address, web3) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield eth_1.ethCall(address, 'name', Erc20_json_1.default, web3);
        const symbol = yield eth_1.ethCall(address, 'symbol', Erc20_json_1.default, web3);
        const decimals = yield eth_1.ethCall(address, 'decimals', Erc20_json_1.default, web3);
        return {
            name,
            symbol,
            decimals
        };
    });
}
exports.default = fetchTokenInfo;
