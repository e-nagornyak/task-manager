import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistsReducer} from "../reducers/todolistsReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// window.store = store;

// store = {
//     state: {
//         tasks: {},
//         todolists: []
//     }
//     getState
//     dispatch
//     subcribe
// }