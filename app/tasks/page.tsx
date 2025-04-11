import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import prisma from "@/prisma/client"
import TaskCard from './TaskCard'

const Tasks = async () => {
  const tasks= await prisma.task.findMany()
  return (
    <div>
        <p>Manage your tasks</p> 
        <Button><Link href="/tasks/new">Create</Link></Button>
        <ul className='space-y-3'>
          {tasks.length===0 && <p>No tasks found</p>}
          {tasks.map((task)=>(
            <li key={task.id}>
              <TaskCard task={task}/>
            </li>
          ))}
        </ul>

    </div>
  )
}

export default Tasks