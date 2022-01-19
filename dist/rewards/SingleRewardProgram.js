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
const bignumber_js_1 = require("bignumber.js");
const RewardProgam_1 = __importDefault(require("./RewardProgam"));
const SingleRewardProgram_json_1 = __importDefault(require("../constants/abi/SingleRewardProgram.json"));
const fetchPairInfo_1 = __importDefault(require("../utils/fetchPairInfo"));
const fetchTokenPrice_1 = __importDefault(require("../utils/fetchTokenPrice"));
const utils_1 = require("../utils");
const eth_1 = require("../utils/eth");
/**
 * Create a new SingleRewardProgram which represents a single reward
 * contract on the fuse network. The instance provides basic functionality
 * for interacting with the contract.
 *
 * e.g with web3.js
 * ```typescript
 * import Web3 from 'web3'
 * import { SingleRewardProgram } from '@fuseio/earn-sdk'
 *
 * const stakingAddress = '0x'
 * const web3Provider = new Web3('https://rpc.fuse.io')
 * const rewardProgram = new SingleRewardProgram(stakingAddress, web3Provider)
 * ```
 */
class SingleRewardProgram extends RewardProgam_1.default {
    // eslint-disable-next-line no-useless-constructor
    constructor(stakingAddress, provider) {
        super(stakingAddress, provider);
    }
    /**
    * Deposit the provided amount of the staking token into the staking contract
    *
    * ```typescript
    * rewardProgram.deposit(
    *   '1000000000000000000',
    *   '0x'
    * )
    * ```
    * @param amount the number of staking tokens to deposit
    * @param account the account sending the transaction
    */
    deposit(amount, account) {
        return eth_1.ethTransaction(this.stakingAddress, 'stake', SingleRewardProgram_json_1.default, this.web3, [amount], account);
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
        return eth_1.ethTransaction(this.stakingAddress, 'withdrawStakeAndInterest', SingleRewardProgram_json_1.default, this.web3, [amount], account);
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
        return eth_1.ethTransaction(this.stakingAddress, 'withdrawInterest', SingleRewardProgram_json_1.default, this.web3, [], account);
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
     */
    getStakerInfo(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield eth_1.ethCall(this.stakingAddress, 'getStakerData', SingleRewardProgram_json_1.default, this.web3, [account]);
            return Object.values(result);
        });
    }
    getStatsData(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield eth_1.ethCall(this.stakingAddress, 'getStatsData', SingleRewardProgram_json_1.default, this.web3, [account]);
            return Object.values(result);
        });
    }
    /**
     * Gets the start, duration and end of staking
     */
    getStakingTimes() {
        return __awaiter(this, void 0, void 0, function* () {
            const duration = yield eth_1.ethCall(this.stakingAddress, 'stakingPeriod', SingleRewardProgram_json_1.default, this.web3);
            const start = yield eth_1.ethCall(this.stakingAddress, 'stakingStartTime', SingleRewardProgram_json_1.default, this.web3);
            return {
                start: Number(start),
                duration: Number(duration),
                end: Number(start) + Number(duration)
            };
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
    getStats(account, pairAddress, networkId, rewards) {
        return __awaiter(this, void 0, void 0, function* () {
            const [globalTotalStake, totalRewards, estimatedRewards, unlockedRewards, accuruedRewards] = yield this.getStatsData(account);
            const [userTotalStaked] = yield this.getStakerInfo(account);
            const { reserveUSD, totalSupply, token0, token1, totalReserve0, totalReserve1 } = yield fetchPairInfo_1.default(pairAddress, networkId, this.web3);
            const [reserve0, reserve1] = utils_1.calculateReserves(globalTotalStake, totalSupply, totalReserve0, totalReserve1);
            const lockedRewards = new bignumber_js_1.BigNumber(totalRewards).minus(new bignumber_js_1.BigNumber(unlockedRewards));
            const pairPrice = reserveUSD / totalSupply;
            const totalStakedUSD = utils_1.weiToNumber(userTotalStaked) * pairPrice;
            const globalTotalStakeUSD = utils_1.weiToNumber(globalTotalStake) * pairPrice;
            const reward = rewards && rewards[0];
            const rewardPrice = yield fetchTokenPrice_1.default(reward, networkId);
            const totalRewardsInUSD = utils_1.weiToNumber(totalRewards) * rewardPrice;
            const { duration } = yield this.getStakingTimes();
            const apyPercent = utils_1.calculateApy(totalRewardsInUSD, globalTotalStakeUSD, duration);
            return {
                globalTotalStake,
                unlockedRewards,
                rewardsInfo: [
                    {
                        totalRewards,
                        totalRewardsInUSD,
                        estimatedRewards,
                        accuruedRewards,
                        apyPercent
                    }
                ],
                token0,
                token1,
                totalStakedUSD,
                globalTotalStakeUSD,
                pairPrice,
                reserve0: reserve0.toFixed(),
                reserve1: reserve1.toFixed(),
                lockedRewards: lockedRewards.toFixed()
            };
        });
    }
}
exports.default = SingleRewardProgram;
