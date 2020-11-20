import CSS from 'csstype'
import * as React from 'react'

const containerStyle: CSS.Properties = {
  padding: '4px 32px',
}

const cardStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding: '20px',
  margin: '10px',
}

export function Post(props: { commentary: string | null; musicLink: string | null }) {
  return (
    <div className="card" style={cardStyle}>
      <div className="container" style={containerStyle}>
        <p>{props.musicLink}</p>
        <h3>{props.commentary}</h3>
      </div>
    </div>
  )
}
