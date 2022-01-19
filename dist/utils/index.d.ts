import { BigNumber } from 'bignumber.js';
import { Chef } from '../rewards/ChefRewardProgram';
export declare function weiToNumber(value: string | BigNumber, decimals?: number): number;
export declare function numberToWei(value: string, decimals?: number): string;
export declare function calculateReserves(globalTotalStake: string, totalSupply: string, totalReserve0: string, totalReserve1: string): BigNumber[];
export declare function calculateApy(totalRewardsInUSD: number, globalTotalStakeUSD: number, duration: number): number;
export declare function getChef(address: string): Chef | undefined;
export declare function getChefSubgraph(chef: Chef): import("@apollo/client/core").ApolloClient<import("@apollo/client/cache").NormalizedCacheObject> | undefined;
