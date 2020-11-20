import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { FollowInput, FollowUser, FollowUserVariables } from '../../graphql/query.gen'

export const followUserMutation = gql`
  mutation FollowUser($input: FollowInput!) {
    followUser(input: $input)
  }
`

export function followUser(input: FollowInput) {
  return getApolloClient().mutate<FollowUser, FollowUserVariables>({
    mutation: followUserMutation,
    variables: { input },
  })
}
