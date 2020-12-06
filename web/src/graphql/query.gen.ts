/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  name: string;
  userType: UserType;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchFollowing
// ====================================================

export interface FetchFollowing_following {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface FetchFollowing {
  following: FetchFollowing_following[];
}

export interface FetchFollowingVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchFollowers
// ====================================================

export interface FetchFollowers_followers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface FetchFollowers {
  followers: FetchFollowers_followers[];
}

export interface FetchFollowersVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchPosts
// ====================================================

export interface FetchPosts_posts_posts_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface FetchPosts_posts_posts {
  __typename: "PostWithLikeCount";
  id: number;
  musicLink: string;
  musicLinkImg: string | null;
  musicLinkTitle: string | null;
  musicLinkSite: string | null;
  commentary: string | null;
  likes: number | null;
  user: FetchPosts_posts_posts_user | null;
}

export interface FetchPosts_posts {
  __typename: "PostFeed";
  cursor: string;
  hasMore: boolean;
  posts: FetchPosts_posts_posts[];
}

export interface FetchPosts {
  posts: FetchPosts_posts | null;
}

export interface FetchPostsVariables {
  cursor?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchPostDetails
// ====================================================

export interface FetchPostDetails_postDetails_commentFeed_comments_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface FetchPostDetails_postDetails_commentFeed_comments {
  __typename: "Comment";
  id: number;
  text: string;
  user: FetchPostDetails_postDetails_commentFeed_comments_user;
}

export interface FetchPostDetails_postDetails_commentFeed {
  __typename: "CommentFeed";
  cursor: string;
  hasMore: boolean;
  comments: (FetchPostDetails_postDetails_commentFeed_comments | null)[];
}

export interface FetchPostDetails_postDetails {
  __typename: "PostWithLikeCount";
  id: number;
  commentFeed: FetchPostDetails_postDetails_commentFeed | null;
}

export interface FetchPostDetails {
  postDetails: FetchPostDetails_postDetails | null;
}

export interface FetchPostDetailsVariables {
  postId: number;
  cursor?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PostFeedSubscription
// ====================================================

export interface PostFeedSubscription_postFeedUpdates_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface PostFeedSubscription_postFeedUpdates {
  __typename: "PostWithLikeCount";
  id: number;
  musicLink: string;
  musicLinkImg: string | null;
  musicLinkTitle: string | null;
  musicLinkSite: string | null;
  commentary: string | null;
  likes: number | null;
  user: PostFeedSubscription_postFeedUpdates_user | null;
}

export interface PostFeedSubscription {
  postFeedUpdates: PostFeedSubscription_postFeedUpdates | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PostUpdatesSubscription
// ====================================================

export interface PostUpdatesSubscription_postUpdates_commentFeed_comments_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface PostUpdatesSubscription_postUpdates_commentFeed_comments {
  __typename: "Comment";
  id: number;
  text: string;
  user: PostUpdatesSubscription_postUpdates_commentFeed_comments_user;
}

export interface PostUpdatesSubscription_postUpdates_commentFeed {
  __typename: "CommentFeed";
  comments: (PostUpdatesSubscription_postUpdates_commentFeed_comments | null)[];
}

export interface PostUpdatesSubscription_postUpdates {
  __typename: "PostWithLikeCount";
  id: number;
  likes: number | null;
  musicLinkImg: string | null;
  musicLinkSite: string | null;
  musicLinkTitle: string | null;
  commentFeed: PostUpdatesSubscription_postUpdates_commentFeed | null;
}

export interface PostUpdatesSubscription {
  postUpdates: PostUpdatesSubscription_postUpdates | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurveys
// ====================================================

export interface FetchSurveys_surveys_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurveys_surveys_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurveys_surveys_currentQuestion_answers[];
}

export interface FetchSurveys_surveys {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurveys_surveys_currentQuestion | null;
}

export interface FetchSurveys {
  surveys: FetchSurveys_surveys[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SurveySubscription
// ====================================================

export interface SurveySubscription_surveyUpdates_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveySubscription_surveyUpdates_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveySubscription_surveyUpdates_currentQuestion_answers[];
}

export interface SurveySubscription_surveyUpdates {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: SurveySubscription_surveyUpdates_currentQuestion | null;
}

export interface SurveySubscription {
  surveyUpdates: SurveySubscription_surveyUpdates | null;
}

export interface SurveySubscriptionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurvey
// ====================================================

export interface FetchSurvey_survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurvey_survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurvey_survey_currentQuestion_answers[];
}

export interface FetchSurvey_survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurvey_survey_currentQuestion | null;
}

export interface FetchSurvey {
  survey: FetchSurvey_survey | null;
}

export interface FetchSurveyVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment {
  __typename: "Comment";
  id: number;
}

export interface CreateComment {
  createComment: CreateComment_createComment;
}

export interface CreateCommentVariables {
  input: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowUser
// ====================================================

export interface FollowUser {
  followUser: boolean | null;
}

export interface FollowUserVariables {
  input: FollowInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikePost
// ====================================================

export interface LikePost {
  likePost: boolean | null;
}

export interface LikePostVariables {
  postId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: "Post";
  id: number;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  input: PostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AnswerSurveyQuestion
// ====================================================

export interface AnswerSurveyQuestion {
  answerSurvey: boolean;
}

export interface AnswerSurveyQuestionVariables {
  input: SurveyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextSurveyQuestion
// ====================================================

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers[];
}

export interface NextSurveyQuestion_nextSurveyQuestion {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: NextSurveyQuestion_nextSurveyQuestion_currentQuestion | null;
}

export interface NextSurveyQuestion {
  nextSurveyQuestion: NextSurveyQuestion_nextSurveyQuestion | null;
}

export interface NextSurveyQuestionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Comment
// ====================================================

export interface Comment_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface Comment {
  __typename: "Comment";
  id: number;
  text: string;
  user: Comment_user;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostWithLikeCount
// ====================================================

export interface PostWithLikeCount_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface PostWithLikeCount {
  __typename: "PostWithLikeCount";
  id: number;
  musicLink: string;
  musicLinkImg: string | null;
  musicLinkTitle: string | null;
  musicLinkSite: string | null;
  commentary: string | null;
  likes: number | null;
  user: PostWithLikeCount_user | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostFeed
// ====================================================

export interface PostFeed_posts_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userType: UserType;
}

export interface PostFeed_posts {
  __typename: "PostWithLikeCount";
  id: number;
  musicLink: string;
  musicLinkImg: string | null;
  musicLinkTitle: string | null;
  musicLinkSite: string | null;
  commentary: string | null;
  likes: number | null;
  user: PostFeed_posts_user | null;
}

export interface PostFeed {
  __typename: "PostFeed";
  cursor: string;
  hasMore: boolean;
  posts: PostFeed_posts[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Survey
// ====================================================

export interface Survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface Survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: Survey_currentQuestion_answers[];
}

export interface Survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: Survey_currentQuestion | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SurveyQuestion
// ====================================================

export interface SurveyQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveyQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveyQuestion_answers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CommentInput {
  text: string;
  postId: number;
}

export interface FollowInput {
  followerId: number;
  followeeId: number;
}

export interface PostInput {
  musicLink: string;
  commentary?: string | null;
}

export interface SurveyInput {
  questionId: number;
  answer: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
