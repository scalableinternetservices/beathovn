import CSS from 'csstype'
import * as React from 'react'
import { useContext, useState } from 'react'
import { PostWithLikeCount } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { UserContext } from '../auth/user'
import { fetchPostComments } from '../playground/fetchPost'
import { createComment } from '../playground/mutateComment'
import { likePost } from '../playground/mutateLike'
import { Link } from './Link'

const containerStyle: CSS.Properties = {
  padding: '4px 32px',
}

const cardStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding: '20px',
  margin: '10px',
}

const likeButtonStyle: CSS.Properties = {
  backgroundColor: '#000000',
  color: '#FFFFFF',
  margin: '10 px',
}

const commentButtonStyle: CSS.Properties = {
  backgroundColor: 'black',
  color: '#FFFFFF',
  margin: '10px',
}

export function Post(props: { postData: PostWithLikeCount }) {
  const [displayComments, setDisplayComments] = useState(false)
  const { user } = useContext(UserContext)
  const [loadingComments, setLoadingComments] = useState(false)
  // console.log(props.postData.comments);

  const { data: commentData, fetchMore } = fetchPostComments(props.postData.id)

  const fetchMoreComments = async () => {
    setLoadingComments(true)
    await fetchMore({
      variables: {
        postId: props.postData.id,
        cursor: commentData?.postDetails?.commentFeed?.cursor,
      },
    })
    setLoadingComments(false)
  }

  const likeButtonHandler = () => {
    console.log('The like button was clicked!')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    likePost(props.postData.id)
  }

  const Comments = () => {
    const comments = commentData?.postDetails?.commentFeed?.comments || []

    return (
      <div>
        <h3>WE ARE DISPLAYING THE COMMENTS</h3>
        {comments.map(
          (cmnt, i) =>
            cmnt && (
              <h2 key={i}>
                {cmnt.user?.name || 'anon'}: {cmnt.text}
              </h2>
            )
        )}
        {comments &&
          (commentData?.postDetails?.commentFeed?.hasMore) &&
          (loadingComments ? <div> Loading comments... </div> : <Button onClick={fetchMoreComments}>Load More</Button>)}
      </div>
    )
  }

  const CommentInput = (props: { postId: number }) => {
    const [text, setText] = useState('')

    const createCommentHandler = (text: string) => {
      console.log('commenting...')
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      createComment({ text, postId: props.postId })
      setText('')
    }

    return (
      <div>
        <Input $onChange={setText} name="text" type="text" placeholder="thoughts?" value={text} />
        <Button onClick={() => createCommentHandler(text)}>Submit</Button>
      </div>
    )
  }

  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        {/* <a href={props.postData.musicLink} target="_blank">
          Song Link
        </a> */}
        <Link
          musicLink={props.postData.musicLink}
          musicLinkImg={props.postData.musicLinkImg || ''}
          musicLinkSite={props.postData.musicLinkSite || ''}
          musicLinkTitle={props.postData.musicLinkTitle || ''}
          uniqueId={props.postData.id}/>
        <h3>{props.postData.commentary}</h3>
        <h3>likes: {props.postData.likes} </h3>
        {user && (
          <Button style={likeButtonStyle} type="button" onClick={likeButtonHandler}>
            👍
          </Button>
        )}
        <Button style={commentButtonStyle} type="button" onClick={() => setDisplayComments(!displayComments)}>
          Show Comments
        </Button>
        {displayComments && <Comments />}
        {user && <CommentInput postId={props.postData.id} />}
      </div>
    </div>
  )
}
