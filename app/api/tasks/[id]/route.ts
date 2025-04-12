import { taskSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";  

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }){
    const body= await request.json()
    const validation= taskSchema.safeParse(body)

    const {title, description, status}= body;

    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const { id } = await context.params;

    const task = await prisma.task.findUnique({
        where: { id: id }
    });

    if (!task) {
        return NextResponse.json({ error: "Invalid task" }, { status: 404 });
    }

    console.log(task)

    const updatedIssue= await prisma.task.update({
        where:{
            id: id
        },
        data: {
            title,
            description,
            status: status || "OPEN",
        }
    })

    return NextResponse.json(updatedIssue);
}


export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
  
    const task = await prisma.task.findUnique({
      where: { id: id },
    });
  
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
  
    await prisma.task.delete({
      where: { id: task.id },
    });
  
    return NextResponse.json({}, { status: 200 });
  }