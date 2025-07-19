"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { List, Kanban, Calendar } from "lucide-react"

const views = [
  { id: "list", label: "List View", icon: List, path: "/tasks" },
  { id: "kanban", label: "Kanban Board", icon: Kanban, path: "/kanban" },
  { id: "calendar", label: "Calendar", icon: Calendar, path: "/calendar" },
]

export function SidebarViews() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">Views</h3>
      <div className="space-y-1">
        {views.map((view) => {
          const Icon = view.icon
          const isActive = pathname === view.path || (pathname === "/" && view.path === "/tasks")

          return (
            <Button
              key={view.id}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push(view.path)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {view.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
