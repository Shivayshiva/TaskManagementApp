"use client"

import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarContent } from "@/components/calendar/calendar-content"

export function CalendarView() {
  return (
    <div className="flex flex-col h-full">
      <CalendarHeader />
      <div className="flex-1 overflow-auto">
        <CalendarContent />
      </div>
    </div>
  )
}
