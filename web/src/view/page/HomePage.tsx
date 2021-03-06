import { useSubscription } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { FetchPosts, FetchPosts_posts_posts } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { fetchPosts, postFeedSubscription, postUpdatesSubscription } from '../playground/fetchPost'
import { Page } from './Page'
import { Post } from './Post'
import { PostForm } from './PostForm'

interface PostsPageProps extends RouteComponentProps, AppRouteParams {}

const buildFetchPostsWithNewPosts = (prev: FetchPosts, newPosts: FetchPosts_posts_posts[]): FetchPosts => {
  return Object.assign({}, prev, {
    posts: {
      ...prev.posts,
      posts: newPosts,
    },
  })
}

export function PostsPage(props: PostsPageProps) {
  const { user } = useContext(UserContext)
  const { loading, data, fetchMore, subscribeToMore } = fetchPosts()
  useSubscription(postUpdatesSubscription)

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchMorePosts = async () => {
    setIsLoadingMore(true)
    await fetchMore({
      variables: {
        cursor: data?.posts?.cursor,
      },
    })
    setIsLoadingMore(false)
  }

  const subscribeToMorePostFeed = () => {
    subscribeToMore({
      document: postFeedSubscription,
      updateQuery: (prev: FetchPosts, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return buildFetchPostsWithNewPosts(prev, [])
        }
        const data: any = subscriptionData.data
        const newPost = data.postFeedUpdates
        const exists = prev.posts?.posts.find(({ id }) => id === newPost.id)

        if (exists) {
          return buildFetchPostsWithNewPosts(prev, [])
        }

        return buildFetchPostsWithNewPosts(prev, [newPost])
      },
    })
  }

  useEffect(() => {
    subscribeToMorePostFeed()
  }, [])

  if (loading) {
    return <div>Loading....</div>
  }

  if (!data || data.posts?.posts.length === 0) {
    return (
      <Page>
        {user && <PostForm />}
        <div>no posts</div>
      </Page>
    )
  }
  // console.log('Posts length is : ' + data.posts.length)
  // for (let i = 0; i < data.posts.length; i++) {
  //   console.log('updated output', data.posts[i])
  // }
  return (
    <Page>
      {user && <PostForm />}
      {data.posts?.posts.map((p, i) => (
        <div key={i}>
          <Post postData={p} />
        </div>
      ))}
      {data.posts &&
        data.posts.hasMore &&
        (isLoadingMore ? <div> Loading... </div> : <Button onClick={fetchMorePosts}>Load More</Button>)}
    </Page>
  )
}

/*
export function HomePage(props: HomePageProps) {
  return (
    <Page>
      {/* <Hero>
        <H1>CS 188</H1>
        <H3>Scalable Internet Services</H3>
        <H3>UCLA, Fall 2020</H3>
      </Hero>
      <Content>
        <LContent>
          <Section>
            <H2>About CS 188</H2>
            <Spacer $h4 />
            <BodyText>
              ☝️ This course explores advanced topics in highly scalable internet services and their underlying
              architecture.
            </BodyText>
            <Spacer $h4 />
            <BodyText>
              Software today is increasingly delivered as a service: accessible globally via web browsers and mobile
              applications and backed by millions of servers. Modern technologies and platforms are making it easier to
              build and deploy these systems. Yet despite these advances, some concerns just don't go away. Building
              scalable services today still requires an understanding of topics like concurrency, caching, load
              balancing, and observability. In this course we will examine the state of the art.
            </BodyText>
          </Section>
          <Section>
            <H2>Getting Started</H2>
            <Spacer $h4 />
            <BodyText>In the first week of class, please complete the following:</BodyText>
            <Spacer $h4 />
            <BodyText>
              <ul className="pl4">
                <li>
                  Follow the <Link href="https://github.com/rothfels/beathovn#quickstart">project Quickstart</Link> to
                  configure your dev environment.
                </li>
                <li>
                  Find a project team. See <Link to={getPath(Route.PROJECTS)}>Projects</Link> for details.
                </li>
                <li>
                  Join the <Link href="https://piazza.com/ucla/fall2020/cs188">CS188 Piazza</Link>.
                </li>
              </ul>
            </BodyText>
          </Section>
        </LContent>
        <RContent>
          <Section>
            <H2>Course Information</H2>
            <Spacer $h4 />
            <BodyText>
              <table>
                <tbody>
                  <tr>
                    <TD>👨‍🏫</TD>
                    <TD>John Rothfels</TD>
                  </tr>
                  <tr>
                    <TD>✉️</TD>
                    <TD>
                      <Link href="mailto://rothfels@cs.ucla.edu">rothfels@cs.ucla.edu</Link>
                    </TD>
                  </tr>
                  <tr>
                    <TD>⏯</TD>
                    <TD>
                      <Link href="https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09">Zoom</Link>
                    </TD>
                  </tr>
                  <tr>
                    <TD>🕒</TD>
                    <TD>
                      <div>
                        <b>Tue, Thu</b> · 8:00 - 9:50am
                      </div>
                    </TD>
                  </tr>
                  <tr>
                    <TD></TD>
                    <TD>
                      <div>
                        <b>Fri</b> · 12:00 - 1:50pm
                      </div>
                      <div>
                        <b>Fri</b> · 2:00 - 3:50pm
                      </div>
                    </TD>
                  </tr>
                </tbody>
              </table>
            </BodyText>
          </Section>
          <Section>
            <H2>Resources</H2>
            <Spacer $h4 />
            <BodyText>
              <ul className="ml4">
                <li>
                  <Link block href="https://www.typescriptlang.org/docs/handbook/intro.html">
                    TypeScript handbook
                  </Link>
                  <Link block href="https://basarat.gitbook.io/typescript/">
                    TypeScript deep-dive
                  </Link>
                </li>
                <li>
                  <Link block href="https://www.typescriptlang.org/play">
                    TypeScript playground
                  </Link>
                </li>
                <li>
                  <Link block href="https://reactjs.org/tutorial/tutorial.html">
                    React tutorial
                  </Link>
                </li>
                <li>
                  <Link block href="https://reactjs.org/docs/hello-world.html">
                    React docs
                  </Link>
                </li>
                <li>
                  <Link block href="https://www.apollographql.com/docs/react/data/queries/">
                    Apollo client docs
                  </Link>
                </li>
                <li>
                  <Link block href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">
                    <code>fetch</code> docs
                  </Link>
                </li>
                <li>
                  <Link block href="#">
                    Project troubleshooting
                  </Link>
                </li>
              </ul>
            </BodyText>
          </Section>
        </RContent>
      </Content> }
  )
} */

// const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
//   borderLeftColor: Colors.purple + '!important',
//   borderRightColor: Colors.purple + '!important',
//   borderLeftWidth: '4px',
//   borderRightWidth: '4px',
// })

// const Content = style('div', 'flex-l')

// const LContent = style('div', 'flex-grow-0 w-70-l mr4-l')

// const RContent = style('div', 'flex-grow-0  w-30-l')

// const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
//   borderLeftColor: Colors[p.$color || 'purple'] + '!important',
//   borderLeftWidth: '3px',
// }))

// const TD = style('td', 'pa1', p => ({
//   color: p.$theme.textColor(),
// }))
