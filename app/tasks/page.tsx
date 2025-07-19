"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { TaskListView } from "@/components/tasks/task-list-view"

export default function TasksPage() {
  return (
    <AppLayout>
      <TaskListView />
    </AppLayout>
  )
}
