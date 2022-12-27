import {AddTasksAC, ChangeTaskStatusAC, RemoveTasksAC, tasksReducer, UpdateTasksTitleAC} from './tasksReducer';
import {TasksType, TodolistType} from '../App';
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from './todolistsReducer';

let startState: TasksType =
    {
        'todolistID1': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false},
            {id: '5', title: 'GraphQL2', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},
            {id: '3', title: 'ReactJS2', isDone: false},
            {id: '4', title: 'Rest API2', isDone: false}
        ]
    }
beforeEach(() => {
    startState =
        {
            'todolistID1': [
                {id: '1', title: 'HTML&CSS2', isDone: true},
                {id: '2', title: 'JS2', isDone: true},
                {id: '3', title: 'ReactJS2', isDone: false},
                {id: '4', title: 'Rest API2', isDone: false},
                {id: '5', title: 'GraphQL2', isDone: false},
            ],
            'todolistID2': [
                {id: '1', title: 'HTML&CSS2', isDone: true},
                {id: '2', title: 'JS2', isDone: true},
                {id: '3', title: 'ReactJS2', isDone: false},
                {id: '4', title: 'Rest API2', isDone: false}
            ]
        }
})
test('Should be tasks deleted', () => {

    const endState = tasksReducer(startState, RemoveTasksAC('todolistID2', '1'))
    expect(endState['todolistID2'].length).toBe(3)
})
test('Should be tasks added', () => {

    let newTitle = 'What new?'

    const endState = tasksReducer(startState, AddTasksAC('todolistID2', newTitle))
    expect(endState['todolistID2'].length).toBe(6)
    expect(endState['todolistID1'].length).toBe(5)
    expect(endState['todolistID2'][0].title).toBe('What new?')
    expect(endState['todolistID2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {


    const action = ChangeTaskStatusAC('todolistId2', '2', false)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)

})


test('should be updated new title of task', () => {


    const action = UpdateTasksTitleAC('todolistId2', '2', 'New title')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('New title')
    expect(endState['todolistId2'].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {


    const action = AddTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual(endState[newKey])
})

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})


test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})



