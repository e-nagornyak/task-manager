// State type
type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // Щоб показати взаємодію з сервером
    status: RequestStatusType
    // Якщо глобальна помилка - запишемо її текст сюди
    error: string | null
}

// AC types
type setErrorACType = ReturnType<typeof setErrorAC>
type setStatusACType = ReturnType<typeof setStatusAC>

type ActionsType = setErrorACType | setStatusACType

const initialState: InitialStateType = {
    status: "idle",
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        default:
            return {...state}
    }
}
export const setErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', payload: {error}}) as const
export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}}) as const