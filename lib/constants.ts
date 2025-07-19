import type { TaskStatus, TaskPriority, TaskType } from "@/types/task"

export const TASK_STATUSES: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
]

export const TASK_PRIORITIES: { value: TaskPriority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-green-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "urgent", label: "Urgent", color: "bg-red-500" },
]

export const TASK_TYPES: { value: TaskType; label: string }[] = [
  { value: "one-time", label: "One-time" },
  { value: "recurring", label: "Recurring" },
  { value: "habit", label: "Habit" },
  { value: "goal", label: "Goal" },
  { value: "sub-task", label: "Sub-task" },
]
