"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTask } from "@/components/providers/task-provider"
import { TaskCard } from "@/components/tasks/task-card"

export function DashboardRecentTasks() {
  const { state } = useTask()

  const recentTasks = state.tasks
    .filter((task) => task.status !== "archived")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No tasks yet. Create your first task to get started!
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} compact />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
