[@fuseio/rewards-sdk](../README.md) / [Exports](../modules.md) / SingleRewardProgram

# Class: SingleRewardProgram

## Hierarchy

- `RewardProgram`

  ↳ **`SingleRewardProgram`**

## Table of contents

### Constructors

- [constructor](SingleRewardProgram.md#constructor)

### Properties

- [stakingAddress](SingleRewardProgram.md#stakingaddress)
- [web3](SingleRewardProgram.md#web3)

### Methods

- [deposit](SingleRewardProgram.md#deposit)
- [getStakerInfo](SingleRewardProgram.md#getstakerinfo)
- [getStakingTimes](SingleRewardProgram.md#getstakingtimes)
- [getStats](SingleRewardProgram.md#getstats)
- [getStatsData](SingleRewardProgram.md#getstatsdata)
- [withdraw](SingleRewardProgram.md#withdraw)
- [withdrawReward](SingleRewardProgram.md#withdrawreward)

## Constructors

### constructor

• **new SingleRewardProgram**(`stakingAddress`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stakingAddress` | `string` |
| `provider` | `any` |

#### Overrides

RewardProgram.constructor

#### Defined in

[rewards/SingleRewardProgram.ts:21](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L21)

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

[rewards/SingleRewardProgram.ts:25](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L25)

___

### getStakerInfo

▸ **getStakerInfo**(`account`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStakerInfo

#### Defined in

[rewards/SingleRewardProgram.ts:58](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L58)

___

### getStakingTimes

▸ **getStakingTimes**(): `Promise`<`StakingTimes`\>

#### Returns

`Promise`<`StakingTimes`\>

#### Overrides

RewardProgram.getStakingTimes

#### Defined in

[rewards/SingleRewardProgram.ts:80](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L80)

___

### getStats

▸ **getStats**(`account`, `pairAddress`, `networkId`, `rewards?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `pairAddress` | `string` |
| `networkId` | `number` |
| `rewards?` | `string`[] |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStats

#### Defined in

[rewards/SingleRewardProgram.ts:101](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L101)

___

### getStatsData

▸ **getStatsData**(`account`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[rewards/SingleRewardProgram.ts:69](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L69)

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

[rewards/SingleRewardProgram.ts:36](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L36)

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

[rewards/SingleRewardProgram.ts:47](https://github.com/fuseio/rewards-sdk/blob/af6d174/src/rewards/SingleRewardProgram.ts#L47)
