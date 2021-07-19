import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { UNISWAP_SUBGRAPH_URL, FUSESWAP_SUBGRAPH_URL, PANCAKESWAP_SUBGRAPH_URL } from '../constants'

export const uniswapClient = new ApolloClient({
  link: new HttpLink({ uri: UNISWAP_SUBGRAPH_URL, fetch }),
  cache: new InMemoryCache()
})

export const fuseswapClient = new ApolloClient({
  link: new HttpLink({ uri: FUSESWAP_SUBGRAPH_URL, fetch }),
  cache: new InMemoryCache()
})

export const pancakeswapClient = new ApolloClient({
  link: new HttpLink({ uri: PANCAKESWAP_SUBGRAPH_URL, fetch }),
  cache: new InMemoryCache()
})
