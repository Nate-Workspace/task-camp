"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "CLOSED";
    createdAt: Date;
  };
}

// Pick icon based on status
const getStatusIcon = (status: "OPEN" | "IN_PROGRESS" | "CLOSED") => {
  switch (status) {
    case "OPEN":
      return <AiOutlineCloseCircle className="text-red-500" size={20} />;
    case "IN_PROGRESS":
      return <AiOutlineClockCircle className="text-yellow-500" size={20} />;
    case "CLOSED":
      return <AiOutlineCheckCircle className="text-green-500" size={20} />;
    default:
      return null;
  }
};

const TaskCard = ({ task }: TaskCardProps) => {
  const statusIcon = getStatusIcon(task.status);
  const formattedDate = new Date(task.createdAt).toLocaleDateString();
  const router = useRouter();

  const [isLoading, setIsLoading]= useState(false)

  const onEdit = (id: string) => {
    router.push(`/tasks/${id}/edit`);
  };

  const onDelete= async (id:string)=>{
    try {
        setIsLoading(true)
        await axios.delete(`/api/tasks/${id}`)
        router.refresh()
    } catch (error) {
        console.error(error)
        toast.error("Error while deleting the task")
        setIsLoading(false)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <Card className="w-full space-y-[-5px] max-w-sm shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardHeader className="flex items-start gap-2">
        {statusIcon}
        <div className="flex flex-col">
          <CardTitle>
            <span>{task.title}</span>
          </CardTitle>
          <CardDescription>Created at: {formattedDate}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-2">
            <p>Status: </p>
            <TaskStatusBadge status={task.status} />
          </div>

          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={()=> onDelete(task.id)} variant="destructive" className="hover:cursor-pointer">Delete</Button>
          <Button size="sm" onClick={() => onEdit(task.id)} className="hover:cursor-pointer">
            Edit
          </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
