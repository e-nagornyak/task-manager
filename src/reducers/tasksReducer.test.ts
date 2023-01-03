export const b = 0;
// import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, changeTaskTitleAC} from './tasksReducer';
// import {TasksType, TodolistType} from '../App';
// import {addTodolistAC, removeTodolistAC, todolistsReducer} from './todolistsReducer';
//
// let startState: TasksType =
//     {
//         'todolistID1': [
//             {id: '1', title: 'HTML&CSS2', isDone: true},
//             {id: '2', title: 'JS2', isDone: true},
//             {id: '3', title: 'ReactJS2', isDone: false},
//             {id: '4', title: 'Rest API2', isDone: false},
//             {id: '5', title: 'GraphQL2', isDone: false},
//         ],
//         'todolistID2': [
//             {id: '1', title: 'HTML&CSS2', isDone: true},
//             {id: '2', title: 'JS2', isDone: true},
//             {id: '3', title: 'ReactJS2', isDone: false},
//             {id: '4', title: 'Rest API2', isDone: false}
//         ]
//     }
// beforeEach(() => {
//     startState =
//         {
//             'todolistID1': [
//                 {id: '1', title: 'HTML&CSS2', isDone: true},
//                 {id: '2', title: 'JS2', isDone: true},
//                 {id: '3', title: 'ReactJS2', isDone: false},
//                 {id: '4', title: 'Rest API2', isDone: false},
//                 {id: '5', title: 'GraphQL2', isDone: false},
//             ],
//             'todolistID2': [
//                 {id: '1', title: 'HTML&CSS2', isDone: true},
//                 {id: '2', title: 'JS2', isDone: true},
//                 {id: '3', title: 'ReactJS2', isDone: false},
//                 {id: '4', title: 'Rest API2', isDone: false}
//             ]
//         }
// })
// test('Should be tasks deleted', () => {
//
//     const endState = tasksReducer(startState, removeTaskAC('todolistID2', '1'))
//     expect(endState['todolistID2'].length).toBe(3)
// })
// test('Should be tasks added', () => {
//
//     let newTitle = 'What new?'
//
//     const endState = tasksReducer(startState, addTaskAC('todolistID2', newTitle))
//     expect(endState['todolistID2'].length).toBe(5)
//     expect(endState['todolistID1'].length).toBe(5)
//     expect(endState['todolistID2'][0].title).toBe('What new?')
//     expect(endState['todolistID2'][0].isDone).toBe(false)
// })
//
// test('status of specified task should be changed', () => {
//
//
//     const action = changeTaskStatusAC('todolistId2', '2', false)
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].isDone).toBe(false)
//     expect(endState['todolistId1'][1].isDone).toBe(true)
//
// })
//
//
// test('should be updated new title of task', () => {
//
//
//     const action = changeTaskTitleAC('todolistId2', '2', 'New title')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].title).toBe('New title')
//     expect(endState['todolistId2'].length).toBe(3)
// })
//
// test('new array should be added when new todolist is added', () => {
//
//
//     const action = addTodolistAC('new todolist')
//
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
//
//     const action = removeTodolistAC('todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).toBeUndefined()
// })
//
//
//
