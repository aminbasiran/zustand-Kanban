import React, {useState} from 'react'
import Task from './Task'
import { useStore } from '../zustand'

const Column = ({state}) => {

    const [text,setText] = useState("")
    const [open,setOpen] = useState(false)

    const tasks = useStore(store => store.tasks.filter(task => task.state === state)) 
    const addTask = useStore(store => store.addTask)
    const setDraggedTask = useStore(store => store.setDraggedTask)
    const draggedTask = useStore(store => store.draggedTask)
    const moveTask = useStore(store => store.moveTask)

    return (
        <div onDragOver={(e)=>e.preventDefault()} onDrop={()=> {setDraggedTask(null)
                                                                moveTask(draggedTask,state)
                                                                console.log(draggedTask)}} 
        className='w-1/3 bg-zinc-800 min-h-64 p-3'>
            <div className='flex flex-row mb-2 justify-between'>
                <h1>{state}</h1>
                <button className="cursor-pointer" onClick={()=>setOpen(!open)} >+ Add</button>

            </div>
            <div className='flex flex-col gap-2'>
                {tasks.map(task => <Task key={task.title}  title={task.title} state={task.state}/>)}
            </div>
            {open && <div  onClick={()=>setOpen(!open)} className='absolute top-0 left-0 w-full h-full bg-gray-800/30'>
                    
                    <div className='grid place-items-center h-full'> 
                    
                        <div className='flex flex-col gap-2 bg-[#242424] p-4 rounded-lg'>
                            <input onClick={(e) => e.stopPropagation()} className='rounded-md px-2 py-1 text-xs' type="text" placeholder='Add task' value={text}  onChange={(e)=> setText(e.target.value)}/>
                            <button onClick={(e)=>{
                                e.stopPropagation()
                                    if(text === ""){
                                        return alert("insert task")
                                    }

                                    addTask(text,state)
                                    setText("")
                                    setOpen(()=>setOpen(!open))
                                }} type='buttton' className='text-xs'>Submit</button>
                        </div>
                    
                    
                    </div>


                    
                    
                </div>}
        </div>
    )
}

export default Column
