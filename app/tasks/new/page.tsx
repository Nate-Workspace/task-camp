"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {useForm, Controller} from 'react-hook-form'
import React, { useState } from 'react'
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'


const SimpleMDE= dynamic(()=> import("react-simplemde-editor"), {ssr: false})

type Status= "OPEN" | "IN_PROGRESS" | "CLOSED";
interface TaskForm{
    title: string;
    description: string;
    status?: Status;
}

const NewTasks = () => {
    const {register, control, handleSubmit} = useForm<TaskForm>()
    const router= useRouter()
    const [error, setError]= useState('')
    const onSubmit= async (data:TaskForm)=>{
      try {
        await axios.post("/api/tasks", {...data, status: "IN_PROGRESS"});
        router.push("/tasks")
      } catch (error) {
        setError("Error creating a task")
      }

      if(error){
        toast.error(error)
      }
    }
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder='Title' {...register("title")}></Input>
        <Controller 
        name='description'
        control={control}
        render={({field})=> <SimpleMDE placeholder="Type your message here." {...field}/>}
        />
        <Button>Add New Task</Button>
    </form>
  )
}

export default NewTasks