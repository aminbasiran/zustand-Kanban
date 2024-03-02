import React from 'react'
import clsx from 'clsx';
import { useStore } from '../zustand';

const Task = ({title,state}) => {


  const deleteTask = useStore(store => store.deleteTask)
  const setDraggedTask = useStore(store => store.setDraggedTask)

  const buttonClasses = clsx(
    'text-right text-xs p-1 rounded-sm',
    { 'bg-zinc-400': state === "Planned"},
    { 'bg-yellow-400': state === "Ongoing"},
    { 'bg-green-400': state === "Done"}
  );

    

  return (
    <div draggable onDragStart={()=> setDraggedTask(title)} className='cursor-move bg-zinc-500 h-24 rounded-md text-left p-2 flex flex-col justify-between'>
      <h1>{title}</h1>
      <div className='flex justify-between'> 
        <h3 onClick={()=> deleteTask(title)} className='cursor-pointer text-right text-xs p-1 rounded-sm bg-red-900'>Delete</h3>
        <h3 className={buttonClasses}>{state}</h3>
      </div>
    </div>
  )
}

export default Task
