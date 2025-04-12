import { z } from "zod";

const statusEnum = z.enum(["OPEN", "IN_PROGRESS", "CLOSED", ""]);

export const taskSchema = z.object({
  title: z.string().min(1, "Title required").max(255),
  description: z.string().min(1, "Description required").max(65535),
  status: statusEnum.optional(),
});

export const patchTaskSchema = z.object({
  title: z.string().min(1, "Title required").max(255).optional(),
  description: z.string().min(1, "Description required").max(65535).optional(),
  status: statusEnum.optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
