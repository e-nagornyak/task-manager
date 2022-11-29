import {TasksType} from "../App";
import {removeTaskAC, tasksReducer} from "./tasksReducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: "HTML&CSS", isDone: true},
        ],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "HTML&CSS", isDone: true},
        ],
    }
    const action = removeTaskAC("todolistId2", '2')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
})

