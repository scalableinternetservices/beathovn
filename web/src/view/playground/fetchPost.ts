import { gql } from '@apollo/client'

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

export const fetchPosts = gql`
  query FetchPosts {
    posts {
      ...PostWithLikeCount
    }
  }
  ${fragmentUser}
  ${fragmentPostWithLikeCount}
  ${fragmentComment}
`
