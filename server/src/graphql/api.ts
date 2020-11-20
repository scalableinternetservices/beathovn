import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Comment } from '../entities/Comment'
import { Following } from '../entities/Following'
import { Like } from '../entities/Like'
import { Post } from '../entities/Post'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    posts: () => Post.find({ relations: ['user', 'comments', 'comments.user', 'likes'] }),
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
      await post.save()
      // ctx.pubsub.publish('CREATE_POST', post)
      return post
    },
    createComment: async (_, { input }, ctx) => {
      const { text, postId } = input
      const post = check(await Post.findOne({ where: { id: postId } }))
      // if (!post) {
      //   return false
      // }

      // Create, populate, and persist new Comment data
      const comment = new Comment()
      comment.text = text
      comment.post = post
      if (ctx.user) {
        comment.user = ctx.user
        if (!comment.user.comments) {
          comment.user.comments = []
        }
      }
      await comment.save()

      // Add comment to post
      if (!post.comments) {
        post.comments = []
      }
      post.comments.push(comment)
      await post.save()

      // Add comment to user
      comment.user?.comments.push(comment)
      await comment.user?.save()

      return comment
    },
    likePost: async (_, { postId }, ctx) => {
      const post = check(await Post.findOne({ where: { id: postId } }))
      if (!post) {
        return false
      }

      // Create, populate, and persist new like
      const like = new Like()
      like.post = post
      if (ctx.user) {
        like.user = ctx.user
        if (!like.user.comments) {
          like.user.comments = []
        }
      }
      await like.save()

      // Add like to post
      if (!post.likes) {
        post.likes = []
      }
      post.likes.push(like)
      await post.save()

      // Add like to user
      like.user?.likes.push(like)
      await like.user?.save()

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
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
