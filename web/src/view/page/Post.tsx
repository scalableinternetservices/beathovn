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
  const [staleComments, setStaleComments] = useState(false)
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
    setStaleComments(false)
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
          (commentData?.postDetails?.commentFeed?.hasMore || staleComments) &&
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
      setStaleComments(true)
    }

    return (
      <div>
        <Input $onChange={setText} name="text" type="text" placeholder="thoughts?" value={text} />
        <Button onClick={() => createCommentHandler(text)}>Submit</Button>
      </div>
    )
  }

  //TODO: NEED TO CHANGE THIS LINK DEPENDING ON WHERE THE SERVER IS BEING HOSTED
  let imageURL = ''
  const serverURL = 'http://localhost:3000/link' as string
  const httpRequest = new XMLHttpRequest()
  httpRequest.open('POST', serverURL)
  httpRequest.setRequestHeader('Content-Type', 'application/json')
  httpRequest.send(JSON.stringify({ url: props.postData.musicLink }))
  httpRequest.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const previewData = JSON.parse(httpRequest.response)
      console.log(previewData.img)
      imageURL = previewData.img as string
        ; (document.querySelector('.img') as HTMLInputElement).src = previewData.img
    }
  }

  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        <a href={props.postData.musicLink} target="_blank">
          Song Link
        </a>
        <img className="img" src={imageURL}></img>
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
