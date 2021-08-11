[@fuseio/rewards-sdk](../README.md) / [Exports](../modules.md) / MultiRewardProgram

# Class: MultiRewardProgram

Create a new MultiRewardProgram which represents a multi reward
contract on the fuse network. The instance provides basic functionality
for interacting with the contract.

```typescript
import Web3 from 'web3'
import { MultiRewardProgram } from '@fuseio/rewards-sdk'

const stakingAddress = '0x'
const web3Provider = new Web3('https://rpc.fuse.io')
const rewardProgram = new MultiRewardProgram(stakingAddress, web3Provider)
```

## Hierarchy

- `RewardProgram`

  ↳ **`MultiRewardProgram`**

## Table of contents

### Constructors

- [constructor](MultiRewardProgram.md#constructor)

### Properties

- [stakingAddress](MultiRewardProgram.md#stakingaddress)
- [web3](MultiRewardProgram.md#web3)

### Methods

- [deposit](MultiRewardProgram.md#deposit)
- [getRewardsInfo](MultiRewardProgram.md#getrewardsinfo)
- [getStakerInfo](MultiRewardProgram.md#getstakerinfo)
- [getStakingTimes](MultiRewardProgram.md#getstakingtimes)
- [getStats](MultiRewardProgram.md#getstats)
- [withdraw](MultiRewardProgram.md#withdraw)
- [withdrawReward](MultiRewardProgram.md#withdrawreward)

## Constructors

### constructor

• **new MultiRewardProgram**(`stakingAddress`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakingAddress` | `string` |
| `provider` | `any` |

#### Overrides

RewardProgram.constructor

#### Defined in

[rewards/MultiRewardProgram.ts:25](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L25)

## Properties

### stakingAddress

• `Readonly` **stakingAddress**: `string`

#### Inherited from

RewardProgram.stakingAddress

___

### web3

• `Protected` `Readonly` **web3**: `default`

#### Inherited from

RewardProgram.web3

#### Defined in

[rewards/RewardProgam.ts:4](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/RewardProgam.ts#L4)

## Methods

### deposit

▸ **deposit**(`amount`, `account`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `account` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.deposit

#### Defined in

[rewards/MultiRewardProgram.ts:29](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L29)

___

### getRewardsInfo

▸ **getRewardsInfo**(`account`, `networkId`, `globalTotalStakeUSD`, `rewards?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `account` | `string` | `undefined` |
| `networkId` | `number` | `undefined` |
| `globalTotalStakeUSD` | `number` | `undefined` |
| `rewards` | `any`[] | `[]` |

#### Returns

`Promise`<`any`\>

#### Defined in

[rewards/MultiRewardProgram.ts:150](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L150)

___

### getStakerInfo

▸ **getStakerInfo**(`account`, `rewardsToken?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `rewardsToken?` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStakerInfo

#### Defined in

[rewards/MultiRewardProgram.ts:62](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L62)

___

### getStakingTimes

▸ **getStakingTimes**(`rewardsToken?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rewardsToken?` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStakingTimes

#### Defined in

[rewards/MultiRewardProgram.ts:131](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L131)

___

### getStats

▸ **getStats**(`account`, `pairAddress`, `networkId`, `rewards?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `account` | `string` | `undefined` |
| `pairAddress` | `string` | `undefined` |
| `networkId` | `number` | `undefined` |
| `rewards` | `any`[] | `[]` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStats

#### Defined in

[rewards/MultiRewardProgram.ts:86](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L86)

___

### withdraw

▸ **withdraw**(`amount`, `account`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `account` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.withdraw

#### Defined in

[rewards/MultiRewardProgram.ts:40](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L40)

___

### withdrawReward

▸ **withdrawReward**(`account`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.withdrawReward

#### Defined in

[rewards/MultiRewardProgram.ts:51](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/MultiRewardProgram.ts#L51)
