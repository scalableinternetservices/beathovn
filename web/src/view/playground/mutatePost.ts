import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { CreatePost, PostInput } from '../../graphql/query.gen'

const createPostMutation = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      ...Post
    }
  }
`

export function createPost(input: PostInput) {
  return getApolloClient().mutate<CreatePost>({
    mutation: createPostMutation,
    variables: { input },
  })
}
