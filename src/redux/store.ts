import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistsReducer} from "./reducers/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

// об'єднуємо наші reducers в один загальний
// так ми задаємо структуру нашого загального об'єкту-стану
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// створюємо store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
// автоматично оприділяє тип стору
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// для того, щоб в консолі браузери можна було звернутися до store
// @ts-ignore
window.store = store;

// будова store
// store = {
//     state: {
//         tasks: {},
//         todolists: []
//     }
//     getState
//     dispatch
//     subcribe
// }