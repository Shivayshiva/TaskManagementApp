"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { KanbanView } from "@/components/kanban/kanban-view"

export default function KanbanPage() {
  return (
    <AppLayout>
      <KanbanView />
    </AppLayout>
  )
}
