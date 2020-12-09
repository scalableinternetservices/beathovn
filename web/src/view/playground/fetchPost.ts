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
    musicLinkImg
    musicLinkTitle
    musicLinkSite
    commentary
    likes
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
  ${fragmentPostFeed}
`

const fetchPostCommentsQuery = gql`
  query FetchPostDetails($postId: Int!, $cursor: String) {
    postDetails(postId: $postId) {
      id
      likes
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
  ${fragmentComment}
`

export const postFeedSubscription = gql`
  subscription PostFeedSubscription {
    postFeedUpdates {
      ...PostWithLikeCount
    }
  }
  ${fragmentPostWithLikeCount}
  ${fragmentUser}
`

export const postUpdatesSubscription = gql`
  subscription PostUpdatesSubscription {
    postUpdates {
      id
      likes
      musicLinkImg
      musicLinkSite
      musicLinkTitle
      commentFeed(cursor: "LATEST") {
        comments {
          ...Comment
        }
      }
    }
  }
  ${fragmentUser}
  ${fragmentComment}
`

export function fetchPosts($cursor?: string) {
  return useQuery<FetchPosts>(fetchPostQuery, { variables: { cursor: $cursor } })
}

export function fetchPostComments($postId: number, $cursor?: string) {
  return useQuery<FetchPostDetails>(fetchPostCommentsQuery, { variables: { postId: $postId, cursor: $cursor } })
}
