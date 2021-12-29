import { Chef } from '../rewards/ChefRewardProgram'
import { getChefSubgraph } from '../utils'
import { poolQuery } from './query'

export async function getChefPool (pid?: number, account?: string, chef?: Chef) {
  if (!pid || !account || typeof chef === 'undefined') return null

  const subgraph = getChefSubgraph(chef)

  const result = await subgraph?.query({
    query: poolQuery(pid, account)
  })

  return result?.data?.users?.[0] ? result?.data?.users?.[0] : null
}
