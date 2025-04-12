import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@prisma/client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";
interface TaskForm {
  title: string;
  description: string;
  status?: Status;
}

const TaskForm = ({ task }: { task?: Task }) => {
  const { register, control, handleSubmit, setValue, watch } = useForm<TaskForm>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  
  const status = watch("status");

  useEffect(() => {
    if (task && task.status) {
      setValue("status", task.status); 
    }
  }, [task, setValue]);

  const onSubmit = async (data: TaskForm) => {
    if (submitting) return; 
    setError("");
    try {
      setSubmitting(true);
      if (task) {
        await axios.patch(`/api/tasks/${task.id}`, data);
      } else {
        await axios.post("/api/tasks", data);
      }
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Error creating a task");
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        defaultValue={task?.title}
        placeholder="Title"
        {...register("title")}
      />
      <Controller
        name="description"
        control={control}
        defaultValue={task?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Type your message here." {...field} />
        )}
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <label>Status: </label>
          <Select
            value={status || "OPEN"} 
            onValueChange={(value) => setValue("status", value as Status)} 
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button disabled={submitting} className="hover:cursor-pointer">
          {task ? "Edit the task" : "Add New Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
