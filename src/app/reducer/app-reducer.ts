// state type
import {AppThunk} from "../store";
import {authAPI} from "../../api/todolists-api";
import {setIsLoggedInAC} from "../../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState

// actions types
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export type AppReducerActionsType = setAppErrorACType | setAppStatusACType | setAppInitializedACType
// state
const initialState = {
    // чи відбувається зараз взаємодія з сервером
    status: 'idle' as RequestStatusType,
    // глобальні помилки
    error: null as null | string,
    // true коли відбулась ініціалізація (перевірка користувача)
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        case "APP/SET-IT-INITIALIZED":
            return {...state, isInitialized: action.payload.value}
        default:
            return {...state}
    }
}
// actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', payload: {error}}) as const
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}}) as const
export const setAppInitializedAC = (value: boolean) =>
    ({type: 'APP/SET-IT-INITIALIZED', payload: {value}}) as const

// thunks
export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {

            }
            dispatch(setAppInitializedAC(true))
        })
}