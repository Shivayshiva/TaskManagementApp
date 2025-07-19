"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTask } from "@/components/providers/task-provider"
import { CheckSquare, Clock, AlertCircle } from "lucide-react"

export function DashboardStats() {
  const { state } = useTask()

  const stats = [
    {
      title: "Total Tasks",
      value: state.tasks.length,
      icon: CheckSquare,
      color: "text-blue-600",
    },
    {
      title: "In Progress",
      value: state.tasks.filter((t) => t.status === "in-progress").length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: state.tasks.filter((t) => t.status === "completed").length,
      icon: CheckSquare,
      color: "text-green-600",
    },
    {
      title: "Urgent",
      value: state.tasks.filter((t) => t.priority === "urgent").length,
      icon: AlertCircle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
