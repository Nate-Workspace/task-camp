"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import React from 'react'

const newTasks = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <Input placeholder='Title'></Input>
        <Textarea placeholder="Type your message here." />
        <Button>Add New Task</Button>
    </div>
  )
}

export default newTasks