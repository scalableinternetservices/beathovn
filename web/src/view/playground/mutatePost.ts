import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { CreatePost, CreatePostVariables, PostInput } from '../../graphql/query.gen'

const createPostMutation = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

export function createPost(input: PostInput) {
  return getApolloClient().mutate<CreatePost, CreatePostVariables>({
    mutation: createPostMutation,
    variables: { input },
  })
}
