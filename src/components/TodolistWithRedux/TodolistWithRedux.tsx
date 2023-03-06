export const TodolistWithRedux = {};
// import React, {ChangeEvent} from 'react';
// import {Button, Checkbox, IconButton} from "@mui/material";
// import {EditableSpan} from "../EditableSpan/EditableSpan";
// import {AddItemForm} from "../AddItemForm/AddItemForm";
// import BackspaceIcon from "@mui/icons-material/Backspace";
// import {
//     addTask,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTask
// } from "../../redux/reducers/tasks-reducer";
// import {
//     changeTaskFilter, changeTodolistTitle, FilterValueType,
//     removeTodolist, TodolistDomainType
// } from "../../redux/reducers/todolists-reducer";
// import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
// import {TaskStatuses, TaskType} from "../../api/todolists-api";
//
// type TodolistWithReduxPropsType = {
//     todolist: TodolistDomainType
// }
// export const TodolistWithReduxTes = (props: TodolistWithReduxPropsType) => {
//     const dispatch = useAppDispatch()
//     const {id, title, filter} = props.todolist
//     let tasks = useAppSelector<TaskType[]>(state => state.tasks[id])
//
//     if (filter === 'active') {
//         tasks = tasks.filter(t => t.status === TaskStatuses.New)
//     }
//     if (filter === 'completed') {
//         tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
//     }
//
//
//     const tasksList = tasks.length
//         ?
//         <ul>
//             {
//                 tasks.map((task) => {
//                     const removeTask = () => dispatch(removeTask(id, task.id))
//                     const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(id, task.id, (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)))
//                     const changeTitleStatus = (newValue: string) => dispatch(changeTaskTitleAC(id, task.id, newValue))
//
//
//                     return (
//                         <li key={task.id} className={task.status === TaskStatuses.Completed ? 'isDone' : ''}>
//                             <Checkbox onChange={changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
//                             <EditableSpan title={task.title} onChange={changeTitleStatus}/>
//                             <IconButton onClick={removeTask} aria-label="delete">
//                                 <BackspaceIcon color={'action'}/>
//                             </IconButton>
//                         </li>
//                     )
//                 })
//             }
//         </ul>
//         : <span>Your list is empty</span>
//
//
//     const changeFilterHandlerCreator = (filter: FilterValueType) => {
//         return () => dispatch(changeTaskFilter(id, filter))
//     }
//     const removeTodolistItemHandler = () => dispatch(removeTodolist(id))
//     const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitle(id, title))
//     const addTask = (title: string) => dispatch(addTask(id, title))
//
//     return (
//         <div className={'container'}>
//             <h3>
//                 <EditableSpan title={title} onChange={changeTodolistTitle}/>
//                 <button onClick={removeTodolistItemHandler}>x</button>
//             </h3>
//             <AddItemForm addItem={addTask}/>
//             {tasksList}
//             <div className={'div-filter'}>
//                 <Button size={'small'} variant={filter === 'all' ? 'outlined' : 'contained'} color={'success'}
//                         onClick={changeFilterHandlerCreator('all')}>All</Button>
//                 <Button size={'small'} variant={filter === 'active' ? 'outlined' : 'contained'} color={'error'}
//                         onClick={changeFilterHandlerCreator('active')}>Active</Button>
//                 <Button size={'small'} variant={filter === 'completed' ? 'outlined' : 'contained'}
//                         color={'secondary'} onClick={changeFilterHandlerCreator('completed')}>Completed</Button>
//             </div>
//         </div>
//     );
// };
//
//
