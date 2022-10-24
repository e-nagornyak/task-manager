import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType, TaskType } from "./App";

type TodoListPropsType = {
   title: string,
   tasks: Array<TaskType>
   addTask: (title: string) => void
   removeTask: (taskId: string) => void
   cnangeFilter: (filter: FilterValueType) => void
}

const TodoList = (props: TodoListPropsType) => {
   // тимчасове сховище
   const [title, setTitle] = useState('')
   //
   const tasksList = props.tasks.length
      ?
      <ul>
         {
            props.tasks.map((task) => {
               const removeTask = () => props.removeTask(task.id)

               return (
                  <li key={task.id}>
                     <input type="checkbox" checked={task.isDone} />
                     <span>{task.title}</span>
                     <button onClick={removeTask}>x</button>
                  </li>
               )
            })
         }
      </ul>
      : <span>Your list is empty</span>

   const onClickAddTask = () => {
      const trimmedTitle = title.trim()
      if (trimmedTitle) {
         props.addTask(trimmedTitle)
      }
      setTitle('')
   }
   const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const changeFilterHandlerCreator = (filter: FilterValueType) => {
      const handler = () => props.cnangeFilter(filter)
      return handler
   }
   const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()

   return (
      <div className={'container'}>
         <h3>{props.title}</h3>
         <div>
            <input
               value={title} // контрольований input
               onChange={onChangeSetLocalTitle}
               onKeyDown={onKeyDownEnterAddTask}
            />
            <button onClick={onClickAddTask}>+</button>
         </div>
         {tasksList}
         <div className={'div-filter'}>
            <button onClick={changeFilterHandlerCreator('all')}>All</button>
            <button onClick={changeFilterHandlerCreator('active')}>Active</button>
            <button onClick={changeFilterHandlerCreator('completed')}>Completed</button>
         </div>
      </div>
   )
      ;
};

export default TodoList;