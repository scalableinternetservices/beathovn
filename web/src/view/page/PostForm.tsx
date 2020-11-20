import CSS from 'csstype'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { createPost } from '../playground/mutatePost'
import { handleError } from '../toast/error'

const divContainerStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding: '20px',
  margin: '10px',
}

const sideBySide: CSS.Properties = {
  margin: '10px 10px 10px 0px',
}

export function PostForm() {
  const [commentary, setCommentary] = useState('')
  const [musicLink, setMusicLink] = useState('')

  function submitForm(musicLink: string, commentary: string) {
    createPost({ musicLink: musicLink, commentary: commentary }).catch(handleError)
    console.log('We have submitted the form!')
  }

  return (
    <div style={divContainerStyle}>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Music Link
        </label>
        <Input $onChange={setMusicLink} name="email" type="email" />
      </div>
      <div className="mt3" style={sideBySide}>
        <label className="db fw4 lh-copy f6">Commentary</label>
        <Input $onChange={setCommentary} />
      </div>
      <div className="mt3">
        <Button onClick={() => submitForm(musicLink, commentary)} style={sideBySide}>
          Submit Post
        </Button>
      </div>
    </div>
  )
}
