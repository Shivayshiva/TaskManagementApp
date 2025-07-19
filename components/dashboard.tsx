"use client"

import { useTask } from "@/contexts/task-context"
import { TaskList } from "@/components/task-list"
import { KanbanBoard } from "@/components/kanban-board"
import { CalendarView } from "@/components/calendar-view"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Dashboard() {
  const { state, setFilter } = useTask()

  return (
    <div className="flex flex-col h-full">
      {/* Desktop Search */}
      <div className="hidden lg:block border-b bg-background p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={state.filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className="pl-9"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {state.view === "list" && <TaskList />}
        {state.view === "kanban" && <KanbanBoard />}
        {state.view === "calendar" && <CalendarView />}
      </div>
    </div>
  )
}
