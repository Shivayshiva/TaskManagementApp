"use client"

import type React from "react"

import { useTask, type TaskStatus } from "@/contexts/task-context"
import { TaskCard } from "@/components/task-card"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"

const statusConfig = {
  todo: { label: "To Do", color: "bg-slate-100 dark:bg-slate-800" },
  "in-progress": { label: "In Progress", color: "bg-blue-100 dark:bg-blue-900" },
  completed: { label: "Completed", color: "bg-green-100 dark:bg-green-900" },
  archived: { label: "Archived", color: "bg-gray-100 dark:bg-gray-800" },
}

export function KanbanBoard() {
  const { state, updateTask } = useTask()

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (state.filter.priority && task.priority !== state.filter.priority) return false
      if (state.filter.type && task.type !== state.filter.type) return false
      if (state.filter.search && !task.title.toLowerCase().includes(state.filter.search.toLowerCase())) return false
      return true
    })
  }, [state.tasks, state.filter])

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, typeof filteredTasks> = {
      todo: [],
      "in-progress": [],
      completed: [],
      archived: [],
    }

    filteredTasks.forEach((task) => {
      grouped[task.status].push(task)
    })

    return grouped
  }, [filteredTasks])

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")
    updateTask(taskId, { status })
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div
            key={status}
            className={`rounded-lg p-4 ${config.color} min-h-[500px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status as TaskStatus)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{config.label}</h3>
              <Badge variant="secondary">{tasksByStatus[status as TaskStatus].length}</Badge>
            </div>
            <div className="space-y-3">
              {tasksByStatus[status as TaskStatus].map((task) => (
                <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)} className="cursor-move">
                  <TaskCard task={task} compact />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
