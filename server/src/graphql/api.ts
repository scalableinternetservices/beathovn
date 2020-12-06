import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import Redis from 'ioredis'
import { getLinkPreview } from 'link-preview-js'
import path from 'path'
import { getRepository } from 'typeorm'
import { check } from '../../../common/src/util'
import { Comment } from '../entities/Comment'
import { Following } from '../entities/Following'
import { Like } from '../entities/Like'
import { Post } from '../entities/Post'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { PostWithLikeCount, Resolvers } from './schema.types'

const POSTS_CACHE = 'posts'
const POSTS_QUERY_PREFIX = 'posts_query:'

export const pubsub = new PubSub()
export const redis = new Redis()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
  redis: Redis.Redis
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    posts: async (_, { cursor }, ctx) => {
      const limit = 10
      const cursorInt = parseInt(cursor || '0')
      const cachedCursoredQueryKey = `${POSTS_QUERY_PREFIX}${cursor || ''}`
      // If cursored query is cached, return cached response
      const cachedCursoredQuery = await ctx.redis.get(cachedCursoredQueryKey).then((res) => {
        return res
      }).catch(e => {})
      if (cachedCursoredQuery) {
        console.log('Returning cached response')
        return JSON.parse(cachedCursoredQuery)
      }
      // Else, see if cursored query can be built from cached data
      if (cursor) {
        console.log('Returning built cached response')
        const cachedPosts = await ctx.redis.zrangebyscore(POSTS_CACHE, String(cursorInt-limit-1), String(cursorInt-1)).then((res) => {
          return res
        }).catch(e => {})
        // Make sure cachedPosts exists, and make sure cursored queries are correct
        if (cachedPosts && ((cursorInt <= limit) || (cachedPosts.length == limit))) {
          const cachedPostsJSON = cachedPosts.map((p) => JSON.parse(p)).reverse()
          const lastCachedPost = cachedPostsJSON[cachedPostsJSON.length - 1]
          let hasMore = (lastCachedPost.id) > 1

          const res = {
            posts: cachedPostsJSON,
            cursor: (cachedPostsJSON.length) ? String(lastCachedPost.id) : '',
            hasMore: (cachedPostsJSON.length) ? hasMore : false
          }
          // Cache query response
          ctx.redis.set(cachedCursoredQueryKey, JSON.stringify(res))

          return res
        }
      }

      // Otherwise run query
      let postsSadge = getRepository(Post)
        .createQueryBuilder('post')
        .addSelect('COUNT(DISTINCT like.id)', 'like_count')
        .leftJoin('post.likes', 'like')
        .leftJoinAndSelect('post.user', 'user')

      if (cursor) {
        postsSadge = postsSadge.where('post.id < :cursor', { cursor: cursorInt })
      }
      postsSadge = postsSadge.groupBy('post.id').orderBy('post.id', 'DESC').limit(limit)

      const pseudoPosts = await postsSadge.getRawMany()
      const postsWithLikesFromQuery = pseudoPosts.map((p) => textRowToPostWithLikeCount(p))
      const lastPost = postsWithLikesFromQuery[postsWithLikesFromQuery.length - 1]
      const hasMore = (lastPost.id) > 1

      const res = {
        posts: postsWithLikesFromQuery,
        cursor: (postsWithLikesFromQuery.length) ? String(lastPost.id) : '',
        hasMore: (postsWithLikesFromQuery.length) ? hasMore : false
      }
      // Cache query response
      ctx.redis.set(cachedCursoredQueryKey, JSON.stringify(res))
      // Cache posts
      postsWithLikesFromQuery.map((p) => {
        ctx.redis.zadd(POSTS_CACHE, p.id, JSON.stringify(p))
      })

      return res
    },
    postDetails: (_, { postId }) => {
      return Post.findOne({ where: { id: postId }, relations: ['user', 'likes', 'comments', 'comments.user'] }).then(
        res => {
          if (res) {
            return postToPostWithLikeCount(res)
          } else {
            return null
          }
        }
      )
    },
    followers: (_, { userId }) => {
      return Following.find({ where: { followee: userId }, relations: ['follower'] }).then(rows =>
        rows.map(row => row.follower)
      )
    },
    following: (_, { userId }) => {
      return Following.find({ where: { follower: userId }, relations: ['followee'] }).then(rows =>
        rows.map(row => row.followee)
      )
    },
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    createPost: async (_, { input }, ctx) => {
      const { musicLink, commentary } = input

      const post = new Post()
      post.musicLink = musicLink
      post.commentary = commentary || ''
      if (ctx.user) {
        post.user = ctx.user
      }

      getLinkPreview(musicLink)
        .then(data => {
          const dataCopy: any = data
          if (dataCopy.title) {
            post.musicLinkTitle = dataCopy.title
          }
          if (dataCopy.siteName) {
            post.musicLinkSite = dataCopy.siteName
          }
          if (dataCopy.images.length) {
            post.musicLinkImg = dataCopy.images[0]
          }

          void post.save()
          ctx.pubsub.publish('UPDATE_POST', postToPostWithLikeCount(post))
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(e => {})

      await post.save().then((p) => {
        ctx.redis.zadd(POSTS_CACHE, p.id, JSON.stringify(postToPostWithLikeCount(post)))
      })

      if (post.user) {
        post.user.posts.push(post)
        await post.user.save()
      }

      ctx.pubsub.publish('CREATE_POST', postToPostWithLikeCount(post))
      // Invalidate cache
      ctx.redis.ttl(POSTS_QUERY_PREFIX).then((res) => {
        if (res < 0) {
          ctx.redis.expire(POSTS_QUERY_PREFIX, 10)
        }
      }).catch(e => {})

      return post
    },
    createComment: async (_, { input }, ctx) => {
      const { text, postId } = input
      const post = check(await Post.findOne({ where: { id: postId }, relations: ['comments'] }))
      // if (!post) {
      //   return {}
      // }

      // Create, populate, and persist new Comment data
      const comment = new Comment()
      comment.text = text
      comment.post = post
      if (ctx.user) {
        comment.user = ctx.user
      }
      await comment.save()

      // Add comment to user
      comment.user?.comments.push(comment)
      await comment.user?.save()

      // Add comment to post
      post.comments.push(comment)
      await post.save()

      ctx.pubsub.publish('UPDATE_POST', { id: post.id })

      return comment
    },
    likePost: async (_, { postId }, ctx) => {
      const post = check(await Post.findOne({ where: { id: postId }, relations: ['likes'] }))
      if (!post) {
        return false
      }

      // Create, populate, and persist new like
      const like = new Like()
      like.post = post
      if (ctx.user) {
        like.user = ctx.user
      }
      await like.save()

      // Add like to post
      post.likes.push(like)
      await post.save()

      // Add like to user
      like.user?.likes.push(like)
      await like.user?.save()

      // const payload = { post: postToPostWithLikeCount(post) }
      ctx.pubsub.publish('UPDATE_POST', postToPostWithLikeCount(post))

      return true
    },
    followUser: async (_, { input }, ctx) => {
      // TODO: GET FOLLOWERiD FROM CONTEXT
      const { followerId, followeeId } = input
      const followerUser = check(await User.findOne({ where: { id: followerId } }))
      const followeeUser = check(await User.findOne({ where: { id: followeeId } }))

      if (!followerUser || !followeeUser) {
        return false
      }

      // Create, populate, and persist following record
      const followingRecord = new Following()
      followingRecord.follower = followerUser
      followingRecord.followee = followeeUser

      await followingRecord.save()

      if (!followerUser.following) {
        followerUser.following = []
      }
      followerUser.following.push(followingRecord)

      if (!followeeUser.followers) {
        followeeUser.followers = []
      }
      followeeUser.followers.push(followingRecord)
      await followerUser.save()
      await followeeUser.save()

      return true
    },
  },
  PostWithLikeCount: {
    commentFeed: async (post, { cursor }) => {
      const fullPost = check(await Post.findOne({ where: { id: post.id }, relations: ['comments', 'comments.user'] }))
      if (!fullPost || !fullPost.comments.length) {
        return {
          cursor: '',
          comments: [],
          hasMore: false,
        }
      }
      let oldestCommentIndex: number
      if (!cursor) {
        oldestCommentIndex = 0
      } else if (cursor == 'LATEST') {
        oldestCommentIndex = fullPost.comments.length - 1
      } else {
        const cursorInt = parseInt(cursor)
        oldestCommentIndex = fullPost.comments.findIndex(comment => comment.id === cursorInt)
      }
      const limit = 5

      const newCursorIndex = Math.min(oldestCommentIndex + limit, fullPost.comments.length)

      const commentFeed = {
        comments: fullPost.comments.slice(oldestCommentIndex, newCursorIndex),
        cursor: String(
          fullPost.comments[newCursorIndex == fullPost.comments.length ? newCursorIndex - 1 : newCursorIndex].id
        ),
        hasMore: newCursorIndex < fullPost.comments.length - 1,
      }

      return commentFeed
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
    postFeedUpdates: {
      subscribe: (_, __, context) => context.pubsub.asyncIterator('CREATE_POST'),
      resolve: (payload: any) => payload,
    },
    postUpdates: {
      subscribe: (_, __, context) => context.pubsub.asyncIterator('UPDATE_POST'),
      resolve: (payload: any) => {
        return payload
      }
    },
  },
}

const postToPostWithLikeCount = (post: Post) => {
  return { ...post, likes: post.likes?.length || 0 }
}

const textRowToPostWithLikeCount = (textRow: any) : PostWithLikeCount => {
  const {
    post_id: id,
    post_musicLink: musicLink,
    post_musicLinkImg: musicLinkImg,
    post_musicLinkTitle: musicLinkTitle,
    post_musicLinkSite: musicLinkSite,
    post_commentary: commentary,
    user_id,
    user_email,
    user_name,
    user_userType,
    like_count: likes
  } = textRow;
  const tempUser = new User()
  tempUser.id = user_id
  tempUser.email = user_email
  tempUser.name = user_name
  tempUser.userType = user_userType
  return {
    id,
    musicLink,
    musicLinkImg,
    musicLinkSite,
    musicLinkTitle,
    commentary,
    comments: [],
    likes,
    user: tempUser
  }
}
