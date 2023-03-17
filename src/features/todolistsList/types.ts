import { TaskPriorities, TaskStatuses, TaskType } from "api/types"
import { AppStatusType } from "app/reducer/app-reducer"

// todolist
export type TodolistDomainType = TodolistType & { filter: FilterValueType; entityStatus: AppStatusType }
export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

// task
export type TaskStateType = {
  [key: string]: TaskType[]
}

export type UpdateTaskModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
