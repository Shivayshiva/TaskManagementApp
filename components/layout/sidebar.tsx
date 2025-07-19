"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarHeader } from "@/components/layout/sidebar-header"
import { SidebarViews } from "@/components/layout/sidebar-views"
import { SidebarFilters } from "@/components/layout/sidebar-filters"
import { SidebarActions } from "@/components/layout/sidebar-actions"
import { TaskDialog } from "@/components/tasks/task-dialog"
import { Plus } from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [showTaskDialog, setShowTaskDialog] = useState(false)

  return (
    <div className="flex h-full flex-col bg-muted/30 border-r">
      <SidebarHeader onClose={onClose} />

      <div className="px-4 pb-4">
        <Button className="w-full" onClick={() => setShowTaskDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-4">
        <SidebarViews />
        <Separator className="mb-4" />
        <SidebarFilters />
      </div>

      <SidebarActions />

      <TaskDialog open={showTaskDialog} onOpenChange={setShowTaskDialog} />
    </div>
  )
}
