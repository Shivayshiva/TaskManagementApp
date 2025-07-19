"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTask } from "@/components/providers/task-provider"
import { CheckSquare, Clock, Archive, Filter } from "lucide-react"

export function SidebarFilters() {
  const { state, setFilter } = useTask()

  const statusCounts = {
    todo: state.tasks.filter((t) => t.status === "todo").length,
    "in-progress": state.tasks.filter((t) => t.status === "in-progress").length,
    completed: state.tasks.filter((t) => t.status === "completed").length,
    archived: state.tasks.filter((t) => t.status === "archived").length,
  }

  const priorityCounts = {
    urgent: state.tasks.filter((t) => t.priority === "urgent").length,
    high: state.tasks.filter((t) => t.priority === "high").length,
    medium: state.tasks.filter((t) => t.priority === "medium").length,
    low: state.tasks.filter((t) => t.priority === "low").length,
  }

  return (
    <>
      {/* Status Filters */}
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Status</h3>
        <div className="space-y-1">
          <Button
            variant={!state.filter.status ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ status: undefined })}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              All Tasks
            </span>
            <Badge variant="secondary">{state.tasks.length}</Badge>
          </Button>
          <Button
            variant={state.filter.status === "todo" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ status: "todo" })}
          >
            <span className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              To Do
            </span>
            <Badge variant="secondary">{statusCounts.todo}</Badge>
          </Button>
          <Button
            variant={state.filter.status === "in-progress" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ status: "in-progress" })}
          >
            <span className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              In Progress
            </span>
            <Badge variant="secondary">{statusCounts["in-progress"]}</Badge>
          </Button>
          <Button
            variant={state.filter.status === "completed" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ status: "completed" })}
          >
            <span className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              Completed
            </span>
            <Badge variant="secondary">{statusCounts.completed}</Badge>
          </Button>
          <Button
            variant={state.filter.status === "archived" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ status: "archived" })}
          >
            <span className="flex items-center">
              <Archive className="mr-2 h-4 w-4" />
              Archived
            </span>
            <Badge variant="secondary">{statusCounts.archived}</Badge>
          </Button>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Priority Filters */}
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Priority</h3>
        <div className="space-y-1">
          <Button
            variant={state.filter.priority === "urgent" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ priority: state.filter.priority === "urgent" ? undefined : "urgent" })}
          >
            <span className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
              Urgent
            </span>
            <Badge variant="secondary">{priorityCounts.urgent}</Badge>
          </Button>
          <Button
            variant={state.filter.priority === "high" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ priority: state.filter.priority === "high" ? undefined : "high" })}
          >
            <span className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-orange-500" />
              High
            </span>
            <Badge variant="secondary">{priorityCounts.high}</Badge>
          </Button>
          <Button
            variant={state.filter.priority === "medium" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ priority: state.filter.priority === "medium" ? undefined : "medium" })}
          >
            <span className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
              Medium
            </span>
            <Badge variant="secondary">{priorityCounts.medium}</Badge>
          </Button>
          <Button
            variant={state.filter.priority === "low" ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => setFilter({ priority: state.filter.priority === "low" ? undefined : "low" })}
          >
            <span className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
              Low
            </span>
            <Badge variant="secondary">{priorityCounts.low}</Badge>
          </Button>
        </div>
      </div>
    </>
  )
}
