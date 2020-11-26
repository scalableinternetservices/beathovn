import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { LikePost } from '../../graphql/query.gen'

export const likePostMutation = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId)
  }
`

export function likePost(postId: number) {
  return getApolloClient().mutate<LikePost>({
    mutation: likePostMutation,
    variables: { postId },
  })
}