"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SidebarHeaderProps {
  onClose?: () => void
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-lg font-semibold">TaskFlow</h2>
      {onClose && (
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
