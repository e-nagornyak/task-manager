import {todolistsAPI} from "../../../../api/todolists-api";
import {AppThunk} from "../../../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../../../app/reducer/app-reducer";
import {handleServerNetworkError} from "../../../../utils/error-utils";

// State type
export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType }

// Other types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// AC types
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTaskFilterACType = ReturnType<typeof changeTaskFilterAC>
type setTodolistStatusACType = ReturnType<typeof setTodolistStatusAC>

type TodolistReducerActionsType =
    | AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTaskFilterACType
    | SetTodolistsACType
    | setTodolistStatusACType

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todolistId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TASK-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "SET-TODOLIST-STATUS":
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.status
            } : tl)
        default:
            return state
    }
}

// Actions creators
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', payload: {todolist}}) as const
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {todolistId}}) as const
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}}) as const
export const changeTaskFilterAC = (todolistId: string, filter: FilterValueType) =>
    ({type: 'CHANGE-TASK-FILTER', payload: {todolistId, filter}}) as const
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}}) as const
export const setTodolistStatusAC = (todolistId: string, status: RequestStatusType) =>
    ({type: 'SET-TODOLIST-STATUS', payload: {todolistId, status}}) as const

// Thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setTodolistStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setTodolistStatusAC(todolistId, 'succeeded'))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setTodolistStatusAC(todolistId, 'loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}
