"use client"

import "easymde/dist/easymde.min.css"
import dynamic from 'next/dynamic'


const TaskForm = dynamic(() => import("@/app/tasks/_components/TaskForm"), {
  ssr: false,
});


type Status= "OPEN" | "IN_PROGRESS" | "CLOSED";
interface TaskForm{
    title: string;
    description: string;
    status?: Status;
}

const NewTasks = () => {
    
  return (
      <TaskForm/>
  )
}

export default NewTasks