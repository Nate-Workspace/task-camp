import React from 'react'
import { LoginForm } from './LoginForm'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login