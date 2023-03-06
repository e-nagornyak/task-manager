import { todolistsAPI } from 'api/todolistsAPI'
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from 'api/types'
import { setAppStatus } from 'app/reducer/app-reducer'
import { AppRootStateType, AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: {
    setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    removeTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks.splice(index, 1)
    },
    updateTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskModelDomainType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks[index] = { ...tasks[index], ...action.payload.model }
    }
  },
  extraReducers: {
    [add]
  }
})

export const tasksReducer = slice.reducer
// export const tasksReducer = (state: TaskStateType = initialState, action: TasksReducerActionsType): TaskStateType => {
//   switch (action.type) {
//     case 'SET-TASK': {
//       return { ...state, [action.payload.todolistId]: action.payload.tasks }
//     }

//     case 'SET-TODOLISTS': {
//       const copyState = { ...state }
//       action.payload.todolists.forEach(tl => {
//         copyState[tl.id] = []
//       })
//       return copyState
//     }
//     case 'ADD-TODOLIST':
//       return { ...state, [action.payload.todolist.id]: [] }
//     case 'REMOVE-TODOLIST': {
//       const copyState = { ...state }
//       delete copyState[action.payload.todolistId]
//       return copyState
//     }
//     default:
//       return state
//   }
// }
const { setTasks, updateTask, addTask, removeTask } = slice.actions

export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await todolistsAPI.getTasks(todolistId)
    dispatch(setTasks({ todolistId, tasks: res.data.items }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await todolistsAPI.removeTask(todolistId, taskId)
    dispatch(removeTask({ todolistId, taskId }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await todolistsAPI.addTask(todolistId, title)
    if (res.data.resultCode === 0) {
      dispatch(addTask({ task: res.data.data.item }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelDomainType): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus({ status: 'loading' }))
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

    try {
      const res = await todolistsAPI.updateTask(todolistId, taskId, ApiModel)
      if (res.data.resultCode === 0) {
        dispatch(updateTask({ todolistId, taskId, model }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
    }
  }
