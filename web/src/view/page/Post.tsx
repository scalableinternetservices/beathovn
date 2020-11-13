import CSS from 'csstype';
import * as React from 'react';

const containerStyle: CSS.Properties = {
  padding: '4px 32px'
}

const cardStyle: CSS.Properties = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
}

export function Post(props: {
  commentary: string | null
  musicLink: string | null
}) {

  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        <p>{props.musicLink}</p>
        <h3>{props.commentary}</h3>
      </div>
    </div>
  )
}