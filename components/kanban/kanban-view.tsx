"use client"

import { KanbanHeader } from "@/components/kanban/kanban-header"
import { KanbanBoard } from "@/components/kanban/kanban-board"

export function KanbanView() {
  return (
    <div className="flex flex-col h-full">
      <KanbanHeader />
      <div className="flex-1 overflow-auto">
        <KanbanBoard />
      </div>
    </div>
  )
}
