import { notFound } from 'next/navigation';
import prisma from '@/prisma/client'
import React from 'react'
import TaskEditClient from './TaskEditClient';

type Props = {
    params: Promise<{ id: string }>;
  };

const TaskEditId: React.FC<Props> = async ({ params }) => {

    const { id } = await params;

    const task = await prisma.task.findUnique({
        where: { id: id },
      });
    
      if (!task) notFound();

      console.log("this is from edit page")

  return (
    <TaskEditClient task={task} />
  )
}

export default TaskEditId