import {
  addTodolist, setTodolistStatus, changeTodolistTitle,
  removeTodolist,
  setTodolists,
  TodolistDomainType,
  todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle'
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle'
    }
  ]
})
test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolist({ todolistId: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const endState = todolistsReducer(startState, addTodolist({
    todolist: {
      id: '',
      addedDate: '',
      order: 1,
      title: 'New Todolist'
    }
  }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('New Todolist')
  expect(endState[0].filter).toBe('all')
})

test('correct todolist title', () => {
  let newTitle = 'New Todolist'
  const endState = todolistsReducer(startState, changeTodolistTitle({
    todolistId: todolistId2,
    title: newTitle
  }))

  expect(endState[1].title).toBe(newTitle)
  expect(endState[0].filter).toBe('all')
})

test('todolists should be set to the state', () => {
  const action = setTodolists({ todolists: startState })
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})

test('todolist status should be changed', () => {
  const action = setTodolistStatus({ todolistId: todolistId1, status: 'loading' })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('loading')
  expect(endState[1].entityStatus).toBe('idle')
})
