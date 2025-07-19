"use client"

import { TaskListHeader } from "@/components/tasks/task-list-header"
import { TaskList } from "@/components/tasks/task-list"

export function TaskListView() {
  return (
    <div className="flex flex-col h-full">
      <TaskListHeader />
      <div className="flex-1 overflow-auto">
        <TaskList />
      </div>
    </div>
  )
}
