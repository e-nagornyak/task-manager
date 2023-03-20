import { TaskPriorities, TaskStatuses, TaskType } from "api/types"

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