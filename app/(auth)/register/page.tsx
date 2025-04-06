import React from 'react'
import { RegisterForm } from './RegisterForm'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md mx-auto">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register