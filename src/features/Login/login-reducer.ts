import {Dispatch} from 'redux'
import {setAppErrorACType, setAppStatusAC, setAppStatusACType} from '../../app/reducer/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', payload: {value}} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                debugger
                setIsLoggedInAC(true)
                dispatch(setAppStatusAC('succeeded'))
            } else{
                handleServerAppError(res.data, dispatch)
            }
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | setAppErrorACType | setAppStatusACType
