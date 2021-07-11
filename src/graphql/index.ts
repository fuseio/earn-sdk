import { ApolloClient, InMemoryCache } from '@apollo/client'

export const uniswapClient = new ApolloClient({
  uri: process.env.UNISWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const fuseswapClient = new ApolloClient({
  uri: process.env.FUSESWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
})

export const pancakeswapClient = new ApolloClient({
  uri: process.env.PANCAKESWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
})