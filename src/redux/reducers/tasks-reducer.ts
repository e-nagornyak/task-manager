import {TasksType} from "../../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";

type actionsType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType
const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: actionsType): TasksType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            delete state[action.payload.todolistId]
            return state
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask: TaskType = {
                todoListId: action.payload.todolistId,
                id: v1(),
                title: action.payload.title,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: ''
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, status: action.payload.status}
                    : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        case "SET-TODOLISTS":
            const copyState = {...state}

            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, status}} as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, newTitle}} as const
}


