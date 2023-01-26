// State type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// export type InitialStateType = {
//     // Щоб показати взаємодію з сервером
//     status: RequestStatusType
//     // Якщо глобальна помилка - запишемо її текст сюди
//     error: string | null
// }

// AC types
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>

export type AppReducerActionsType = setAppErrorACType | setAppStatusACType

// const initialState: InitialStateType = {
//     status: "idle",
//     error: null
// }

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}
export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        default:
            return {...state}
    }
}
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', payload: {error}}) as const
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}}) as const