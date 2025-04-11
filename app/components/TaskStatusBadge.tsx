import { Status } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; className: string }
> = {
  OPEN: { label: "Open", className: "bg-red-100 text-red-800" },
  IN_PROGRESS: { label: "In Progress", className: "bg-violet-100 text-violet-800" },
  CLOSED: { label: "Closed", className: "bg-green-100 text-green-800" },
};

const TaskStatusBadge = ({ status }: { status: Status }) => {
  const { label, className } = statusMap[status];

  return <Badge className={className}>{label}</Badge>;
};

export default TaskStatusBadge;
