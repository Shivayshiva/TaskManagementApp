"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Task, TaskFilter, ViewType } from "@/types/task"

interface TaskState {
  tasks: Task[]
  filter: TaskFilter
  view: ViewType
}

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_FILTER"; payload: Partial<TaskFilter> }
  | { type: "SET_VIEW"; payload: ViewType }
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
  setFilter: (filter: Partial<TaskFilter>) => void
  setView: (view: ViewType) => void
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

  const setFilter = (filter: Partial<TaskFilter>) => {
    dispatch({ type: "SET_FILTER", payload: filter })
  }

  const setView = (view: ViewType) => {
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
