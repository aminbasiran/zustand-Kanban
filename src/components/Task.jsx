import React from 'react'
import clsx from 'clsx';
import { useStore } from '../zustand';
import Tags from './Tags';

const Task = ({title,state,tags,criticality}) => {


  const deleteTask = useStore(store => store.deleteTask)
  const setDraggedItem = useStore(store => store.setDraggedItem)

  const buttonClasses = clsx(
    'text-right text-xs p-1 rounded-sm',
    { 'bg-zinc-400': state === "Planned"},
    { 'bg-indigo-400': state === "In-progress"},
    { 'bg-yellow-300': state === "Review"},
    { 'bg-green-400': state === "Done"}
  );

  const criticalClasses = clsx(
    'cursor-move bg-[#1e1f24] rounded-r-md text-left py-2 pl-4 pr-2 flex flex-col justify-between border-l-4 ',
    { 'border-red-500': criticality === "High"},
    { 'border-orange-600': criticality === "Medium"},
    { 'border-green-300': criticality === "Low"}
);

  
  return (
    <div draggable onDragStart={()=> setDraggedItem(title,tags,criticality)} className={criticalClasses}>
      <h1>{title}</h1>
      <Tags title={title} tags={tags}/>
      <div className='flex justify-between'> 
        <h3 onClick={()=> deleteTask(title)} className='cursor-pointer text-right text-xs p-1 rounded-sm bg-red-900'>Delete</h3>
        <h3 className={buttonClasses}>{state}</h3>
      </div>
    </div>
  )
}

export default Task
