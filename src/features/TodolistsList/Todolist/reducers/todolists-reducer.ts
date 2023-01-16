import {todolistsApi} from "../../../../api/todolists-api";
import {AppThunk} from "../../../../app/store";
import {RequestStatusType, setStatusAC} from "../../../../app/reducers/app-reducer";

// State type
export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType}

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

type ActionsType =
    | AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTaskFilterACType
    | SetTodolistsACType

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.payload.todolist, filter: 'all', entityStatus:'idle'}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todolistId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        case "CHANGE-TASK-FILTER":
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
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

// Thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC("loading"))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC("succeeded"))
        })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC("loading"))
    todolistsApi.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC("succeeded"))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}
