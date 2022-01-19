"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
class RewardProgram {
    constructor(stakingAddress, provider) {
        this.stakingAddress = stakingAddress;
        this.web3 = new web3_1.default(provider);
    }
}
exports.default = RewardProgram;
