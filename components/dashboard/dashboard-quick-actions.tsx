"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "@/components/tasks/task-dialog"
import { Plus, Calendar, Kanban, List } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardQuickActions() {
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const router = useRouter()

  const actions = [
    {
      title: "Create Task",
      description: "Add a new task",
      icon: Plus,
      action: () => setShowTaskDialog(true),
    },
    {
      title: "View Calendar",
      description: "See tasks by date",
      icon: Calendar,
      action: () => router.push("/calendar"),
    },
    {
      title: "Kanban Board",
      description: "Manage task workflow",
      icon: Kanban,
      action: () => router.push("/kanban"),
    },
    {
      title: "Task List",
      description: "View all tasks",
      icon: List,
      action: () => router.push("/tasks"),
    },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                  onClick={action.action}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <TaskDialog open={showTaskDialog} onOpenChange={setShowTaskDialog} />
    </>
  )
}
