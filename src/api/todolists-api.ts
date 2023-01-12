import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "b5d66a17-e300-438a-836a-f262d6d4bfa6"
    }
})

export const todolistsApi = {
    getTodolists() {
        return instance.get('/todo-lists')
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    }
}