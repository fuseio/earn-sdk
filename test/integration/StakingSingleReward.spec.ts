import { JsonRpcProvider } from '@ethersproject/providers'

import { StakingSingleReward } from '../../src'
import Staking from '../../src/staking/Staking'
import { STAKING_SINGLE_ADDRESS } from '../constants'

const provider = new JsonRpcProvider('https://rpc.fuse.io')

describe('StakingSingleReward', () => {
    let staking: Staking
   
    beforeEach(() => {
        staking = new StakingSingleReward(STAKING_SINGLE_ADDRESS, provider)
    })

    test('getStakingTimes works', async () => {
        const stats = await staking.getStats('0x0000000000000000000000000000000000000000')
        console.log(stats)
    })
})
