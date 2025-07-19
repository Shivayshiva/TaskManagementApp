"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export type TaskStatus = "todo" | "in-progress" | "completed" | "archived"
export type TaskPriority = "low" | "medium" | "high" | "urgent"
export type TaskType = "one-time" | "recurring" | "habit" | "goal" | "sub-task"

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  type: TaskType
  dueDate?: string
  dueTime?: string
  tags: string[]
  subtasks: Subtask[]
  parentId?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface Subtask {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  filter: {
    status?: TaskStatus
    priority?: TaskPriority
    type?: TaskType
    search: string
  }
  view: "list" | "kanban" | "calendar"
}

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_FILTER"; payload: Partial<TaskState["filter"]> }
  | { type: "SET_VIEW"; payload: TaskState["view"] }
  | { type: "LOAD_TASKS"; payload: Task[] }

const initialState: TaskState = {
  tasks: [],
  filter: {
    search: "",
  },
  view: "list",
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : task,
        ),
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    case "SET_FILTER":
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      }
    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
      }
    case "LOAD_TASKS":
      return {
        ...state,
        tasks: action.payload,
      }
    default:
      return state
  }
}

const TaskContext = createContext<{
  state: TaskState
  dispatch: React.Dispatch<TaskAction>
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setFilter: (filter: Partial<TaskState["filter"]>) => void
  setView: (view: TaskState["view"]) => void
} | null>(null)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      try {
        const tasks = JSON.parse(savedTasks)
        dispatch({ type: "LOAD_TASKS", payload: tasks })
      } catch (error) {
        console.error("Failed to load tasks from localStorage:", error)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks))
  }, [state.tasks])

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const task: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: "ADD_TASK", payload: task })
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, updates } })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id })
  }

  const setFilter = (filter: Partial<TaskState["filter"]>) => {
    dispatch({ type: "SET_FILTER", payload: filter })
  }

  const setView = (view: TaskState["view"]) => {
    dispatch({ type: "SET_VIEW", payload: view })
  }

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        addTask,
        updateTask,
        deleteTask,
        setFilter,
        setView,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
