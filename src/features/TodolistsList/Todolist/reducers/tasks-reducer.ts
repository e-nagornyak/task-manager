import { AddTodolistACType, RemoveTodolistACType, SetTodolistsACType } from './todolists-reducer'
import { todolistsAPI } from 'api/todolistsAPI'
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from 'api/types'
import { setAppStatusAC } from 'app/reducer/app-reducer'
import { AppRootStateType, AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'

export type TaskStateType = {
  [key: string]: TaskType[]
}

export type UpdateTaskModelDomainType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type SetTaskAC = ReturnType<typeof setTaskAC>

type TasksReducerActionsType =
  | RemoveTaskACType
  | AddTaskACType
  | UpdateTaskACType
  | AddTodolistACType
  | RemoveTodolistACType
  | SetTodolistsACType
  | SetTaskAC

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksReducerActionsType): TaskStateType => {
  switch (action.type) {
    case 'SET-TASK': {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
      }
    case 'ADD-TASK': {
      const { task } = action.payload
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] }
    }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t
        )
      }
    case 'SET-TODOLISTS': {
      const copyState = { ...state }
      action.payload.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case 'ADD-TODOLIST':
      return { ...state, [action.payload.todolist.id]: [] }
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.payload.todolistId]
      return copyState
    }
    default:
      return state
  }
}

// Actions creators
export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const)
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', payload: { task } } as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelDomainType) =>
  ({ type: 'UPDATE-TASK', payload: { todolistId, taskId, model } } as const)
export const setTaskAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: 'SET-TASK', payload: { todolistId, tasks } } as const)

// Thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId).then(res => {
      dispatch(setTaskAC(todolistId, res.data.items))
      dispatch(setAppStatusAC('succeeded'))
    })
  }

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI
      .removeTask(todolistId, taskId)
      .then(() => {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI
      .addTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateTaskModelDomainType): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      console.warn('Task now found in the state')
      return
    }
    const ApiModel: UpdateTaskType = {
      title: task.title,
      status: task.status,
      startDate: task.startDate,
      deadline: task.deadline,
      priority: task.priority,
      description: task.description,
      ...model
    }

    todolistsAPI
      .updateTask(todolistId, taskId, ApiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistId, taskId, model))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
