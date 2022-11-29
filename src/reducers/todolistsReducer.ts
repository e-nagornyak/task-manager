import {FilterValueType, TodolistsType} from "../App";

type actionType = addTodolistACType
    | removeTodolistACType
    | changeTodolistTitleACType
    | changeTaskFilterACType

export const todolistsReducer = (state: TodolistsType[], action: actionType): TodolistsType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [action.payload.newTodolist, ...state]
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
        default:
            return state
    }
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolist: TodolistsType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolist}
    } as const
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
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



