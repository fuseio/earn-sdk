export default interface IStaking {
  deposit(amount: string): Promise<any>

  withdraw(amount: string): Promise<any>

  withdrawReward(): Promise<any>

  getStakerInfo(account: string): Promise<any>

  getStats(account: string, pairAddress: string, networkId: number, rewards?: Array<string>): Promise<any>

  getStakingTimes(): Promise<any>
}
