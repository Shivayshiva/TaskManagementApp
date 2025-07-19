"use client"

import { Calendar } from "@/components/ui/calendar"
import { useTask } from "@/contexts/task-context"
import { TaskCard } from "@/components/task-card"
import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"

export function CalendarView() {
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

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            components={{
              DayContent: ({ date }) => {
                const tasksForDate = getTasksForDate(date)
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {tasksForDate.length > 0 && (
                      <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                        {tasksForDate.length}
                      </Badge>
                    )}
                  </div>
                )
              },
            }}
          />
        </div>

        {/* Tasks for Selected Date */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tasks for {selectedDate?.toLocaleDateString()}</h2>
          {tasksForSelectedDate.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No tasks scheduled for this date</div>
          ) : (
            <div className="space-y-3">
              {tasksForSelectedDate.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
