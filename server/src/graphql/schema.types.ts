import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  posts: Array<Post>
  following: Array<User>
  followers: Array<User>
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryFollowingArgs {
  userId: Scalars['Int']
}

export interface QueryFollowersArgs {
  userId: Scalars['Int']
}

export interface Mutation {
  __typename?: 'Mutation'
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
  createPost: Post
  createComment: Comment
  likePost?: Maybe<Scalars['Boolean']>
  followUser?: Maybe<Scalars['Boolean']>
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface MutationCreatePostArgs {
  input: PostInput
}

export interface MutationCreateCommentArgs {
  input: CommentInput
}

export interface MutationLikePostArgs {
  postId: Scalars['Int']
}

export interface MutationFollowUserArgs {
  input: FollowInput
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  email: Scalars['String']
  name: Scalars['String']
  comments: Array<Comment>
  followers: Array<Following>
  following: Array<Following>
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface Comment {
  __typename?: 'Comment'
  id: Scalars['Int']
  text: Scalars['String']
  post: Post
  user: User
}

export interface Following {
  __typename?: 'Following'
  id: Scalars['Int']
  follower: User
  followee: User
}

export interface Like {
  __typename?: 'Like'
  id: Scalars['Int']
  post: Post
  user: User
}

export interface Post {
  __typename?: 'Post'
  id: Scalars['Int']
  musicLink: Scalars['String']
  commentary?: Maybe<Scalars['String']>
  comments: Array<Comment>
  likes: Array<Like>
  user?: Maybe<User>
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface PostInput {
  musicLink: Scalars['String']
  commentary?: Maybe<Scalars['String']>
}

export interface CommentInput {
  text: Scalars['String']
  postId: Scalars['Int']
}

export interface FollowInput {
  followerId: Scalars['Int']
  followeeId: Scalars['Int']
}

export interface PostCommentInput {
  postId: Scalars['Int']
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Subscription: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  String: ResolverTypeWrapper<Scalars['String']>
  UserType: UserType
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  Comment: ResolverTypeWrapper<Comment>
  Following: ResolverTypeWrapper<Following>
  Like: ResolverTypeWrapper<Like>
  Post: ResolverTypeWrapper<Post>
  SurveyInput: SurveyInput
  PostInput: PostInput
  CommentInput: CommentInput
  FollowInput: FollowInput
  PostCommentInput: PostCommentInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  Subscription: {}
  User: User
  String: Scalars['String']
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  Comment: Comment
  Following: Following
  Like: Like
  Post: Post
  SurveyInput: SurveyInput
  PostInput: PostInput
  CommentInput: CommentInput
  FollowInput: FollowInput
  PostCommentInput: PostCommentInput
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>
  following?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryFollowingArgs, 'userId'>
  >
  followers?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryFollowersArgs, 'userId'>
  >
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>
  createComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, 'input'>
  >
  likePost?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationLikePostArgs, 'postId'>
  >
  followUser?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationFollowUserArgs, 'input'>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>
  followers?: Resolver<Array<ResolversTypes['Following']>, ParentType, ContextType>
  following?: Resolver<Array<ResolversTypes['Following']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type FollowingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Following'] = ResolversParentTypes['Following']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  follower?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  followee?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type LikeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  musicLink?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  commentary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  Following?: FollowingResolvers<ContextType>
  Like?: LikeResolvers<ContextType>
  Post?: PostResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
