import CSS from 'csstype'
import * as React from 'react'
import { useState } from 'react'
import { Comment, PostWithLikeCount } from '../../graphql/query.gen'

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

function likeButtonHandler() {
  console.log('The like button was clicked!')
}

export function Post(props: { postData: PostWithLikeCount }) {
  const [displayComments, setDisplayComments] = useState(false)
  console.log(props.postData.comments);
  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        <a href={props.postData.musicLink} target="_blank">
          Song Link
        </a>
        <h3>{props.postData.commentary}</h3>
        <h3>likes: {props.postData.likes} </h3>
        <button style={likeButtonStyle} type="button" onClick={likeButtonHandler}>
          Like
        </button>
        <button style={commentButtonStyle} type="button" onClick={() => setDisplayComments(!displayComments)}>
          Show Comments
        </button>
        {displayComments && <Comments commentData={props.postData.comments}/>}
      </div>
    </div>
  )
}

function Comments(props: { commentData: Comment[] }) {
  return (
    <div>
      <h3>WE ARE DISPLAYING THE COMMENTS</h3>
      {props.commentData.map((cmnt, i) => (
        <h2 key={i}>{cmnt.user?.name || 'anon'}: {cmnt.text}</h2>
      ))}
    </div>
  )
}
