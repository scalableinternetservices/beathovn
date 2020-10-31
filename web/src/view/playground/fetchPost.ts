import { gql } from '@apollo/client'

export const fragmentUser = gql`
  fragment User on User {
    id
    name
    email
    userType
  }
`

export const fragmentPost = gql`
  fragment Post on Post {
    id
    musicLink
    commentary
    user {
      ...User
    }
  }
`

export const fetchPosts = gql`
  query FetchPosts {
    posts {
      ...Post
    }
  }
  ${fragmentUser}
  ${fragmentPost}
`
