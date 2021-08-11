[@fuseio/rewards-sdk](../README.md) / [Exports](../modules.md) / MultiRewardProgram

# Class: MultiRewardProgram

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

[rewards/MultiRewardProgram.ts:11](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L11)

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

[rewards/RewardProgam.ts:4](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/RewardProgam.ts#L4)

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

[rewards/MultiRewardProgram.ts:15](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L15)

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

[rewards/MultiRewardProgram.ts:136](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L136)

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

[rewards/MultiRewardProgram.ts:48](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L48)

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

[rewards/MultiRewardProgram.ts:117](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L117)

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

[rewards/MultiRewardProgram.ts:72](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L72)

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

[rewards/MultiRewardProgram.ts:26](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L26)

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

[rewards/MultiRewardProgram.ts:37](https://github.com/fuseio/rewards-sdk/blob/91c80c6/src/rewards/MultiRewardProgram.ts#L37)
