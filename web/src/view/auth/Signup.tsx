import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { handleError } from '../toast/error'
import { toastErr } from '../toast/toast'
import { UserContext } from './user'

export function Signup() {
  const [email, setEmail] = useState('')
  const [err, setError] = useState({ email: false })
  const { user } = useContext(UserContext)

  // reset error when email/password change
  useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])

  function signup() {
    if (!validate(email, setError)) {
      toastErr('invalid email/password')
      return
    }

    fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.reload())
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true })
      })
  }

  if (user) {
    return <Logout />
  }

  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Email address
        </label>
        <Input $hasError={err.email} $onChange={setEmail} $onSubmit={signup} name="email" type="email" />
      </div>
      <div className="mt3">
        <Button onClick={signup}>Sign Up</Button>
      </div>
    </>
  )
}

function Logout() {
  function logout() {
    return fetch('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        window.location.reload()
      })
      .catch(handleError)
  }

  return (
    <>
      <Spacer $h5 />
      <Button onClick={logout}>Logout</Button>
    </>
  )
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validate(
  email: string,
  setError: React.Dispatch<React.SetStateAction<{ email: boolean }>>
) {
  const validEmail = validateEmail(email)
  console.log('valid', validEmail)
  setError({ email: !validEmail })
  return validEmail
}
