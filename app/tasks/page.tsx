import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
// import prisma

const Tasks = () => {
  // const tasks= 
  return (
    <div>
        <p>Manage your tasks</p> 
        <Button><Link href="/tasks/new">Create</Link></Button>

    </div>
  )
}

export default Tasks