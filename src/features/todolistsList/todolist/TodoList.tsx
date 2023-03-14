import { fetchTasks } from "features/todolistsList/todolist/task/reducer/thunks"
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { FilterValueType, TodolistDomainType } from './reducer/todolists-reducer'
import { Task } from './task/Task'
import { TaskStatuses, TaskType } from 'api/types'
import { AddItemForm } from 'components/addItemForm/AddItemForm'
import { EditableSpan } from 'components/editableSpan/EditableSpan'
import { useAppDispatch } from 'hooks/hooks'

type TodoListPropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  cnangeFilter: (todolistId: string, filter: FilterValueType) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  removeTodolistItem: (todolistId: string) => void
  changeTodolistTile: (todolistId: string, title: string) => void
  demo?: boolean
}

export const TodoList: React.FC<TodoListPropsType> = memo(({ demo = false, ...props }) => {
  const dispatch = useAppDispatch()

  let { tasks } = props

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasks(props.todolist.id))
    }
  }, [])

  tasks = useMemo(() => {
    if (props.todolist.filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
    if (props.todolist.filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

    return tasks
  }, [props.todolist.filter, tasks])

  const tasksList = props.tasks.length ? (
    <>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          todolistId={props.todolist.id}
          removeTask={props.removeTask}
          changeTaskStatus={props.changeTaskStatus}
          changeTaskTitle={props.changeTaskTitle}
        />
      ))}
    </>
  ) : (
    <span className="list_empty">Your list is empty</span>
  )

  const changeFilterHandlerCreator = (filter: FilterValueType) => () => props.cnangeFilter(props.todolist.id, filter)
  const removeTodolistItemHandler = () => {
    props.removeTodolistItem(props.todolist.id)
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTile(props.todolist.id, title)
  }
  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.todolist.id, title)
    },
    [props.addTask, props.todolist.id]
  )

  return (
    <div className="container">
      <h3>
        <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolistItemHandler} disabled={props.todolist.entityStatus === 'loading'} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm disabled={props.todolist.entityStatus == 'loading'} addItem={addTask} />
      {tasksList}
      <div className="div-filter">
        <ButtonMemo
          title="All"
          size="small"
          color="success"
          variant={props.todolist.filter === 'all' ? 'outlined' : 'contained'}
          onClick={changeFilterHandlerCreator('all')}
        />
        <ButtonMemo
          title="Active"
          size="small"
          color="error"
          variant={props.todolist.filter === 'active' ? 'outlined' : 'contained'}
          onClick={changeFilterHandlerCreator('active')}
        />
        <ButtonMemo
          title="Completed"
          size="small"
          color="secondary"
          variant={props.todolist.filter === 'completed' ? 'outlined' : 'contained'}
          onClick={changeFilterHandlerCreator('completed')}
        />
      </div>
    </div>
  )
})

type ButtonMemoPropsType = {
  title: string
  size?: 'small' | 'medium' | 'large'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variant: 'text' | 'outlined' | 'contained'
  onClick: () => void
}

const ButtonMemo = memo((props: ButtonMemoPropsType) => (
  <Button size={props.size} variant={props.variant} color={props.color} onClick={props.onClick}>
    {' '}
    {props.title}
  </Button>
))
