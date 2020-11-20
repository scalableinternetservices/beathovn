import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { LikePost } from '../../graphql/query.gen'

const likePostMutation = gql`
  mutation LikePost($input: Int!) {
    likePost(input: $input)
  }
`

export function likePost(input: number) {
  return getApolloClient().mutate<LikePost>({
    mutation: likePostMutation,
    variables: { input },
  })
}
