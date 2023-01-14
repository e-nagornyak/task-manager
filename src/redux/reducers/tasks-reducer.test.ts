import {addTaskAC, removeTaskAC, setTaskAC, tasksReducer, TaskStateType} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";


let startState: TaskStateType = {};
beforeEach(() => {
    startState = {
        'todolistID1': [
            {
                id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: 'todolistID1'
            },
            {
                id: '2', title: 'JS2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID1"
            },
            {
                id: '3', title: 'ReactJS2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID1"
            },
            {
                id: '4', title: 'Rest API2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID1"
            },
            {
                id: '5', title: 'GraphQL2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID1"
            },
        ],
        'todolistID2': [
            {
                id: '1', title: 'HTML&CSS2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: 'todolistID2'
            },
            {
                id: '2', title: 'JS2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID2"
            },
            {
                id: '3', title: 'ReactJS2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID2"
            },
            {
                id: '4', title: 'Rest API2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID2"
            },
            {
                id: '5', title: 'GraphQL2', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '',
                addedDate: '', order: 1, deadline: '', description: '', todoListId: "todolistID2"
            },
        ]
    }
})
test('Should be tasks deleted', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistID2', '1'))

    expect(endState['todolistID2'].length).toBe(4)
})
test('Should be tasks added', () => {
    let newTitle = 'What new?'
    const endState = tasksReducer(startState, addTaskAC('todolistID2', newTitle))

    expect(endState['todolistID2'].length).toBe(6)
    expect(endState['todolistID1'].length).toBe(5)
    expect(endState['todolistID2'][0].title).toBe('What new?')
})
//
// test('status of specified task should be changed', () => {
//     const action = changeTaskStatusAC('todolistId2', '2', false)
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].isDone).toBe(false)
//     expect(endState['todolistId1'][1].isDone).toBe(true)
// })
//
//
// test('should be updated new title of task', () => {
//     const action = changeTaskTitleAC('todolistId2', '2', 'New title')
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].title).toBe('New title')
//     expect(endState['todolistId2'].length).toBe(3)
// })
//
// test('new array should be added when new todolist is added', () => {
//     const action = addTodolistAC('new todolist')
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual(endState[newKey])
// })
//
// test('ids should be equals', () => {
//     const startTasksState: TasksType = {}
//     const startTodolistsState: Array<TodolistsType> = []
//
//     const action = addTodolistAC('new todolist')
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.payload.todolistId)
//     expect(idFromTodolists).toBe(action.payload.todolistId)
// })
//
//
// test('property with todolistId should be deleted', () => {
//     const action = removeTodolistAC('todolistId2')
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).toBeUndefined()
// })
//
//
//

// test('empty arrays should be added when we set todolists', () => {
//     const action = setTodolistsAC([
//         {id: '1', title: 'Title 1', order: 0, addedDate: ''},
//         {id: '2', title: 'Title 2', order: 0, addedDate: ''}
//     ])
//
//     const endState = tasksReducer({}, action)
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(2)
//     expect(endState['1']).toStrictEqual([])
//     expect(endState['2']).toStrictEqual([])
// })

test('tasks should be added for todolist ', () => {
    const action = setTaskAC('todolistID1', startState['todolistID1'],)

    const endState = tasksReducer({
        'todolistID2': [],
        'todolistID1': [],
    }, action)

    const keys = Object.keys(endState)

    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'].length).toBe(0)
})