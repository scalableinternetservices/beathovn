import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Login } from '../auth/Login'
import { AppRouteParams, PlaygroundApp } from '../nav/route'
import { Page } from './Page'

interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams {}

export function PlaygroundPage(props: PlaygroundPageProps) {
  return <Page>{getPlaygroundApp(props.app)}</Page>
}

function getPlaygroundApp(app?: PlaygroundApp) {
  if (!app) {
    return <div>choose an app</div>
  }
  switch (app) {
    // case PlaygroundApp.SURVEYS:
    //   return <Surveys />
    case PlaygroundApp.LOGIN:
      return <Login type="Up" />
    default:
      return <Login type="Up" />
  }
}
