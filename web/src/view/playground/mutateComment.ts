import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { CommentInput, CreateComment, CreateCommentVariables } from '../../graphql/query.gen'

const createCommentMutation = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`

export function createComment(input: CommentInput) {
  return getApolloClient().mutate<CreateComment, CreateCommentVariables>({
    mutation: createCommentMutation,
    variables: { input },
  })
}
