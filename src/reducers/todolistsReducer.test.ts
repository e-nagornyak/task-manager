import {v1} from 'uuid';
import {TodolistsType} from '../App';
import {addTodolistAC, todolistsReducer, changeTodolistTitleAC} from './todolistsReducer';
let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
]
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})
test('correct todolist should be added', () => {

    let newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(newTitle)
    expect(endState[2].filter).toBe('all')
})
test('correct todolist title', () => {
    let newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle))
    expect(endState[1].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
})