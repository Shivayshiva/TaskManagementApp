export type TaskStatus = "todo" | "in-progress" | "completed" | "archived"
export type TaskPriority = "low" | "medium" | "high" | "urgent"
export type TaskType = "one-time" | "recurring" | "habit" | "goal" | "sub-task"

export interface Subtask {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  type: TaskType
  dueDate?: string
  dueTime?: string
  tags: string[]
  subtasks: Subtask[]
  parentId?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface TaskFilter {
  status?: TaskStatus
  priority?: TaskPriority
  type?: TaskType
  search: string
}

export type ViewType = "list" | "kanban" | "calendar"
