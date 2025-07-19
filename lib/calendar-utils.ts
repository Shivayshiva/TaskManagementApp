import type { Task } from "@/types/task"

export function getTasksForDate(tasks: Task[], date: Date): Task[] {
  const dateStr = date.toISOString().split("T")[0]
  return tasks.filter((task) => task.dueDate === dateStr)
}

export function getTaskCountColor(count: number): string {
  if (count === 0) return ""
  if (count === 1) return "bg-blue-100 dark:bg-blue-900/30"
  if (count === 2) return "bg-blue-200 dark:bg-blue-800/50"
  if (count === 3) return "bg-blue-300 dark:bg-blue-700/70"
  if (count >= 4) return "bg-blue-400 dark:bg-blue-600/90"
  return ""
}

export function getUrgentTaskCount(tasks: Task[], date: Date): number {
  const dateStr = date.toISOString().split("T")[0]
  return tasks.filter((task) => task.dueDate === dateStr && task.priority === "urgent").length
}

export function getTasksByPriority(tasks: Task[]) {
  return {
    urgent: tasks.filter((task) => task.priority === "urgent"),
    high: tasks.filter((task) => task.priority === "high"),
    medium: tasks.filter((task) => task.priority === "medium"),
    low: tasks.filter((task) => task.priority === "low"),
  }
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export function isOverdue(dueDate: string, dueTime?: string): boolean {
  const now = new Date()
  const due = new Date(dueDate)

  if (dueTime) {
    const [hours, minutes] = dueTime.split(":").map(Number)
    due.setHours(hours, minutes)
  } else {
    // If no time specified, consider it due at end of day
    due.setHours(23, 59, 59)
  }

  return due < now
}
