import { Chef } from '../rewards/ChefRewardProgram'
import { getChefSubgraph } from '../utils'
import { poolQuery, userQuery } from './query'

export async function getChefPool (pid?: number, chef?: Chef) {
  if (typeof pid === 'undefined' || typeof chef === 'undefined') return null

  const subgraph = getChefSubgraph(chef)

  const result = await subgraph?.query({
    query: poolQuery(pid)
  })

  return result?.data?.pool ? result?.data?.pool : null
}

export async function getChefUser (pid?: number, account?: string, chef?: Chef) {
  if (typeof pid === 'undefined' || typeof chef === 'undefined' || !account) return null

  const subgraph = getChefSubgraph(chef)

  const result = await subgraph?.query({
    query: userQuery(pid, account)
  })

  return result?.data?.user ? result?.data?.user : null
}
