"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function HomePage() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  )
}
