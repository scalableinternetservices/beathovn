import { gql, useQuery } from '@apollo/client'
import { FetchPostDetails, FetchPosts } from '../../graphql/query.gen'

export const fragmentUser = gql`
  fragment User on User {
    id
    name
    email
    userType
  }
`

export const fragmentComment = gql`
  fragment Comment on Comment {
    id
    text
    user {
      ...User
    }
  }
`

export const fragmentPostWithLikeCount = gql`
  fragment PostWithLikeCount on PostWithLikeCount {
    id
    musicLink
    commentary
    likes
    comments {
      ...Comment
    }
    user {
      ...User
    }
  }
`

export const fragmentPostFeed = gql`
  fragment PostFeed on PostFeed {
    cursor
    hasMore
    posts {
      ...PostWithLikeCount
    }
  }
`

export const fetchPostQuery = gql`
  query FetchPosts($cursor: String) {
    posts(cursor: $cursor) {
      ...PostFeed
    }
  }
  ${fragmentUser}
  ${fragmentPostWithLikeCount}
  ${fragmentComment}
  ${fragmentPostFeed}
`

const fetchPostDetailsQuery = gql`
  query FetchPostDetails($postId: Int!, $cursor: String) {
    postDetails(postId: $postId) {
      ...PostWithLikeCount
      commentFeed(cursor: $cursor) {
        cursor
        hasMore
        comments {
          ...Comment
        }
      }
    }
  }
  ${fragmentUser}
  ${fragmentPostWithLikeCount}
  ${fragmentComment}
`

export function fetchPosts($cursor?: string) {
  return useQuery<FetchPosts>(fetchPostQuery, {variables: { cursor: $cursor }})
}

export function fetchPostDetails($postId: number, $cursor?: string) {
  return useQuery<FetchPostDetails>(fetchPostDetailsQuery, {variables: { postId: $postId, cursor: $cursor }})
}