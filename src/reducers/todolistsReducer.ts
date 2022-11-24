import {TodolistsType} from "../App";

type actionType = addTodolistACType

export const todolistsReducer = (state: TodolistsType[], action: actionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return
        }

        default:
            return state
    }
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}
