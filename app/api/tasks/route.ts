import { taskSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = taskSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status || "OPEN",
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
