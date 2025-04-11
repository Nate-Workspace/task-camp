import { notFound } from 'next/navigation';
import prisma from '@/prisma/client'
import TaskEditClient from './TaskEditClient';
import React from 'react'

type Props = {
    params: Promise<{ id: string }>;
  };

const TaskEditId: React.FC<Props> = async ({ params }) => {

    const { id } = await params;

    const task = await prisma.task.findUnique({
        where: { id: id },
      });
    
      if (!task) notFound();

  return (
    <TaskEditClient task={task} />
  )
}

export default TaskEditId