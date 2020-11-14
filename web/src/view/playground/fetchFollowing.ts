import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import {
  FetchFollowers,
  FetchFollowersVariables,
  FetchFollowing,
  // eslint-disable-next-line prettier/prettier
  FetchFollowingVariables
} from '../../graphql/query.gen'

const fragmentUser = gql`
  fragment User on User {
    id
    name
    email
  }
`

const fetchFollowingQuery = gql`
  query FetchFollowing($userId: Int!) {
    following(userId: $userId) {
      ...User
    }
  }
  ${fragmentUser}
`

const fetchFollowersQuery = gql`
  query FetchFollowers($userId: Int!) {
    followers(userId: $userId) {
      ...User
    }
  }
  ${fragmentUser}
`

export function fetchFollowers($userId: number) {
  return getApolloClient().mutate<FetchFollowers, FetchFollowersVariables>({
    mutation: fetchFollowersQuery,
    variables: { userId: $userId },
  })
}

export function fetchFollowing($userId: number) {
  return getApolloClient().mutate<FetchFollowing, FetchFollowingVariables>({
    mutation: fetchFollowingQuery,
    variables: { userId: $userId },
  })
}
