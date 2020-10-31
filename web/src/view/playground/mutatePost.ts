import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { PostInput } from '../../graphql/query.gen'

const createPostMutation = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input)
  }
`

export function throwCandy(input: PostInput) {
  return getApolloClient().mutate<createPost>({
    mutation: createPostMutation,
    variables: { input },
  })
}
