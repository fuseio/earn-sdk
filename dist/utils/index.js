"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChefSubgraph = exports.getChef = exports.calculateApy = exports.calculateReserves = exports.numberToWei = exports.weiToNumber = void 0;
const bignumber_js_1 = require("bignumber.js");
const constants_1 = require("../constants");
const graphql_1 = require("../graphql");
const ChefRewardProgram_1 = require("../rewards/ChefRewardProgram");
function weiToNumber(value, decimals = 18) {
    return new bignumber_js_1.BigNumber(value).div(Math.pow(10, decimals)).toNumber();
}
exports.weiToNumber = weiToNumber;
function numberToWei(value, decimals = 18) {
    return !value
        ? '0'
        : new bignumber_js_1.BigNumber(value).multipliedBy(Math.pow(10, decimals)).toFixed();
}
exports.numberToWei = numberToWei;
function calculateReserves(globalTotalStake, totalSupply, totalReserve0, totalReserve1) {
    const reserve0 = new bignumber_js_1.BigNumber(globalTotalStake)
        .div(numberToWei(totalSupply))
        .multipliedBy(numberToWei(totalReserve0));
    const reserve1 = new bignumber_js_1.BigNumber(globalTotalStake)
        .div(numberToWei(totalSupply))
        .multipliedBy(numberToWei(totalReserve1));
    return [reserve0, reserve1];
}
exports.calculateReserves = calculateReserves;
function calculateApy(totalRewardsInUSD, globalTotalStakeUSD, duration) {
    const durationInDays = duration / (3600 * 24);
    return (totalRewardsInUSD / globalTotalStakeUSD) * (365 / durationInDays);
}
exports.calculateApy = calculateApy;
function getChef(address) {
    if (address.toLowerCase() === constants_1.MASTERCHEF_V2_ADDRESS.toLowerCase()) {
        return ChefRewardProgram_1.Chef.CHEF_V2;
    }
    else if (address.toLowerCase() === constants_1.MASTERCHEF_V3_ADDRESS.toLowerCase()) {
        return ChefRewardProgram_1.Chef.CHEF_V3;
    }
}
exports.getChef = getChef;
function getChefSubgraph(chef) {
    if (chef === ChefRewardProgram_1.Chef.CHEF_V2) {
        return graphql_1.masterChefV2Client;
    }
    else if (chef === ChefRewardProgram_1.Chef.CHEF_V3) {
        return graphql_1.masterChefV3Client;
    }
}
exports.getChefSubgraph = getChefSubgraph;
