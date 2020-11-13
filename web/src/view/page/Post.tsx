import CSS from 'csstype';
import * as React from 'react';

const containerStyle: CSS.Properties = {
  padding: '4px 32px'
}

const cardStyle: CSS.Properties = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
}

const buttonStyle: CSS.Properties = {
  backgroundColor: '#000000',
  color: '#FFFFFF'
}

function likeButtonHandler() {
  console.log("The like button was clicked")
}

export function Post(props: {
  commentary: string | null
  musicLink: string | undefined
}) {

  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        <a href={props.musicLink} target="_blank">Song Link</a>
        <h3>{props.commentary}</h3>
        <button style={buttonStyle} type="button" onClick={likeButtonHandler}>Like</button>
      </div>
    </div>
  )
}