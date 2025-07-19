"use client"

import { Calendar } from "@/components/ui/calendar"
import { useTask } from "@/components/providers/task-provider"
import { TaskCard } from "@/components/tasks/task-card"
import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CalendarContent() {
  const { state } = useTask()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const tasksWithDates = useMemo(() => {
    return state.tasks.filter((task) => task.dueDate)
  }, [state.tasks])

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return []

    const dateStr = selectedDate.toISOString().split("T")[0]
    return tasksWithDates.filter(
      (task) =>
        task.dueDate === dateStr &&
        (!state.filter.status || task.status === state.filter.status) &&
        (!state.filter.priority || task.priority === state.filter.priority) &&
        (!state.filter.search || task.title.toLowerCase().includes(state.filter.search.toLowerCase())),
    )
  }, [selectedDate, tasksWithDates, state.filter])

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return tasksWithDates.filter((task) => task.dueDate === dateStr)
  }

  const getTaskCountColor = (count: number) => {
    if (count === 0) return ""
    if (count === 1) return "bg-blue-100 dark:bg-blue-900/30"
    if (count === 2) return "bg-blue-200 dark:bg-blue-800/50"
    if (count === 3) return "bg-blue-300 dark:bg-blue-700/70"
    if (count >= 4) return "bg-blue-400 dark:bg-blue-600/90"
    return ""
  }

  const getUrgentTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return tasksWithDates.filter((task) => task.dueDate === dateStr && task.priority === "urgent").length
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Full Width Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Task Calendar</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded border"></div>
                  <span>1 task</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 dark:bg-blue-800/50 rounded border"></div>
                  <span>2 tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-300 dark:bg-blue-700/70 rounded border"></div>
                  <span>3 tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 dark:bg-blue-600/90 rounded border"></div>
                  <span>4+ tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500/20 border-2 border-red-500 rounded"></div>
                  <span>Urgent</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              classNames={{
                months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex-1",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] h-14",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md flex-1 h-24",
                day: "h-full w-full p-0 font-normal flex flex-col items-center justify-start pt-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                day_range_end: "day-range-end",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground font-semibold",
                day_outside:
                  "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              components={{
                DayContent: ({ date }) => {
                  const tasksForDate = getTasksForDate(date)
                  const urgentTasks = getUrgentTasksForDate(date)
                  const taskCount = tasksForDate.length
                  const colorClass = getTaskCountColor(taskCount)

                  return (
                    <div
                      className={`relative w-full h-full flex flex-col items-center justify-start pt-1 rounded-md ${colorClass} ${urgentTasks > 0 ? "ring-2 ring-red-500 ring-opacity-50" : ""}`}
                    >
                      <span className="text-sm font-medium">{date.getDate()}</span>
                      {taskCount > 0 && (
                        <div className="flex flex-col items-center gap-1 mt-1">
                          <Badge
                            variant={urgentTasks > 0 ? "destructive" : "secondary"}
                            className="h-5 w-5 p-0 text-xs flex items-center justify-center"
                          >
                            {taskCount}
                          </Badge>
                          {urgentTasks > 0 && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                        </div>
                      )}
                    </div>
                  )
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Tasks for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tasks for {selectedDate?.toLocaleDateString()}</span>
              {tasksForSelectedDate.length > 0 && (
                <Badge variant="secondary">{tasksForSelectedDate.length} tasks</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksForSelectedDate.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <div className="text-lg font-medium mb-2">No tasks scheduled</div>
                <div className="text-sm">Select a date with tasks or create a new task for this date</div>
              </div>
            ) : (
              <div className="space-y-3">
                {tasksForSelectedDate
                  .sort((a, b) => {
                    // Sort by priority first
                    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
                    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
                    if (priorityDiff !== 0) return priorityDiff

                    // Then by time if available
                    if (a.dueTime && b.dueTime) {
                      return a.dueTime.localeCompare(b.dueTime)
                    }
                    if (a.dueTime) return -1
                    if (b.dueTime) return 1

                    return 0
                  })
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
