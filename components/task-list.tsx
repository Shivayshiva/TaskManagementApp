"use client"

import { useTask } from "@/contexts/task-context"
import { TaskCard } from "@/components/task-card"
import { useMemo } from "react"

export function TaskList() {
  const { state } = useTask()

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (state.filter.status && task.status !== state.filter.status) return false
      if (state.filter.priority && task.priority !== state.filter.priority) return false
      if (state.filter.type && task.type !== state.filter.type) return false
      if (state.filter.search && !task.title.toLowerCase().includes(state.filter.search.toLowerCase())) return false
      return true
    })
  }, [state.tasks, state.filter])

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff

      // Then by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      if (a.dueDate) return -1
      if (b.dueDate) return 1

      // Finally by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [filteredTasks])

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-muted-foreground mb-4">
          <div className="text-lg font-medium">No tasks found</div>
          <div className="text-sm">Create your first task to get started</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
