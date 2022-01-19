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
const eth_1 = require("../utils/eth");
const MultiRewardProgram_json_1 = __importDefault(require("../constants/abi/MultiRewardProgram.json"));
const Erc20_json_1 = __importDefault(require("../constants/abi/Erc20.json"));
const RewardProgam_1 = __importDefault(require("./RewardProgam"));
const fetchPairInfo_1 = __importDefault(require("../utils/fetchPairInfo"));
const utils_1 = require("../utils");
const fetchTokenPrice_1 = __importDefault(require("../utils/fetchTokenPrice"));
/**
 * Create a new MultiRewardProgram which represents a multi reward
 * contract on the fuse network. The instance provides basic functionality
 * for interacting with the contract.
 *
 * e.g with web3.js
 * ```typescript
 * import Web3 from 'web3'
 * import { MultiRewardProgram } from '@fuseio/earn-sdk'
 *
 * const stakingAddress = '0x'
 * const web3Provider = new Web3('https://rpc.fuse.io')
 * const rewardProgram = new MultiRewardProgram(stakingAddress, web3Provider)
 * ```
 */
class MultiRewardProgram extends RewardProgam_1.default {
    // eslint-disable-next-line no-useless-constructor
    constructor(stakingAddress, provider) {
        super(stakingAddress, provider);
    }
    /**
     * Deposit the provided amount of the staking token into the staking contract
     *
     * ```typescript
     * rewardProgram.deposit(
     *    '1000000000000000000',
     *    '0x'
     * )
     * ```
     * @param amount the number of staking tokens to deposit
     * @param account the account sending the transaction
     */
    deposit(amount, account) {
        return eth_1.ethTransaction(this.stakingAddress, 'stake', MultiRewardProgram_json_1.default, this.web3, [amount], account);
    }
    /**
     * Withdraw the provided amount of the staking token from the staking contract
     *
     * ```typescript
     * rewardProgram.withdraw(
     *   '1000000000000000000',
     *   '0x'
     * )
     * ```
     * @param amount the number of staking tokens to withdraw
     * @param account the account sending the transaction
     */
    withdraw(amount, account) {
        return eth_1.ethTransaction(this.stakingAddress, 'withdraw', MultiRewardProgram_json_1.default, this.web3, [amount], account);
    }
    /**
     * Withdraw the rewards accured
     *
     * ```typescript
     * rewardProgram.withdrawReward(
     *   '0x'
     * )
     * ```
     * @param account the account sending the transaction
     */
    withdrawReward(account) {
        return eth_1.ethTransaction(this.stakingAddress, 'getReward', MultiRewardProgram_json_1.default, this.web3, [], account);
    }
    /**
     * Get reward information for the provided address and rewardToken
     *
     * ```typescript
     * rewardProgram.getStakerInfo(
     *   '0x',
     *   '0x00'
     * )
     * ```
     * @param account address to fetch the reward information for
     * @param rewardsToken rewardToken to fetch reward information for
     */
    getStakerInfo(account, rewardsToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalStaked = yield eth_1.ethCall(this.stakingAddress, 'balanceOf', MultiRewardProgram_json_1.default, this.web3, [account]);
            let totalWithdrawn = 0;
            if (rewardsToken) {
                totalWithdrawn = yield eth_1.ethCall(this.stakingAddress, 'userRewardPerTokenPaid', MultiRewardProgram_json_1.default, this.web3, [account, rewardsToken]);
            }
            return [totalStaked, totalWithdrawn];
        });
    }
    /**
     * Gets global reward stats for rewardProgram
     *
     * ```typescript
     * rewardProgram.getStats(
     *   '0x',
     *   '0x',
     *   122,
     *   ['0x']
     * )
     * ```
     * @param account the account to get stats for
     * @param pairAddress the address of the staking token
     * @param networkId the networkId where contract is deployed
     * @param rewards array of rewards offerred
     */
    getStats(account, pairAddress, networkId, rewards = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalTotalStake = yield eth_1.ethCall(this.stakingAddress, 'totalSupply', MultiRewardProgram_json_1.default, this.web3);
            const [userTotalStaked] = yield this.getStakerInfo(account);
            const { reserveUSD, totalSupply, token0, token1, totalReserve0, totalReserve1 } = yield fetchPairInfo_1.default(pairAddress, networkId, this.web3);
            const [reserve0, reserve1] = utils_1.calculateReserves(globalTotalStake, totalSupply, totalReserve0, totalReserve1);
            const pairPrice = reserveUSD / totalSupply;
            const totalStakedUSD = utils_1.weiToNumber(userTotalStaked) * pairPrice;
            const globalTotalStakeUSD = utils_1.weiToNumber(globalTotalStake) * pairPrice;
            const rewardsInfo = yield this.getRewardsInfo(account, networkId, globalTotalStake, globalTotalStakeUSD, rewards);
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
    /**
     * Gets the start, duration and end of staking
     * @param rewardsToken the reward to get time information for
     */
    getStakingTimes(rewardsToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const rewardData = yield eth_1.ethCall(this.stakingAddress, 'rewardData', MultiRewardProgram_json_1.default, this.web3, [rewardsToken]);
            const duration = rewardData.rewardsDuration;
            const end = rewardData.periodFinish;
            const start = end - duration;
            return {
                start: Number(start),
                duration: Number(duration),
                end: Number(end)
            };
        });
    }
    getRewardRate(reward) {
        return __awaiter(this, void 0, void 0, function* () {
            const rewardData = yield eth_1.ethCall(this.stakingAddress, 'rewardData', MultiRewardProgram_json_1.default, this.web3, [reward]);
            const rewardRate = rewardData.rewardRate;
            return rewardRate;
        });
    }
    getRewardsInfo(account, networkId, globalTotalStake, globalTotalStakeUSD, rewards = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const rewardsInfo = [];
            for (const reward of rewards) {
                const accuruedRewards = yield eth_1.ethCall(this.stakingAddress, 'earned', MultiRewardProgram_json_1.default, this.web3, [account, reward]);
                const rewardTokenDecimals = yield eth_1.ethCall(reward, 'decimals', Erc20_json_1.default, this.web3);
                const totalRewards = yield eth_1.ethCall(this.stakingAddress, 'getRewardForDuration', MultiRewardProgram_json_1.default, this.web3, [reward]);
                const { duration } = yield this.getStakingTimes(reward);
                const rewardRate = yield this.getRewardRate(reward);
                const rewardPrice = yield fetchTokenPrice_1.default(reward, networkId);
                const totalRewardsInUSD = utils_1.weiToNumber(totalRewards, rewardTokenDecimals) * rewardPrice;
                const apyPercent = utils_1.calculateApy(totalRewardsInUSD, globalTotalStakeUSD, duration);
                rewardsInfo.push({
                    totalRewards,
                    totalRewardsInUSD,
                    accuruedRewards,
                    apyPercent,
                    rewardRate
                });
            }
            return rewardsInfo;
        });
    }
}
exports.default = MultiRewardProgram;
