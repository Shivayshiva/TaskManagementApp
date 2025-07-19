"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTask } from "@/contexts/task-context"
import { Menu, Search, Plus } from "lucide-react"
import { useState } from "react"
import { TaskDialog } from "@/components/task-dialog"

interface MobileNavProps {
  onMenuClick: () => void
}

export function MobileNav({ onMenuClick }: MobileNavProps) {
  const { state, setFilter } = useTask()
  const [showTaskDialog, setShowTaskDialog] = useState(false)

  return (
    <div className="flex items-center gap-4 border-b bg-background p-4 lg:hidden">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={state.filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className="pl-9"
        />
      </div>

      <Button size="icon" onClick={() => setShowTaskDialog(true)}>
        <Plus className="h-4 w-4" />
      </Button>

      <TaskDialog open={showTaskDialog} onOpenChange={setShowTaskDialog} />
    </div>
  )
}
