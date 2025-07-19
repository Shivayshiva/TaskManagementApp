"use client"

import { Input } from "@/components/ui/input"
import { useTask } from "@/components/providers/task-provider"
import { Search } from "lucide-react"

export function DashboardHeader() {
  const { state, setFilter } = useTask()

  return (
    <div className="hidden lg:block border-b bg-background p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your task overview.</p>
        </div>
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
    </div>
  )
}
