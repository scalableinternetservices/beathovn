import CSS from 'csstype'
import * as React from 'react'
import { useContext, useState } from 'react'
import { Comment, PostWithLikeCount } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { UserContext } from '../auth/user'
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
  // console.log(props.postData.comments);

  const likeButtonHandler = () => {
    console.log('The like button was clicked!')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    likePost(props.postData.id)
  }

  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        <a href={props.postData.musicLink} target="_blank">
          Song Link
        </a>
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
        {displayComments && <Comments commentData={props.postData.comments} />}
        {user && <CommentInput postId={props.postData.id} />}
      </div>
    </div>
  )
}

function Comments(props: { commentData: Comment[] }) {
  return (
    <div>
      <h3>WE ARE DISPLAYING THE COMMENTS</h3>
      {props.commentData.map((cmnt, i) => (
        <h2 key={i}>
          {cmnt.user?.name || 'anon'}: {cmnt.text}
        </h2>
      ))}
    </div>
  )
}

function CommentInput(props: { postId: number }) {
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
