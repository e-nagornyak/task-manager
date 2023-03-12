import { addTodolist, removeTodolist, setTodolists } from './todolists-reducer'
import { TaskPriorities, TaskStatuses } from 'api/types'
import {
  addTask,
  removeTask, setTasks, tasksReducer, TaskStateType, updateTask
} from 'features/TodolistsList/Todolist/reducers/tasks-reducer'

let startState: TaskStateType = {}
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'HTML&CSS2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId1'
      },
      {
        id: '2',
        title: 'JS2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId1'
      },
      {
        id: '3',
        title: 'ReactJS2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId1'
      },
      {
        id: '4',
        title: 'Rest API2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId1'
      },
      {
        id: '5',
        title: 'GraphQL2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId1'
      }
    ],
    todolistId2: [
      {
        id: '1',
        title: 'HTML&CSS2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId2'
      },
      {
        id: '2',
        title: 'JS2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId2'
      },
      {
        id: '3',
        title: 'ReactJS2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId2'
      },
      {
        id: '4',
        title: 'Rest API2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId2'
      },
      {
        id: '5',
        title: 'GraphQL2',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        order: 1,
        deadline: '',
        description: '',
        todoListId: 'todolistId2'
      }
    ]
  }
})

test('Should be tasks deleted', () => {
  const endState = tasksReducer(startState, removeTask({
    todolistId: 'todolistId2',
    taskId: '1'
  }))

  expect(endState.todolistId2.length).toBe(4)
})

test('Should be tasks added', () => {
  const endState = tasksReducer(
    startState,
    addTask({
      task: {
        todoListId: 'todolistId2',
        description: 'It`s test',
        title: 'Test',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id: 'dadasdasdaadad',
        order: 0,
        addedDate: ''
      }
    })
  )

  expect(endState.todolistId2.length).toBe(6)
  expect(endState.todolistId1.length).toBe(5)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe('Test')
  expect(endState.todolistId2[0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = updateTask({
    todolistId: 'todolistId2',
    taskId: '2',
    model: { status: TaskStatuses.Completed }
  })
  const endState = tasksReducer(startState, action)

  expect(endState.todolistId2[1].status).toBe(TaskStatuses.Completed)
  expect(endState.todolistId1[1].status).toBe(TaskStatuses.New)
})

test('should be updated new title of task', () => {
  const action = updateTask({
    todolistId: 'todolistId2',
    taskId: '2',
    model: { title: 'New title' }
  })
  const endState = tasksReducer(startState, action)

  expect(endState.todolistId2[1].title).toBe('New title')
  expect(endState.todolistId2.length).toBe(5)
})

test('new array should be added when new todolist is added', () => {
  const action = addTodolist({
    todolist: {
      id: 'newTodolistId',
      title: 'new todolist',
      order: 0,
      addedDate: ''
    }
  })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual(endState[newKey])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolist({ todolistId: 'todolistId2' })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState.todolistId2).toBeUndefined()
})

test('empty arrays should be added when we set todolists', () => {
  const action = setTodolists({
    todolists: [
      { id: '1', title: 'Title 1', order: 0, addedDate: '' },
      { id: '2', title: 'Title 2', order: 0, addedDate: '' }
    ]
  })

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist ', () => {
  const action = setTasks({ todolistId: 'todolistId1', tasks: startState.todolistId1 })

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: []
    },
    action
  )

  expect(endState.todolistId1.length).toBe(5)
  expect(endState.todolistId2.length).toBe(0)
})
