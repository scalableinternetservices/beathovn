import * as React from 'react'
import { useState } from 'react'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { createPost } from '../playground/mutatePost'
import { handleError } from '../toast/error'


export function PostForm() {
  const [commentary, setCommentary] = useState('')
  const [musicLink, setMusicLink] = useState('')


  function submitForm(musicLink: string, commentary: string) {
    createPost({ musicLink: musicLink, commentary: commentary }).catch(handleError)
    console.log("We have submitted the form!")
  }

  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Music Link
        </label>
        <Input $onChange={setMusicLink} name="email" type="email" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6">
          Commentary
        </label>
        <Input $onChange={setCommentary} />
      </div>
      <div className="mt3">
        <Button onClick={() => submitForm(musicLink, commentary)}>Submit Post</Button>
      </div>
    </>
  )
}


