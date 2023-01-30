import axios from "axios";
import {TodolistType} from "../features/TodolistsList/Todolist/reducers/todolists-reducer";

// Task types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

// Response types
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

// Instance
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "b5d66a17-e300-438a-836a-f262d6d4bfa6"
    }
})


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

// authAPI
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
    }
}

// todolistsAPI
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}