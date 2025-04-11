'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

  const router= useRouter();

  const onEdit= (id: string)=>{
    router.push(`/tasks/edit/${id}`)
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
        <p>{task.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
        <p>Status: </p>
        <TaskStatusBadge status={task.status} />
        </div>

        <Button size='sm' onClick={()=> onEdit(task.id)}>Edit</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
