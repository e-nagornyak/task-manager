import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

type actionType = addTodolistACType
    | removeTodolistACType
    | changeTodolistTitleACType
    | changeTaskFilterACType

const initialState: TodolistDomainType[] = [];

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType }

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: actionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [newTodolist, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todolistId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        case "CHANGE-TASK-FILTER":
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, title}
    } as const
}

type changeTaskFilterACType = ReturnType<typeof changeTaskFilterAC>
export const changeTaskFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TASK-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}



