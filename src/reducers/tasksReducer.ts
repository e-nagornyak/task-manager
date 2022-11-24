import {TasksType, TaskType} from "../App";
import {v1} from "uuid";

type actionType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTaskForNewTodolistAcType

export const tasksReducer = (state: TasksType, action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.isDone}
                    : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        }
        case "ADD-TASK-FOR-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAc>
export const changeTaskStatusAc = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, isDone}
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, newTitle}
    } as const
}

type addTaskForNewTodolistAcType = ReturnType<typeof addTaskForNewTodolistAC>
export const addTaskForNewTodolistAC = (todolistId: string) => {
    return {
        type: 'ADD-TASK-FOR-TODOLIST',
        payload: {todolistId}
    } as const
}
