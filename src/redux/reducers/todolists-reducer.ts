import {v1} from "uuid";
import {todolistsApi} from "../../api/todolists-api";
import {AppThunk} from "../store";


export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTaskFilterACType = ReturnType<typeof changeTaskFilterAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTaskFilterACType
    | SetTodolistsACType

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
const initialState: TodolistDomainType[] = [];
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType }

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TASK-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

// AC
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', payload: {todolist}} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}} as const
}
export const changeTaskFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TASK-FILTER', payload: {todolistId, filter}} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', payload: {todolists}} as const
}

// TC
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {

        })
}
