"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type Task, useTask } from "@/contexts/task-context"
import { TaskDialog } from "@/components/task-dialog"
import { MoreHorizontal, Calendar, Clock, Tag, CheckSquare2, Edit, Trash2, Archive } from "lucide-react"

interface TaskCardProps {
  task: Task
  compact?: boolean
}

const priorityColors = {
  urgent: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
}

const statusColors = {
  todo: "bg-slate-500",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
  archived: "bg-gray-500",
}

export function TaskCard({ task, compact = false }: TaskCardProps) {
  const { updateTask, deleteTask } = useTask()
  const [showEditDialog, setShowEditDialog] = useState(false)

  const handleStatusChange = (completed: boolean) => {
    updateTask(task.id, {
      status: completed ? "completed" : "todo",
      completedAt: completed ? new Date().toISOString() : undefined,
    })
  }

  const handleArchive = () => {
    updateTask(task.id, { status: "archived" })
  }

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length
  const totalSubtasks = task.subtasks.length

  return (
    <>
      <Card className={`transition-all hover:shadow-md ${task.status === "completed" ? "opacity-75" : ""}`}>
        <CardContent className={`p-4 ${compact ? "p-3" : ""}`}>
          <div className="flex items-start gap-3">
            <Checkbox checked={task.status === "completed"} onCheckedChange={handleStatusChange} className="mt-1" />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""} ${compact ? "text-sm" : ""}`}
                >
                  {task.title}
                </h3>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleArchive}>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {task.description && !compact && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                {/* Priority */}
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
                  <span className="text-xs text-muted-foreground capitalize">{task.priority}</span>
                </div>

                {/* Status */}
                <Badge variant="secondary" className="text-xs">
                  {task.status.replace("-", " ")}
                </Badge>

                {/* Type */}
                <Badge variant="outline" className="text-xs">
                  {task.type.replace("-", " ")}
                </Badge>

                {/* Due Date */}
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(task.dueDate).toLocaleDateString()}
                    {task.dueTime && (
                      <>
                        <Clock className="h-3 w-3 ml-1" />
                        {task.dueTime}
                      </>
                    )}
                  </div>
                )}

                {/* Subtasks Progress */}
                {totalSubtasks > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckSquare2 className="h-3 w-3" />
                    {completedSubtasks}/{totalSubtasks}
                  </div>
                )}

                {/* Tags */}
                {task.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <div className="flex gap-1">
                      {task.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {task.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{task.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDialog open={showEditDialog} onOpenChange={setShowEditDialog} task={task} />
    </>
  )
}
