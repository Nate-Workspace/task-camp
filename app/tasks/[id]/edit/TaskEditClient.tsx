'use client'; 

import dynamic from 'next/dynamic';
// import IssueFormSkeleton from '@/app/tasks/_components/TaskForm';

const TaskForm= dynamic(()=>import('@/app/tasks/_components/TaskForm'), {ssr:false} )

const TaskEditClient = ({ task }: { task: any }) => {
  return <TaskForm task={task} />;
};

export default TaskEditClient;
