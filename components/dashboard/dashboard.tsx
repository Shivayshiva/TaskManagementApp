"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardRecentTasks } from "@/components/dashboard/dashboard-recent-tasks"
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions"

export function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <DashboardStats />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardRecentTasks />
            <DashboardQuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
