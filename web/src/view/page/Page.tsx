import CSS from 'csstype'
import * as React from 'react'
import { NavBar } from '../nav/NavBar'

const pageStyle: CSS.Properties = {
  width: '100%',
  position: 'relative',
}
export function Page(props: React.PropsWithChildren<JSX.IntrinsicElements['div']>) {
  return (
    <div className="mw8" style={pageStyle}>
      <NavBar />
      {props.children}
    </div>
  )
}
