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
exports.Chef = void 0;
const RewardProgam_1 = __importDefault(require("./RewardProgam"));
const MasterChef_json_1 = __importDefault(require("../constants/abi/MasterChef.json"));
const utils_1 = require("../utils");
const eth_1 = require("../utils/eth");
const fetchPairInfo_1 = __importDefault(require("../utils/fetchPairInfo"));
// import fetchTokenPrice from '../utils/fetchTokenPrice'
const fetcher_1 = require("../graphql/fetcher");
var Chef;
(function (Chef) {
    Chef[Chef["CHEF_V2"] = 0] = "CHEF_V2";
    Chef[Chef["CHEF_V3"] = 1] = "CHEF_V3";
})(Chef = exports.Chef || (exports.Chef = {}));
class ChefRewardProgram extends RewardProgam_1.default {
    constructor(chefAddress, provider) {
        super(chefAddress, provider);
        this.chef = utils_1.getChef(chefAddress);
    }
    deposit(amount, account, pid) {
        return eth_1.ethTransaction(this.stakingAddress, 'deposit', MasterChef_json_1.default, this.web3, [pid, amount], account);
    }
    withdraw(amount, account, pid) {
        return eth_1.ethTransaction(this.stakingAddress, 'withdraw', MasterChef_json_1.default, this.web3, [pid, amount], account);
    }
    withdrawReward(account, pid) {
        return eth_1.ethTransaction(this.stakingAddress, 'deposit', MasterChef_json_1.default, this.web3, [pid, 0], account);
    }
    getStakerInfo(account, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield eth_1.ethCall(this.stakingAddress, 'userInfo', MasterChef_json_1.default, this.web3, [pid, account]);
            const user = yield fetcher_1.getChefUser(pid, account, this.chef);
            return [userInfo[0], user === null || user === void 0 ? void 0 : user.voltHarvested];
        });
    }
    getStats(account, pairAddress, networkId, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield fetcher_1.getChefPool(pid, this.chef);
            const user = yield fetcher_1.getChefUser(pid, account, this.chef);
            const globalTotalStake = pool === null || pool === void 0 ? void 0 : pool.balance;
            const userTotalStaked = utils_1.weiToNumber(user === null || user === void 0 ? void 0 : user.amount).toString();
            const { 
            // reserveUSD,
            totalSupply, token0, token1, totalReserve0, totalReserve1 } = yield fetchPairInfo_1.default(pairAddress, networkId, this.web3);
            const [reserve0, reserve1] = utils_1.calculateReserves(globalTotalStake, totalSupply, totalReserve0, totalReserve1);
            const pairPrice = 0.9;
            const totalStakedUSD = utils_1.weiToNumber(userTotalStaked) * pairPrice;
            const globalTotalStakeUSD = utils_1.weiToNumber(globalTotalStake) * pairPrice;
            const getRewards = () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const pendingTokens = yield eth_1.ethCall(this.stakingAddress, 'pendingTokens', MasterChef_json_1.default, this.web3, [pid, account]);
                // const voltAddress = await ethCall(
                //   this.stakingAddress,
                //   'volt',
                //   ABI,
                //   this.web3,
                //   []
                // )
                const voltPerSec = (((_a = pool === null || pool === void 0 ? void 0 : pool.owner) === null || _a === void 0 ? void 0 : _a.voltPerSec) / 1e18);
                // const voltPrice = await fetchTokenPrice(voltAddress, networkId)
                const voltPrice = 0.002;
                const rewardPerSec = ((pool === null || pool === void 0 ? void 0 : pool.allocPoint) / ((_b = pool === null || pool === void 0 ? void 0 : pool.owner) === null || _b === void 0 ? void 0 : _b.totalAllocPoint)) * voltPerSec;
                const rewardPerDay = rewardPerSec * 3600 * 24;
                const rewardPerDayUSD = rewardPerDay * voltPrice;
                const roiPerSec = (rewardPerSec * voltPrice) / globalTotalStakeUSD;
                const aprPercent = roiPerSec * 12 * 30 * 24 * 3600;
                return [{
                        rewardPerDay,
                        rewardPerDayUSD,
                        accuruedRewards: pendingTokens[0],
                        apyPercent: aprPercent,
                        rewardRate: 0
                    }];
            });
            const rewardsInfo = yield getRewards();
            return {
                globalTotalStake,
                rewardsInfo,
                token0,
                token1,
                totalStakedUSD,
                globalTotalStakeUSD,
                pairPrice,
                reserve0: reserve0.toFixed(),
                reserve1: reserve1.toFixed()
            };
        });
    }
    getStakingTimes() {
        return {
            start: Infinity,
            duration: Infinity,
            end: Infinity
        };
    }
}
exports.default = ChefRewardProgram;
