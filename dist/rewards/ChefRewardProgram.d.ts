import RewardProgram from './RewardProgam';
export declare enum Chef {
    CHEF_V2 = 0,
    CHEF_V3 = 1
}
export default class ChefRewardProgram extends RewardProgram {
    chef?: Chef;
    constructor(chefAddress: string, provider: any);
    deposit(amount: string, account: string, pid?: number): Promise<any>;
    withdraw(amount: string, account: string, pid?: number): Promise<any>;
    withdrawReward(account: string, pid?: number): Promise<any>;
    getStakerInfo(account: string, pid?: number): Promise<any>;
    getStats(account: string, pairAddress: string, networkId: number, pid?: number): Promise<any>;
    getStakingTimes(): any;
}
