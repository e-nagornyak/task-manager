import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC
} from "features/todolistsList/todolist/reducer/thunks"
import { v1 } from "uuid"
import { setTodolistStatus, TodolistDomainType, todolistsReducer } from "./todolists-reducer"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle"
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle"
    }
  ]
})
test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({ todolistId: todolistId1 }, "", todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const endState = todolistsReducer(startState, addTodolistTC.fulfilled({
    todolist: {
      id: "",
      addedDate: "",
      order: 1,
      title: "New todolist"
    }
  }, "", ""))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("New todolist")
  expect(endState[0].filter).toBe("all")
})

test("correct todolist title", () => {
  const todolist = { todolistId: todolistId2, title: "New todolist" }

  const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled(todolist, "", todolist))

  expect(endState[1].title).toBe("New todolist")
  expect(endState[0].filter).toBe("all")
})

test("todolists should be set to the state", () => {
  const action = fetchTodolistsTC.fulfilled({ todolists: startState }, "")
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})

test("todolist status should be changed", () => {
  const action = setTodolistStatus({ todolistId: todolistId1, status: "loading" })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].entityStatus).toBe("loading")
  expect(endState[1].entityStatus).toBe("idle")
})
