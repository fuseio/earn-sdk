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

[rewards/MultiRewardProgram.ts:25](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L25)

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

[rewards/RewardProgam.ts:4](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/RewardProgam.ts#L4)

## Methods

### deposit

▸ **deposit**(`amount`, `account`): `Promise`<`any`\>

Deposit the provided amount of the staking token into the staking contract

```typescript
rewardProgram.deposit(
  '1000000000000000000',
  '0x'
)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | the number of staking tokens to deposit |
| `account` | `string` | the account sending the transaction |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.deposit

#### Defined in

[rewards/MultiRewardProgram.ts:41](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L41)

___

### getRewardsInfo

▸ `Private` **getRewardsInfo**(`account`, `networkId`, `globalTotalStakeUSD`, `rewards?`): `Promise`<`any`\>

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

[rewards/MultiRewardProgram.ts:212](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L212)

___

### getStakerInfo

▸ **getStakerInfo**(`account`, `rewardsToken?`): `Promise`<`any`\>

Get reward information for the provided address and rewardToken

```typescript
rewardProgram.getStakerInfo(
  '0x',
  '0x00'
)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | address to fetch the reward information for |
| `rewardsToken?` | `string` | rewardToken to fetch reward information for |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStakerInfo

#### Defined in

[rewards/MultiRewardProgram.ts:108](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L108)

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

[rewards/MultiRewardProgram.ts:193](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L193)

___

### getStats

▸ **getStats**(`account`, `pairAddress`, `networkId`, `rewards?`): `Promise`<`any`\>

Gets global reward stats for rewardProgram

```typescript
rewardProgram.getStats(
  '0x',
  '0x',
  122,
  ['0x']
)
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `account` | `string` | `undefined` | the account to get stats for |
| `pairAddress` | `string` | `undefined` | the address of the staking token |
| `networkId` | `number` | `undefined` | the networkId where contract is deployed |
| `rewards` | `any`[] | `[]` | array of rewards offerred |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.getStats

#### Defined in

[rewards/MultiRewardProgram.ts:148](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L148)

___

### withdraw

▸ **withdraw**(`amount`, `account`): `Promise`<`any`\>

Withdraw the provided amount of the staking token from the staking contract

```typescript
rewardProgram.withdraw(
  '1000000000000000000',
  '0x'
)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | the number of staking tokens to withdraw |
| `account` | `string` | the account sending the transaction |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.withdraw

#### Defined in

[rewards/MultiRewardProgram.ts:64](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L64)

___

### withdrawReward

▸ **withdrawReward**(`account`): `Promise`<`any`\>

Withdraw the rewards accured

```typescript
rewardProgram.withdrawReward(
  '0x'
)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | the account sending the transaction |

#### Returns

`Promise`<`any`\>

#### Overrides

RewardProgram.withdrawReward

#### Defined in

[rewards/MultiRewardProgram.ts:85](https://github.com/fuseio/rewards-sdk/blob/139fe1a/src/rewards/MultiRewardProgram.ts#L85)
